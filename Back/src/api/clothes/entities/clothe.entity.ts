import { Entity, Column, PrimaryGeneratedColumn, Unique, BaseEntity, OneToMany, OneToOne, JoinColumn, BeforeRemove } from 'typeorm';
import { FileEntity } from '@File/entities/file.entity';
import { UserEntity } from '@User/entities/user.entity';

@Entity()
export class ClotheEntity extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({unique: true})
  name: string

  @Column()
  clotheAvaible: number

  @OneToOne(() => FileEntity, {
    eager: true,
    onDelete: 'SET NULL'
  })
  @JoinColumn()
  picture?: FileEntity

  @BeforeRemove()
  removePicture() {
    if (this.picture) {
      this.picture.remove()
    }
  }

  @OneToOne(() => UserEntity, {
    eager: true,
    onDelete: 'CASCADE'
  })
  @JoinColumn()
  user: UserEntity

  @Column({nullable: true})
  longitude?: number

  @Column({nullable: true})
  latitude?: number
}

