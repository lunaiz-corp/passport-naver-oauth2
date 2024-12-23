// @ts-ignore
import express from 'express';
// @ts-ignore
import passport from 'passport';

import {NaverStrategy, IProfile as NaverProfile} from '../src';

process.loadEnvFile('.env');

const PORT = process.env.PORT || 3000;
const app = express();

/**
 * passport setting
 */
passport.use(
  new NaverStrategy(
    {
      clientID: process.env.NAVER_CLIENT_ID!,
      clientSecret: process.env.NAVER_CLIENT_SECRET!,
      callbackURL: `http://localhost:${PORT}/callback`,
      passReqToCallback: true,
    },
    (
      accessToken: string,
      refreshToken: string,
      profile: NaverProfile,
      done: any,
    ) => {
      // 로그인 처리 Business Logic 작성
      return done(null, profile._json);
    },
  ),
);

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (obj, done) {
  done(null, obj);
});

/**
 * express app setting
 */
app.use(passport.initialize());

app.get(
  '/login/reprompt',
  passport.authenticate('naver', {authType: 'reprompt'}),
);

app.get('/login', passport.authenticate('naver', {state: 'sampleState'}));
app.get('/callback', passport.authenticate('naver'), (req, res) => {
  res.send(JSON.stringify({state: req.query.state, user: req.user}));
});

app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}!`);
});
