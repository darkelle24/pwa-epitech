import { basicCreate, basicUpdate } from '@/common/fn.helper';
import { RolesEnum } from '@Roles/roles';
import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryFailedError, Repository } from 'typeorm';
import { AuthHelper } from './auth/other/auth.helper';
import { CreateUserAdminDto, CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';
import { FileEntity } from '@File/entities/file.entity';
import { unlink } from 'fs';
import { ClothesService } from '@Clothe/clothes.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,

    private configService: ConfigService,

    private readonly clotheService: ClothesService,

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
    (createUserDto as any).clotheLike = []
    return basicCreate(this.usersRepository, UserEntity, createUserDto)
  }

  create(createUserDto: CreateUserDto) {
    (createUserDto as any).clotheLike = []
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
    let clothe = await this.clotheService.findOne(idClothe)
    let find = await this.usersRepository.findOne({ where: { id: id }, relations: ['clotheLike'] })
    let likeClothe = await find.clotheLike

    if (likeClothe.find((value) => idClothe === value.id)) {
      throw new HttpException('Already like this clothe', HttpStatus.BAD_REQUEST);
    }
    likeClothe.push(clothe);
    find.clotheLike = likeClothe
    await find.save()
    return likeClothe
  }

  async dislikeClothe(id: string, idClothe: string) {
    let find = await this.usersRepository.findOne({ where: { id: id }, relations: ['clotheLike'] })
    let likeClothe = await find.clotheLike

    let index = likeClothe.findIndex((value) => idClothe === value.id)
    if (index === -1) {
      throw new HttpException('Don t like this clothe', HttpStatus.BAD_REQUEST);
    }
    likeClothe.splice(index, 1)
    find.clotheLike = likeClothe
    await find.save()
    return likeClothe
  }


  async getClothe(id: string) {
    let find = await this.usersRepository.findOne({ where: { id: id }, relations: ['clotheLike'] })
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
}
