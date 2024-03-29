import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const UserId = createParamDecorator((_, ctx: ExecutionContext): number => {
  const request = ctx.switchToHttp().getRequest();
  return request.user.userId;
});
