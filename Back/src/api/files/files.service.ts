import { FileEntity } from '@File/entities/file.entity';
import { basicCreate } from '@Helper/fn.helper';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { createReadStream, readFileSync } from 'fs';
import { join } from 'path';
import { Repository } from 'typeorm';
import { CreateFileDto } from './dto/create-file.dto';

@Injectable()
export class FilesService {
  constructor(
    @InjectRepository(FileEntity)
    private fileRepository: Repository<FileEntity>
  ) {}

  create(createFileDto: CreateFileDto): Promise<FileEntity> {
    return basicCreate(this.fileRepository, FileEntity, createFileDto)
  }

  createFile(file: Express.Multer.File): Promise<FileEntity> {
    return basicCreate(this.fileRepository, FileEntity, {name: file.originalname, path: file.path, mimetype: file.mimetype})
  }

  findAll() {
    return `This action returns all files`;
  }

  findOne(id: string) {
    const file = this.fileRepository.findOne({ where: { id: id }, select: ['id', 'path', 'name', 'mimetype'] });

    if (!file) {
      throw new HttpException('No file found', HttpStatus.NOT_FOUND);
    }
    return file
  }

  remove(id: string) {
    return `This action removes a #${id} file`;
  }

  fileBuffer(path: string) {
    return readFileSync(join(process.cwd(), path));
  }

  fileStream(path: string) {
    return createReadStream(join(process.cwd(), path));
  }
}
