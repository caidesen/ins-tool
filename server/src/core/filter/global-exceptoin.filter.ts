import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { BizException } from '../exception/biz-exception';

@Catch(BizException)
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: BizException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const status = exception.getStatus();
    response.status(status).json({
      errorCode: exception.getErrorCode(),
      message: exception.getErrorMessage(),
    });
  }
}
