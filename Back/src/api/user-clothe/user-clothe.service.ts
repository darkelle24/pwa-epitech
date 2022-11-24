import { UserClotheEntity } from './entities/user-clothe.entity';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserClotheService {

  constructor(
    @InjectRepository(UserClotheEntity)
    private readonly userClotheRepository: Repository<UserClotheEntity>,
  ) {}

  async create(idUser: string, idClothe: string) {
    let check = await this.userClotheRepository.findOne({ where: { userId: idUser, clotheId: idClothe } })
    if (check) {
      throw new HttpException('Already like this clothe', HttpStatus.BAD_REQUEST);
    }
    return this.userClotheRepository.save({userId: idUser, clotheId: idClothe})
  }

  async delete(idUser: string, idClothe: string) {
    let check = await this.userClotheRepository.findOne({ where: { userId: idUser, clotheId: idClothe } })
    if (!check) {
      throw new HttpException('Don t like this clothe', HttpStatus.BAD_REQUEST);
    }
    return this.userClotheRepository.remove(check)
  }

  async deleteAllCLothe(idClothe: string) {
    let check = await this.userClotheRepository.find({ where: { clotheId: idClothe } })

    return this.userClotheRepository.remove(check)
  }

  async deleteAllUser(idUser: string) {
    let check = await this.userClotheRepository.find({ where: { userId: idUser } })

    return this.userClotheRepository.remove(check)
  }
}
