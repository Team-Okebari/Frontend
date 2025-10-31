import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { saveAccessTokenToState } from '../store/authStore';

const OAuth2RedirectPage = () => {
  const navigate = useNavigate();
  const hasProcessedToken = useRef(false);

  useEffect(() => {
    if (hasProcessedToken.current) {
      return;
    }

    const urlParams = new URLSearchParams(window.location.search);
    const accessToken = urlParams.get('accessToken');

    if (accessToken) {
      hasProcessedToken.current = true;

      // URL에서 토큰 정보 제거
      window.history.replaceState({}, document.title, window.location.pathname);

      // 1. Access Token을 전역 상태에 저장
      saveAccessTokenToState(accessToken);

      // 2. 메인 페이지로 이동
      navigate('/main', { replace: true });
    } else if (window.location.search.includes('error')) {
      // 백엔드에서 에러 파라미터를 보낸 경우
      navigate('/login', { replace: true });
    } else if (!hasProcessedToken.current) {
      // 토큰이 없고, 아직 처리되지 않은 경우에만 실패 처리
      navigate('/login');
    }
  }, [navigate]);

  return <div>로그인 처리 중...</div>;
};

export default OAuth2RedirectPage;
