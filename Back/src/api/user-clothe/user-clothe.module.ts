import { UserClotheEntity } from './entities/user-clothe.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserClotheService } from './user-clothe.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserClotheEntity])],
  providers: [UserClotheService],
  exports: [UserClotheService]
})
export class UserClotheModule {}
