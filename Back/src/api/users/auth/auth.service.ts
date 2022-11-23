import { UserEntity } from '@/api/users/entities/user.entity';
import { basicCreate } from '@/common/fn.helper';
import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsSelectByString, Repository } from 'typeorm';
import { CreateUserDto } from './../dto/create-user.dto';
import { AuthReturnDto, LoginDto } from './dto/login.dto';
import { AuthHelper } from './other/auth.helper';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly repository: Repository<UserEntity>,

    @Inject(AuthHelper)
    private readonly helper: AuthHelper
  ) {}

  userEntities: string[] = this.repository.metadata.ownColumns.map(column => column.propertyName)

  public async register(body: CreateUserDto): Promise<UserEntity> {
    const { username, email, password }: CreateUserDto = body;

    let user = new UserEntity();

    user.username = username;
    user.email = email;
    user.password = this.helper.encodePassword(password);

    return basicCreate(this.repository, UserEntity, user).then((value) => {
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
      throw new HttpException('No user found', HttpStatus.NOT_FOUND);
    }

    const isPasswordValid: boolean = this.helper.isPasswordValid(password, user.password);

    if (!isPasswordValid) {
      throw new HttpException('No user found', HttpStatus.NOT_FOUND);
    }

    const token = await this.helper.generateToken(user)

    let toReturn: any = {}

    toReturn = user
    toReturn.token = token
    delete toReturn.password

    return toReturn;
  }
}