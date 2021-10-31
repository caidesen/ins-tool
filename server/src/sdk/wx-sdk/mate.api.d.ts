declare namespace WxApi {
  export interface Code2SessionResult {
    openid: string;
    session_key: string;
    unionid: string;
    errcode: number;
    errmsg: string;
  }
}
