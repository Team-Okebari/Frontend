import clsx from "clsx";
import React from "react";
import { FiMenu } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import LogoutButton from "../components/common/LogoutButton";
import useAuthStore from "../store/authStore";

interface HeaderProps {
  className?: string;
}
 
const Header: React.FC<HeaderProps> = ({ className }) => {
  const navigate = useNavigate();
  const { accessToken } = useAuthStore();

  // 임시
  const handleLogo = () => {
    navigate('/');
  }

  const handleSideBar = () => {
    console.log("사이드바 나옴");
  };

  return (
    <header 
      className={clsx(
        "w-full px-4 pt-10 pb-4 inline-flex justify-between items-end",
        className)}  
    >
      {/* 왼쪽 - 홈 아이콘 */}
      <div className="text-white text-base font-medium"
           onClick={handleLogo}>
        Home Icon
      </div>
      {/* 오른쪽 - 햄버거 아이콘 */}
      <div className="inline-flex items-center gap-2">
        {accessToken && <LogoutButton />}
        <div className="w-6 h-6">
          <FiMenu className="w-full h-full text-white"
                  onClick={handleSideBar} />
        </div>
      </div>
    </header>
  );
}
 
export default Header;