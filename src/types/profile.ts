import type {INaverProfileBody} from './api_profile';

/**
 * 실제 Passport 응답으로 나가는 Profile 객체
 */
export interface IProfile {
  /**
   * Passport Strategy 이름
   * @default 'naver'
   */
  provider: 'naver';

  /**
   * 동일인 식별 정보
   * @description 네이버 아이디마다 고유하게 발급되는 유니크한 일련번호 값
   * @warning API 호출 결과로 네이버 아이디값은 제공하지 않으며, 대신 'id'라는 애플리케이션당 유니크한 일련번호값을 이용해서 자체적으로 회원정보를 구성하셔야 합니다.
   * @example "32742776"
   */
  id: string;

  /**
   * 사용자 별명
   * @warning 별명이 설정되어 있지 않으면 id*** 형태로 리턴됩니다.
   * @example "OpenAPI"
   */
  displayName?: string;

  /**
   * 사용자 이름
   * @example "오픈 API"
   */
  name: string;

  /**
   * 사용자 이메일 주소
   * @warning 기본적으로 네이버 내정보에 등록되어 있는 '기본 이메일' 즉 네이버ID@naver.com 값이나, 사용자가 다른 외부메일로 변경했을 경우는 변경된 이메일 주소로 됩니다.
   * @example "openapi@naver.com"
   */
  emails: {value: string}[];

  /**
   * 성별
   * @returns female: 여성, male: 남성, unknown: 확인불가
   * @example "female"
   */
  gender: 'female' | 'male' | 'unknown';

  /**
   * 사용자 연령대
   * @example 40
   */
  age: number;

  /**
   * 사용자 생일 (YYYY-MM-DD 형식)
   * @example "1900-10-01"
   */
  birthday: string;

  /**
   * 사용자 프로필 사진 URL
   * @example "https://ssl.pstatic.net/static/pwe/address/nodata_33x33.gif"
   */
  photos: {value: string}[];

  /**
   * 휴대전화번호
   * @example "010-0000-0000"
   */
  mobile: string;

  _raw: string;
  _json: INaverProfileBody;
}

export default IProfile;
