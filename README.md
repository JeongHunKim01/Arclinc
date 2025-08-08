# Proofolio - 투자 포트폴리오 공유 플랫폼

투자 포트폴리오를 공유하고 다른 투자자들과 소통할 수 있는 웹 플랫폼입니다.

## 🚀 주요 기능

- **포트폴리오 공유**: 투자 내역과 수익률을 공유
- **매매 내역 관리**: 매수/매도 내역과 코멘트 작성
- **상호작용**: 추천/비추천 및 댓글 기능
- **차트 시각화**: 포트폴리오 성과를 차트로 표시
- **반응형 디자인**: 모바일과 데스크톱에서 최적화된 UI

## 🛠 기술 스택

- **프론트엔드**: React.js, Tailwind CSS, Recharts
- **백엔드**: Node.js, Express
- **데이터 저장**: localStorage (클라이언트 사이드)
- **배포**: Netlify/Vercel 호환

## 📦 설치 및 실행

### 1. 의존성 설치
```bash
npm install
```

### 2. 개발 서버 실행
```bash
npm run dev
```
- 프론트엔드: http://localhost:3000
- 백엔드: http://localhost:5000

### 3. 프로덕션 빌드
```bash
npm run build
```

### 4. 서버 실행 (프로덕션)
```bash
npm run server
```

## 🎯 사용법

### 메인 페이지
- 최근 업로드된 포트폴리오 목록 확인
- "포트폴리오 만들기" 버튼으로 새 포트폴리오 작성

### 포트폴리오 작성
1. 기본 정보 입력 (제목, 작성자, 초기/최종 투자금)
2. 매매 내역 추가 (날짜, 유형, 종목, 수량, 가격, 코멘트)
3. 포트폴리오 저장

### 포트폴리오 상세 페이지
- 포트폴리오 성과 요약 및 차트
- 매매 내역 테이블
- 추천/비추천 버튼
- 댓글 작성 및 조회

## 📁 프로젝트 구조

```
proofolio/
├── src/
│   ├── components/          # 재사용 가능한 컴포넌트
│   ├── context/            # React Context (상태 관리)
│   ├── pages/              # 페이지 컴포넌트
│   ├── App.jsx             # 메인 앱 컴포넌트
│   └── main.jsx            # 앱 진입점
├── server/                 # Express 서버
├── public/                 # 정적 파일
└── package.json            # 프로젝트 설정
```

## 🔧 개발 환경 설정

### 필수 요구사항
- Node.js 16.0 이상
- npm 8.0 이상

### 환경 변수
현재는 환경 변수가 필요하지 않습니다. 모든 데이터는 localStorage에 저장됩니다.

## 🚀 배포

### Netlify 배포
1. `npm run build` 실행
2. `dist` 폴더를 Netlify에 업로드
3. SPA 라우팅을 위해 `_redirects` 파일 설정

### Vercel 배포
1. Vercel CLI 설치: `npm i -g vercel`
2. `vercel` 명령어로 배포

## 📝 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다.

## 🤝 기여

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📞 문의

프로젝트에 대한 문의사항이 있으시면 이슈를 생성해주세요.

