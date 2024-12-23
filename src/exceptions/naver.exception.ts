/**
 * `NaverApiError` error.
 
 * @constructor
 * @param {String} [message]
 * @param {Number} [code]
 * 
 * @see https://developers.naver.com/docs/common/openapiguide/errorcode.md
 * @see https://developers.naver.com/docs/login/profile/profile.md
 */
export class NaverApiError extends Error {
  public status: number;
  public code: string;

  constructor(message: string, code: string) {
    super(message);
    this.name = 'NaverApiError';

    /**
     * @note typeof `code` is `string` - be careful.
     */
    this.code = code;
    this.status = 500;
  }
}

export default NaverApiError;
