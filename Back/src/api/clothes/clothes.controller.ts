import { Controller, Get, Post, Body, Patch, Param, Delete, UploadedFile, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Auth } from '@User/auth/other/auth.decorator';
import { User } from '@User/other/user.decorator';
import { ClothesService } from './clothes.service';
import { CreateClotheDto } from './dto/create-clothe.dto';
import { UpdateClotheDto } from './dto/update-clothe.dto';
import { UserEntity } from '@User/entities/user.entity';
import { ApiImageFile } from '@FileUploadHelpers/api-file.decorator';
import { FilesService } from '@File/files.service';

@ApiTags('Clothes')
@Controller('clothes')
export class ClothesController {
  constructor(private readonly clothesService: ClothesService, private readonly fileService: FilesService) {}

  @Post()
  @Auth()
  create(@Body() createClotheDto: CreateClotheDto, @User() user: UserEntity) {
    return this.clothesService.create(createClotheDto, user);
  }

  @Get()
  findAll() {
    return this.clothesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.clothesService.findOne(id);
  }

  @Put(':id')
  @Auth()
  async update(@Param('id') id: string, @Body() updateClotheDto: UpdateClotheDto, @User() user: UserEntity) {
    await this.clothesService.checkAuth(id, user)
    return this.clothesService.update(id, updateClotheDto);
  }

  @Put(':id/order')
  @Auth()
  async order(@Param('id') id: string, @User() user: UserEntity) {
    return this.clothesService.orderClothe(id);
  }

  @Put(':id/picture')
  @Auth()
  @ApiImageFile('picture', true)
  async updatePicture(@Param('id') id: string, @User() user: UserEntity, @UploadedFile() file: Express.Multer.File) {
    await this.clothesService.checkAuth(id, user)
    let save = await this.fileService.createFile(file)
    return this.clothesService.updatePicture(id, save);
  }

  @Delete(':id')
  @Auth()
  async remove(@Param('id') id: string, @User() user: UserEntity) {
    await this.clothesService.checkAuth(id, user)
    return this.clothesService.remove(id);
  }
}
