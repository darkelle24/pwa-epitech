import { UserEntity } from '@/api/users/entities/user.entity';
import { basicCreate } from '@/common/fn.helper';
import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsSelectByString, Repository } from 'typeorm';
import { CreateUserDto } from './../dto/create-user.dto';
import { AuthReturnDto, LoginDto } from './dto/login.dto';
import { AuthHelper } from './other/auth.helper';
import { UsersService } from '../users.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly repository: Repository<UserEntity>,

    @Inject(AuthHelper)
    private readonly helper: AuthHelper,
    private readonly userService: UsersService
  ) {}

  userEntities: string[] = this.repository.metadata.ownColumns.map(column => column.propertyName)

  public async register(body: CreateUserDto): Promise<UserEntity> {
    const { username, email, password }: CreateUserDto = body;

    body.username = username;
    body.email = email;
    body.password = this.helper.encodePassword(password);

    return this.userService.create(body).then((value) => {
      if (value)
        delete value.password
      return value
    })
  }

  private findOneUserWithPassword(usernameOrEmail: string): Promise<UserEntity> {
    return this.repository.findOne({ where: [{ username: usernameOrEmail }, { email: usernameOrEmail}], select: (this.userEntities as FindOptionsSelectByString<UserEntity>)})
  }

  public async login(body: LoginDto): Promise<AuthReturnDto> {
    const { username, password }: LoginDto = body;
    const user: UserEntity = await this.findOneUserWithPassword(username);

    if (!user) {
      throw new HttpException('Wrong email/username or password', HttpStatus.NOT_FOUND);
    }

    const isPasswordValid: boolean = this.helper.isPasswordValid(password, user.password);

    if (!isPasswordValid) {
      throw new HttpException('Wrong email/username or password', HttpStatus.NOT_FOUND);
    }

    const token = await this.helper.generateToken(user)

    let toReturn: any = {}

    toReturn = user
    toReturn.token = token
    delete toReturn.password
    delete toReturn.swSub

    return toReturn;
  }
}