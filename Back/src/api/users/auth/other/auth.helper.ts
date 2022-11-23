import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserEntity } from '@/api/users/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthHelper {
  readonly bcrypt = require('bcrypt');

  constructor(
    @InjectRepository(UserEntity)
    private repository: Repository<UserEntity>,

    private readonly jwt: JwtService,
  ) { }

  // Decoding the JWT Token
  public async decode(token: string): Promise<unknown> {
    return this.jwt.decode(token, null);
  }

  // Get User by User ID we get from decode()
  public async validateUser(decoded: any): Promise<UserEntity> {
    return this.repository.findOne({ where: { id: decoded.id } })
  }

  // Generate JWT Token
  public generateToken(user: UserEntity): string {
    return this.jwt.sign({ id: user.id, email: user.email });
  }

  // Validate User's password
  public isPasswordValid(password: string, userPassword: string): boolean {
    return this.bcrypt.compareSync(password, userPassword);
  }

  // Encode User's password
  public encodePassword(password: string): string {
    const salt: string = this.bcrypt.genSaltSync();

    return this.bcrypt.hashSync(password, salt);
  }
}