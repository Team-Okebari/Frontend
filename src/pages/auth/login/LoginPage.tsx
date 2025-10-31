import { useEffect, useState } from "react";
import Button from "../../../components/common/Button";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../../../api/axiosInstance";
import useAuthStore, { saveAccessTokenToState } from "../../../store/authStore";
import * as axios from "axios";

export default function LoginPage() {

  const navigate = useNavigate();
  const { accessToken } = useAuthStore();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  useEffect(() => {
    if (accessToken) {
      navigate('/main', { replace: true });
    }
  }, [accessToken, navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(""); // 에러 메시지 초기화
    try {
      const response = await axiosInstance.post('/api/auth/login', { email, password });
      const { accessToken } = response.data.data;

      saveAccessTokenToState(accessToken);
      navigate('/', { replace: true });
    } catch (err: unknown) {
      console.error("로그인 실패:", err);
      if (axios.isAxiosError(err) && err.response) {
        setError(err.response.data?.error?.message || "이메일 또는 비밀번호가 일치하지 않습니다.");
      } else {
        setError("로그인 중 알 수 없는 오류가 발생했습니다.");
      }
    }
  }

  return (
    <div className="w-full h-full bg-black flex flex-col items-center justify-center p-4 text-white">
      {/* 로고영역 */}
      <div className="p-8 border border-white">
        {/* 임시 텍스트 (이미지로 대체) */}
        <h1 className="text-xl font-bold">(서비스 로고)</h1>
      </div>

      {/* 로그인 컨테이너 */}
      <div className="w-full px-8 space-y-8">

        {/* SNS 로그인 */}
        <div className="space-y-1.5 py-6">
          <a href="/oauth2/authorization/kakao">
            <Button
              size="large"
              fullWidth
              bgColor="bg-kakao-yellow"
              >
              카카오로 시작하기
            </Button>
          </a>
          <a href="/oauth2/authorization/naver">
            <Button
              size="large"
              fullWidth
              bgColor="bg-naver-green"
              >
              네이버로 시작하기
            </Button>
          </a>
          <a href="/oauth2/authorization/google">
            <Button
              size="large"
              fullWidth
              >
              구글로 시작하기
            </Button>
          </a>
        </div>

        {/* 구분선 */}
        <div className="border-t border-white" />

        {/* 이메일 로그인 */}
        <div className="pt-6">
          <form onSubmit={handleLogin} className="space-y-1.5">
            <input
              type="text"
              placeholder="이메일"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-6 py-3.5 rounded-md bg-[#2F2F2F] placeholder-white text-white font-semibold focus:outline focus:outline-white" />
              
            <input
              type="password"
              placeholder="비밀번호"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-6 py-3.5 rounded-md bg-[#2F2F2F] placeholder-white text-white font-semibold focus:outline focus:outline-white" />
            
            {error && <p className="text-red-500 text-sm text-center">{error}</p>}

            <Button
              size="large"
              fullWidth
              >
              로그인
            </Button>
          </form>
        </div>

        {/* 하단 링크 버튼 */}
        <div className="flex justify-center gap-4">
          {/* 임시로 모두 회원가입페이지로 이동 */}
          <Link to='/signup' className="text-white text-base font-semibold">
            회원가입
          </Link>
          <Link to='/signup' className="text-white text-base font-semibold">
            아이디 찾기
          </Link>

        </div>
      </div>
    </div>
  )
}
