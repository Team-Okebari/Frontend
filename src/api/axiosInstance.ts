import axios from 'axios';
import { getAccessTokenFromState, clearAuthState, saveAccessTokenToState } from '../store/authStore'; // Zustand 스토어에서 가져올 함수

const axiosInstance = axios.create({
  withCredentials: true, // Refresh Token 쿠키 전송을 위해 필수!
});

// 요청 인터셉터: 모든 요청에 Access Token을 자동으로 추가
axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = getAccessTokenFromState();
    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 응답 인터셉터 (Access Token 만료 및 재발급 로직은 나중에 추가)
let isRefreshing = false;
let failedQueue: { resolve: (value?: unknown) => void; reject: (reason?: unknown) => void; }[] = [];

const processQueue = (error: unknown, token: string | null = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error: unknown) => {
    if (!axios.isAxiosError(error) || !error.response) {
      return Promise.reject(error);
    }

    const originalRequest = error.config;

    // 401 에러이고, 재시도한 요청이 아닐 때
    if (error.response.status === 401 && originalRequest && !originalRequest._retry) {
      if (isRefreshing) {
        // 토큰 재발급이 이미 진행 중인 경우, 큐에 추가
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then(token => {
          if (originalRequest.headers) {
            originalRequest.headers['Authorization'] = 'Bearer ' + token;
          }
          return axiosInstance(originalRequest);
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        // 토큰 재발급 API 호출
        const reissueResponse = await axiosInstance.post('/api/auth/reissue', {});
        const { accessToken: newAccessToken } = reissueResponse.data.data;

        // 1. 새로 발급받은 Access Token을 상태에 저장
        saveAccessTokenToState(newAccessToken);

        // 2. 원래 요청의 헤더를 새 토큰으로 교체
        if (originalRequest.headers) {
          originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
        }
        
        // 3. 대기열에 있던 모든 요청들을 새 토큰으로 재실행
        processQueue(null, newAccessToken);

        // 4. 원래 실패했던 요청 재실행
        return axiosInstance(originalRequest);

      } catch (reissueError: unknown) {
        // Refresh Token마저 만료된 경우
        processQueue(reissueError, null);
        clearAuthState(); // 모든 인증 상태 초기화 (직접 구현)
        window.location.href = '/login'; // 로그인 페이지로 강제 이동
        return Promise.reject(reissueError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
