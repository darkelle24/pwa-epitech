import { ApiHideProperty, ApiProperty, OmitType } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, AfterLoad, BeforeRemove } from 'typeorm';
import {unlink} from 'fs'
import { join } from 'path';

@Entity()
export class FileEntity extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string

  @Column({ unique: true })
  path: string

  @Column()
  mimetype: string

  downloadLink: string;
  showLink: string;

  @AfterLoad()
  updateCounters() {
    this.downloadLink = '/files/download/' + this.id;
    this.showLink = '/files/show/' + this.id;
  }

  @BeforeRemove()
  updateStatus() {
    unlink(join(process.cwd(), this.path), (err) => {
      if (err) {
        console.error(this.path + ' wasn t deleted')
      }
    })
  }
}

