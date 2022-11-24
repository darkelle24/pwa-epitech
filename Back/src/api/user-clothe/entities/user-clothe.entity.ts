import { ClotheEntity } from '@Clothe/entities/clothe.entity';
import { Entity, Column, PrimaryGeneratedColumn, Unique, BaseEntity, OneToMany, OneToOne, JoinColumn, BeforeRemove, ManyToMany, PrimaryColumn, ManyToOne } from 'typeorm';
import { UserEntity } from '@User/entities/user.entity';

@Entity('user_clothe', {synchronize: false})
export class UserClotheEntity {
  @PrimaryColumn({ name: 'user_id' })
  userId: string;

  @PrimaryColumn({ name: 'clothe_id' })
  clotheId: string;

  @ManyToOne(
    () => ClotheEntity,
    clothe => clothe.liked,
    {onDelete: 'NO ACTION', onUpdate: 'NO ACTION'}
  )
  @JoinColumn([{ name: 'clothe_id', referencedColumnName: 'id' }])
  clothes: ClotheEntity[];

  @ManyToOne(
    () => UserEntity,
    user => user.clotheLike,
    {onDelete: 'NO ACTION', onUpdate: 'NO ACTION'}
  )
  @JoinColumn([{ name: 'user_id', referencedColumnName: 'id' }])
  users: UserEntity[];
}

