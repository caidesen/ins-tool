import { HttpStatus, HttpException } from '@nestjs/common';

export class BizException extends HttpException {
  private expData: { code?: number; message?: string };
  constructor(expData: { code?: number; message?: string }) {
    super(expData, HttpStatus.OK);
    this.expData = expData;
  }
  getErrorCode() {
    return this.expData.code;
  }
  getErrorMessage() {
    return this.expData.message;
  }
}
