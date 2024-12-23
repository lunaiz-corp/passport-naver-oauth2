/**
 * 네이버 프로필 조회 API 응답 Body
 * @warning CI나 특수 정보를 제공받도록 제휴한 경우, 해당 interface에서 처리하지 않으니 별도로 타입 처리해야 합니다.
 * @see https://help.naver.com/service/23029/contents/20550?lang=ko
 * @see https://developers.naver.com/forum/posts/34210
 */
export interface INaverProfileBody {
  /**
   * API 호출 결과 코드
   * @example "00"
   */
  resultcode: string;

  /**
   * API 호출 결과 메시지
   * @example "success"
   */
  message: string;

  response: {
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
    nickname: string;

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
    email: string;

    /**
     * 성별
     * @returns F: 여성, M: 남성, U: 확인불가
     * @example "F"
     */
    gender: 'F' | 'M' | 'U';

    /**
     * 사용자 연령대
     * @example "40-49"
     */
    age: string;

    /**
     * 사용자 생일 (MM-DD 형식)
     * @example "10-01"
     */
    birthday: string;

    /**
     * 사용자 프로필 사진 URL
     * @example "https://ssl.pstatic.net/static/pwe/address/nodata_33x33.gif"
     */
    profile_image: string;

    /**
     * 출생연도
     * @example "1900"
     */
    birthyear: string;

    /**
     * 휴대전화번호
     * @example "010-0000-0000"
     */
    mobile: string;
  };
}

export default INaverProfileBody;
