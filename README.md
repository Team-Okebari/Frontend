# 🖼️ Artbite Frontend
## 📌 프로젝트 개요

Artbite Frontend는 디자이너를 위한 영감 및 레퍼런스 관리 플랫폼 Artbite의 사용자 인터페이스(UI)를 제공하는 웹 애플리케이션입니다.  
React 기반 SPA로 구성되며, 검색, 작업노트 관리, 보관함 기능 등 다양한 인터랙티브 기능을 제공합니다.

## 🚀 기술 스택
| 영역       | 기술                                |
| -------- | --------------------------------- |
| 언어       | TypeScript                        |
| 프레임워크    | React 19                          |
| 라우팅      | React Router DOM 7                |
| 상태관리     | Zustand                           |
| HTTP 통신  | Axios                             |
| 스타일링     | TailwindCSS                       |
| 애니메이션    | lottie-react, react-lottie-player |
| UI/UX 요소 | react-hot-toast, react-icons      |
| 유틸리티     | lodash, clsx                      |


### 빌드 & 개발 환경
- Vite 7
- TypeScript 5.9
- ESLint

## 🛠 개발 환경
### 📦 필수 설치

- Node.js LTS (권장: 20 이상)
- npm (기본 제공)

## 📂 설치 및 실행
### 1. 레포지토리 클론
```
git clone https://github.com/Team-Okebari/Frontend.git
cd artbite-front
```

### 2. 패키지 설치
```
npm install
```

### 3. 환경변수 파일(.env) 생성

`.env.local` 생성
```
cp .env.local .env
```
`.env.local`
```
VITE_API_URL=http://localhost:8080
```

### 4. 개발 서버 실행
```
npm run dev
```

기본 실행 URL
➡ http://localhost:5173

### 5. 프로덕션 빌드
```
npm run build
```

### 6. 빌드 결과물 로컬 프리뷰
```
npm run preview
```

## 🔗 백엔드 연동

프론트엔드는 Artbite Backend API와 통신하며,
Axios 요청의 기본 URL은 .env에 설정된 VITE_API_URL을 사용합니다.

백엔드 레포지토리 → https://github.com/Team-Okebari/Server-Backend
