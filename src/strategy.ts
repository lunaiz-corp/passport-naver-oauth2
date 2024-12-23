import {
  InternalOAuthError,
  Strategy,
  StrategyOptions,
  StrategyOptionsWithRequest,
  VerifyFunction,
  VerifyFunctionWithRequest,
} from 'passport-oauth2';

import {STRATEGY_NAME} from './constants/strategy';

import {
  NAVER_OAUTH_AUTHORIZE_URL,
  NAVER_OPENAPI_PROFILE_URL,
  NAVER_OAUTH_TOKEN_URL,
} from './constants/endpoints';

import type {INaverProfileBody} from './types/api_profile';
import type {IProfile} from './types/profile';

import NaverApiError from './exceptions/naver.exception';

/**
 * NaverStrategy Constructor
 * @param options.clientID Required. Client ID that issued when registering application from Naver Developers.
 * @param options.callbackURL Required. Callback/Redirect URL which Naver will redirect to after authentication. Must be registered in Naver Developers.
 * @param verify
 * @constructor
 */
export class NaverStrategy extends Strategy {
  constructor(
    /**
     * @required Client ID that issued when registering application from Naver Developers.
     */
    options: Omit<
      StrategyOptions | StrategyOptionsWithRequest,
      'authorizationURL' | 'tokenURL'
    > & {
      authorizationURL?: string;
      tokenURL?: string;
    },

    /**
     * @required Callback/Redirect URL which Naver will redirect to after authentication. Must be registered in Naver Developers.
     */
    verify: VerifyFunction | VerifyFunctionWithRequest,
  ) {
    /**
     * Configure Naver OAuth2.0 endpoints by default.
     * @see https://developers.naver.com/docs/login/devguide/devguide.md
     */
    options.authorizationURL =
      options.authorizationURL || NAVER_OAUTH_AUTHORIZE_URL;
    options.tokenURL = options.tokenURL || NAVER_OAUTH_TOKEN_URL;

    if ('passReqToCallback' in options && options.passReqToCallback) {
      super(
        options as StrategyOptionsWithRequest,
        verify as VerifyFunctionWithRequest,
      );
    } else {
      super(options as StrategyOptions, verify as VerifyFunction);
    }

    /**
     * Set the name of the strategy. Should be 'naver'.
     */
    this.name = STRATEGY_NAME;

    /**
     * Set the _oauth2 property to be used when making protected resource requests.
     */
    this._oauth2.setAccessTokenName('access_token');
  }

  /**
   * Return extra Naver-specific parameters to be included in the authorization request.
   * @param options {_StrategyOptions | _StrategyOptionsWithRequest} Options for the strategy.
   * @protected This method is public but should be considered protected.
   */
  authorizationParams(options: {
    /**
     * @see https://github.com/naver/passport-naver#re-authentication
     */
    authType?: string;

    /**
     * It usually used for the internal purposes.
     * @see https://github.com/naver/passport-naver/commit/2d88b7aeb14ce04db81a145b2933baabba80612b
     */
    svcType?: string;
  }): object {
    const params: any = {};

    if (options.authType) params.auth_type = options.authType;
    if (options.svcType) params.svctype = options.svcType;

    return params;
  }

  userProfile(
    accessToken: string,
    done: (err?: unknown, profile?: any) => void,
  ): void {
    this._oauth2.get(NAVER_OPENAPI_PROFILE_URL, accessToken, (err, body) => {
      if (err) {
        throw new InternalOAuthError('😵 Failed to fetch user profile', err);
      }

      if (!body) {
        throw new InternalOAuthError(
          '😵 Empty response received from Naver',
          null,
        );
      }

      try {
        const parsed = JSON.parse(body.toString('utf8')) as INaverProfileBody;
        const {resultcode, message, response} = parsed;

        /**
         * API Response was parsed successfully, but there are no informative data.
         * e.g. API Server was respond with empty response
         */
        if (!resultcode || !message)
          throw new InternalOAuthError(
            'Empty response received from Naver',
            null,
          );

        /**
         * Naver API Server was respond with unsuccessful result code.
         * @see https://developers.naver.com/docs/login/profile
         */
        if (resultcode !== '00') throw new NaverApiError(message, resultcode);

        const profile: IProfile = {
          provider: STRATEGY_NAME,

          id: response.id,

          displayName: response.nickname,
          name: response.name,
          emails: [{value: response.email}],

          gender:
            response.gender === 'F'
              ? 'female'
              : response.gender === 'M'
              ? 'male'
              : 'unknown',
          age: parseInt(response.age.substring(0, 2), 10),
          birthday: `${response.birthyear}-${response.birthday}`,

          photos: [{value: response.profile_image}],
          mobile: response.mobile,

          _raw: body.toString('utf8'),
          _json: parsed,
        };

        return done(null, profile);
      } catch (err) {
        if (err instanceof Error) {
          return done(err);
        }

        throw new InternalOAuthError(
          '😵 Failed to parse profile response',
          err,
        );
      }
    });
  }
}

export default NaverStrategy;
