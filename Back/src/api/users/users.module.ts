import { AuthModule } from './auth/auth.module';
import { UserEntity } from './entities/user.entity';
import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FilesModule } from '@File/files.module';
import { ClothesModule } from '@Clothe/clothes.module';
import { UserClotheModule } from '../user-clothe/user-clothe.module';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), AuthModule, FilesModule, ClothesModule, UserClotheModule],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService]
})
export class UsersModule {}
