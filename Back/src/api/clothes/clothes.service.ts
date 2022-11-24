import { forwardRef, HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreateClotheDto } from './dto/create-clothe.dto';
import { UpdateClotheDto } from './dto/update-clothe.dto';
import { UserEntity } from '@User/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ClotheEntity } from './entities/clothe.entity';
import { Repository } from 'typeorm';
import { basicCreate, basicUpdate } from '@Helper/fn.helper';
import { FileEntity } from '@File/entities/file.entity';
import { UserClotheService } from '../user-clothe/user-clothe.service';
import { sendNotification } from 'web-push';

const notificationPayload = {
  "notification": {
      "title": "Angular News",
      "body": "Newsletter Available!",
      "icon": "assets/main-page-logo-small-hat.png",
      "vibrate": [100, 50, 100],
      "data": {
          "dateOfArrival": Date.now(),
          "primaryKey": 1
      },
      "actions": [{
          "action": "explore",
          "title": "Go to the site"
      }]
  }
};

@Injectable()
export class ClothesService {

  constructor(
    @InjectRepository(ClotheEntity)
    public clotheRepository: Repository<ClotheEntity>,

    @Inject(forwardRef(() => UserClotheService))
    private userClotheService: UserClotheService,
  ) {}

  create(createClotheDto: CreateClotheDto, user: UserEntity) {
    return basicCreate(this.clotheRepository, ClotheEntity, {
      name: createClotheDto.name,
      clotheAvaible: createClotheDto.clotheAvaible,
      user: user,
      latitude: createClotheDto.latitude,
      longitude: createClotheDto.longitude
    })
  }

  findAll() {
    return this.clotheRepository.find();
  }

  findOne(id: string) {
    const clothe = this.clotheRepository.findOne({ where: { id: id }});

    if (!clothe) {
      throw new HttpException('No clothe found', HttpStatus.NOT_FOUND);
    }
    return clothe
  }

  async update(id: string, updateClotheDto: UpdateClotheDto) {
    let toReturn = await basicUpdate(this.clotheRepository, ClotheEntity, id, updateClotheDto)
    if (updateClotheDto.clotheAvaible) {
      let ToSend = JSON.stringify(notificationPayload)
      let user = await this.getLike(id)
      user.forEach(async user => {
        if (user.swSub) {
          let sub = JSON.parse(user.swSub)
          await sendNotification(sub, ToSend)
        }
      })
    }
    return toReturn
  }

  async orderClothe(id: string) {
    let find = await this.findOne(id)
    if (find && find.clotheAvaible > 0) {
      find.clotheAvaible = find.clotheAvaible - 1
      return find.save()
    } else {
      throw new HttpException('Can t order clothe who have no stock remaining', HttpStatus.BAD_REQUEST);
    }
  }

  async updatePicture(uuid: string, file: FileEntity) {
    let find = await this.findOne(uuid)
    if (find && find.picture) {
      find.picture.remove()
    }
    find.picture = file
    return find.save()
  }

  async remove(id: string) {
    let clothe = await this.clotheRepository.findOne({ where: { id: id } })
    if (!clothe) {
      throw new HttpException('No clothe found', HttpStatus.NOT_FOUND);
    }

    await this.userClotheService.deleteAllCLothe(id)
    return this.clotheRepository.remove(clothe)
  }

  async checkAuth(id: string, user: UserEntity) {
    const clothe = await this.findOne(id)

    if (clothe.user.id !== user.id) {
      throw new HttpException('Can t update a cloathe you don t have created', HttpStatus.BAD_REQUEST);
    }

    return clothe
  }

  async getLike(id: string) {
    let find = await this.clotheRepository.findOne({ where: { id: id }, relations: ['liked'] })
    if (!find) {
      throw new HttpException('No clothe found', HttpStatus.NOT_FOUND);
    }
    return find.liked
  }
}
