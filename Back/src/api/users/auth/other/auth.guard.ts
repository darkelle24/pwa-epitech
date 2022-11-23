import { Injectable, ExecutionContext, HttpException, HttpStatus } from '@nestjs/common';
import { AuthGuard, IAuthGuard } from '@nestjs/passport';
import { UserEntity } from '@/api/users/entities/user.entity';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') implements IAuthGuard {
  public handleRequest(err: unknown, user: UserEntity): any {
    return user;
  }

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    await super.canActivate(context);

    const req = context.switchToHttp().getRequest();

    if (req.user) {
      return true
    }
    throw new HttpException('You need to be logged to access this route.', HttpStatus.UNAUTHORIZED);
  }
}
