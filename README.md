## 사용 패키지

- [Create React App](https://github.com/facebook/create-react-app).
- [craco](https://github.com/gsoft-inc/craco).
- Sass with [CSS modules](https://github.com/css-modules/css-modules).
- [react-i18next](https://react.i18next.com/)

## 스크립트

### `yarn start`

개발자 모드로 실행
[http://localhost:3000](http://localhost:3000) 로 접근

### `yarn build`

프로젝트 빌드

### `yarn i18next-scanner`

번역이 필요한 `t('')` 코드를 key, value 형태로 json 으로 자동으로 만들어주는 역할
관련 `config` 는 `i18next-scanner.config.js` 에서 수정하면 된다.
