<h1 align="center">Welcome to passport-naver-oauth2 👋</h1>
<p>
  <img alt="NPM Version" src="https://img.shields.io/npm/v/passport-naver-oauth2" />
  <a href="#" target="_blank">
    <img alt="License: MIT" src="https://img.shields.io/badge/License-MIT-yellow.svg" />
  </a>
</p>

> &#34;네이버 아이디로 로그인&#34; 연동을 위한 차세대 Passport Strategy 라이브러리

## 설치

```sh
# npm이나 yarn도 사용 가능
pnpm install passport-naver-oauth2
```

## 버전

[유의적 버전 2.0.0](https://semver.org/spec/v2.0.0.html)을 사용하며, 기존 [passport-naver](https://github.com/naver/passport-naver.git) 과의 호환성 강조를 위해, 주(主) 버전이 2로 시작합니다.

## 이용 방법

1. [NAVER Developers](https://developers.naver.com/apps/#/register?api=nvlogin) 에서 애플리케이션을 등록 합니다.
2. 애플리케이션을 생성하고 받은 **Client ID** 와 **Client Secret**을 Passport에 적용하면 됩니다.

## 사용 예시

```ts
import passport from 'passport';
import {NaverStrategy, IProfile as NaverProfile} from 'passport-naver-oauth2';

passport.use(
  new NaverStrategy(
    {
      clientID: '',
      clientSecret: '',
      callbackURL: '',
    },
    (
      accessToken: string,
      refreshToken: string,
      profile: NaverProfile,
      done: any,
    ) => {
      // 로그인 처리 Business Logic 작성
      done(null, profile);
    },
  ),
);
```

## 주의 사항

1. 네이버는 필수항목에 체크하지 않아도, 로그인이 되므로 모든 정보가 제대로 넘어오지 않을 수 있습니다. [#](https://developers.naver.com/forum/posts/30506)

2. 만약 필수항목에 체크되지 않은 경우, authType 파라미터에 `reprompt` / `reauthenticate`를 넘겨 동의창을 다시 호출합니다. (`reauthenticate`는 아이디/비밀번호를 다시 입력하게 하고, `reprompt`는 동의창만 다시 호출합니다.)

```ts
// 예시 코드
app.get('/login', passport.authenticate('naver', {authType: 'reprompt'}));
```

3. CI 등 추가정보 제공 제휴가 된 경우, 타입을 별도로 처리해야 합니다.

## 개발자

👤 **Minsu Kim** @ LUNAIZ

- Website: https://devayaan.me
- Github: [@kms0219kms](https://github.com/kms0219kms)
- Email: [minsu.kim@lunaiz.com](mailto:minsu.kim@lunaiz.com)

---

_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_
