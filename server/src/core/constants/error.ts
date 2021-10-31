interface CodeAndMsg {
  code: number;
  message: string;
}
function create(code: number, message: string): CodeAndMsg {
  return {
    code,
    message,
  };
}

/**
 * 业务错误编码
 */
export class ErrorCode {
  static readonly SUCCESS: CodeAndMsg = create(0, 'success');
  static readonly ParamsError: CodeAndMsg = create(1, '参数错误');
  static readonly Rejected: CodeAndMsg = create(2, '操作被拒绝');
  static readonly AccountNotExist: CodeAndMsg = create(1000, '账号不存在');
  static readonly AuthenticationError: CodeAndMsg = create(1001, '认证失败');
  static readonly TokenError: CodeAndMsg = create(1002, '登录过期');
  static readonly Frozen: CodeAndMsg = create(1003, '账号已冻结');
  static readonly BizError: CodeAndMsg = create(4001, '业务错误');
  static readonly RpcError: CodeAndMsg = create(5000, '远程调用失败');
  static codeToMessage(code: number): string {
    for (const key of Object.keys(this)) {
      if (this[key].code === code) {
        return this[key].MESSAGE;
      }
    }
    return '';
  }

  static Hascode(code: number): boolean {
    for (const key of Object.keys(this)) {
      if (this[key].code === code) {
        return true;
      }
    }
    return false;
  }
}
