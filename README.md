Weather-Web 

<a href="https://realteethweather.netlify.app/" target="_blank">View WebSite</a>

## 프로젝트 실행 방법
1. 저장소 클론
   ```
   git clone your-repo-name.ig
   cd your-repo-name
   ```
2. 의존성 설치
   ```
   npm install / yarn install /pnpm add
   ```
3. 환경변수 설정 `.env` 파일 생성 후 OpenWeatherMap Api 키 연결
   ```
   VITE_WEATHER_API_KEY=your api key
   ```
4. 로컬 서버 실행
   ```
   npm run dev
   ```

## 구현 기능
1. 현재 위치 및 검색 기반 실시간 날씨 제공
   - OpenWeatherMap API 활용 : 현재 기온, 날씨 아이콘, 24시간 예보(3시간 간격, 총 8개 데이터)를 시각화합니다.
   - API 제약 극복
     - 무료 플랜 특성상 최고/최저 기온 데이터를 제공하지 않아 현재 시점부터 당일 마지막 시간대까지의 데이터를 분석하여 실시간으로 최저/최고 온도를 산출하도록 구현하였습니다.
     - 또한 24시간의 날씨를 3시간 간격으로 보여줍니다.
     - 위도, 경도 값으로 현재 사용자가 위치하는 도시의 한글 지명을 표시합니다.
2. 검색 최적화 및 행정구역 대응
   - Fallback좌표 대응
     - 날씨 API에서 일부 도/군단위 행정구역을 지원하지 않는 경우, UX를 고려하여 해당 지역의 도청 위치를 Fallback좌표로 지정하여 날씨 정보를 누락없이 제공합니다.
   - 검색 결과 제한
     - 검색 시 결과 항목을 최대 10개로 제한하여 데이터의 복잡성을 줄이고 UI의 가독성을 확보하였습니다.
3. 즐겨찾기 및 개인화 관리
   - 즉각적인 관리
     - 날씨 카드 내 즐겨찾기 버튼을 통해 목록 추가/제거가 즉시 반영됩니다.
   - 지역 별칭 기능
     - 사용자가 원하는 이름으로 지역명을 수정할 수 있으며 수정된 이름이 기본 지명보다 우선적으로 노출됩니다.
   - 반응형 최적화
     - 데스크탑 : Hover시에만 수정 버튼이 나타나 깔끔한 UI를 제공합니다.
     - 모바일 : 수정 버튼을 상시 노출하여 직관적인 조작이 가능하도록 대응하였습니다.


## 기술적 의사 결정 및 이유
1. Vite(Build)
  - 결정 : Webpack 대신 Vite를 빌드 도구로 채택
  - 이유 : Vite는 ESM을 활용하여 개발 서버 구동 속도와 HMR을 제공합니다. 이와 같은 편의성 때문에 개발 환경에서의 생산성을 높이기 위해 채택하였습니다.
2. Zustand
  - 결정 : 즐겨찾기 목록을 관리하기 위해 사용
  - 이유 : Props Drilling문제를 극복하기 위해 즐겨찾기 상태를 공유해야했습니다.
    - 간결함
      - Redux, Recoil 등 다른 전역 상태 라이브러리에 비해 보일러플레이트가 적어 코드 가독성이 높습니다.
3. Axios
  - 결정 : 자바스크립트 기본 내장 함수 대신 Axios라이브러리를 사용
  - 이유 : 인스턴스화 및 재사용
    - `axios.create`을 통해 공통 설정을 인스턴스로 관리하여 중복 코드를 줄였습니다.
   
4. 웹 접근성 고려
   - 스크린 리더 지원
     - 아이콘만 존재하는 버튼에 `sr-only(Search Reader Only)` 클래스를 활용해 시각 장애인이 스크린 리더를 통해 해당 버튼의 역할을 정확히 인지 할 수 있도록 설계했습니다.
    

## 사용한 기술 스택
| 분류 | 기술 |
|------|------|
| Framework / Library | React |
| Language | TypeScript |
| Build Tool | Vite |
| State Management | Zustand |
| Server State | TanStack Query (React Query) |
| HTTP Client | Axios |
| Date Handling | Day.js |
| UI / Icons | Lucide Icons |
| Notification | react-hot-toast |
