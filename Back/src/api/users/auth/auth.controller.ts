import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './../dto/create-user.dto';
import { AuthService } from './auth.service';
import { AuthReturnDto, LoginDto } from './dto/login.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  @Inject(AuthService)
  readonly service: AuthService;

  @Post('register')
  register(@Body() body: CreateUserDto): Promise<AuthReturnDto> {
    let password = body.password
    return this.service.register(body)
      .then(result => {
        return this.service.login({ username: result.username, password: password })
      });
  }

  @Post('login')
  login(@Body() body: LoginDto): Promise<AuthReturnDto> {
    return this.service.login(body);
  }
}
