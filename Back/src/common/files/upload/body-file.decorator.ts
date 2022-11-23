import { createParamDecorator, ExecutionContext, HttpException, HttpStatus, ValidationPipe, Body } from '@nestjs/common';
import { ClassConstructor, plainToClass } from 'class-transformer';
import { validateOrReject } from 'class-validator';

export const BodyFile = createParamDecorator(
  (cls: ClassConstructor<object>, ctx: ExecutionContext): any => {
    const request = ctx.switchToHttp().getRequest();
    let body = plainToClass(cls, request.body.data)
    validateOrReject(body)
    return body;
  },
);