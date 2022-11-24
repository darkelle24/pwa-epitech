import { basicCreate, basicUpdate } from '@/common/fn.helper';
import { RolesEnum } from '@Roles/roles';
import { HttpException, HttpStatus, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryFailedError, Repository } from 'typeorm';
import { AuthHelper } from './auth/other/auth.helper';
import { CreateUserAdminDto, CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto, SubscribeDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';
import { FileEntity } from '@File/entities/file.entity';
import { unlink } from 'fs';
import { ClothesService } from '@Clothe/clothes.service';
import { instanceToPlain } from 'class-transformer';
import { UserClotheEntity } from '../user-clothe/entities/user-clothe.entity';
import { UserClotheService } from '../user-clothe/user-clothe.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,

    private configService: ConfigService,

    private readonly clotheService: ClothesService,

    private readonly userClotheService: UserClotheService,

    @Inject(AuthHelper)
    private readonly helper: AuthHelper
  ) {
    this.createAdmin({
      username: this.configService.get<string>('FIRST_USER_USERNAME'),
      password: this.helper.encodePassword(this.configService.get<string>('FIRST_USER_PASSWORD')),
      email: this.configService.get<string>('FIRST_USER_EMAIL'),
      role: this.configService.get<RolesEnum>('FIRST_USER_ROLE'),
    }).catch((reason: QueryFailedError) => {
      if (reason instanceof QueryFailedError && reason.message.includes("duplicate key value violates unique constraint")) {
        console.log('First user already exist.')
      } else if (reason instanceof QueryFailedError) {
        console.warn(reason.message)
      }
    })
  }

  createAdmin(createUserDto: CreateUserAdminDto): Promise<UserEntity> {
    return basicCreate(this.usersRepository, UserEntity, createUserDto)
  }

  create(createUserDto: CreateUserDto) {
    return basicCreate(this.usersRepository, UserEntity, createUserDto)
  }

  findAll(): Promise<UserEntity[]> {
    return this.usersRepository.find();
  }

  findOne(uuid: string): Promise<UserEntity> {
    const user = this.usersRepository.findOneBy({ id: uuid });

    if (!user) {
      throw new HttpException('No user found', HttpStatus.NOT_FOUND);
    }
    return user
  }

  update(uuid: string, updateUserDto: UpdateUserDto): Promise<UserEntity> {
    return basicUpdate(this.usersRepository, UserEntity, uuid, updateUserDto)
  }

  async likeClothe(id: string, idClothe: string) {
    let clothe = await this.clotheService.clotheRepository.findOne({ where: { id: idClothe } })

    if (!clothe) {
      throw new HttpException('This clothe don t exist', HttpStatus.NOT_FOUND);
    }
    return this.userClotheService.create(id, idClothe)
  }

  async dislikeClothe(id: string, idClothe: string) {
    let clothe = await this.clotheService.clotheRepository.findOne({ where: { id: idClothe } })

    if (!clothe) {
      throw new HttpException('This clothe don t exist', HttpStatus.NOT_FOUND);
    }
    return this.userClotheService.delete(id, idClothe)
  }


  async getClothe(id: string) {
    let find = await this.usersRepository.findOne({ where: { id: id }, relations: ['clotheLike'] })
    if (!find) {
      throw new HttpException('No user found', HttpStatus.NOT_FOUND);
    }
    return find.clotheLike
  }

  async updatePicture(uuid: string, file: FileEntity) {
    let find = await this.findOne(uuid)
    if (find && find.picture) {
      find.picture.remove()
    }
    find.picture = file
    return find.save()
  }

  async remove(uuid: string): Promise<void> {
    await this.userClotheService.deleteAllUser(uuid)
    await this.usersRepository.delete(uuid);
  }

  async checkAuth(uuid: string, caller: UserEntity): Promise<UserEntity> {
    const user = await this.findOne(uuid)

    if (caller.role === RolesEnum.Admin && (user.role === RolesEnum.Admin || user.role === RolesEnum.SuperAdmin)) {
      throw new HttpException('You don\'t have the right to access this route.', HttpStatus.BAD_REQUEST);
    } else if (caller.role === RolesEnum.SuperAdmin && user.role === RolesEnum.SuperAdmin) {
      throw new HttpException('You don\'t have the right to access this route.', HttpStatus.BAD_REQUEST);
    }

    return user
  }

  async sub(sub: SubscribeDto, uuid: string) {
    return basicUpdate(this.usersRepository, UserEntity, uuid, {
      swSub: JSON.stringify(sub)
    })
  }
}
