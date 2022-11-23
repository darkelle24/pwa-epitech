import { Module } from '@nestjs/common';
import { ClothesService } from './clothes.service';
import { ClothesController } from './clothes.controller';
import { ClotheEntity } from './entities/clothe.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FilesModule } from '@File/files.module';

@Module({
  imports: [TypeOrmModule.forFeature([ClotheEntity]), FilesModule],
  controllers: [ClothesController],
  providers: [ClothesService],
  exports: [ClothesService]
})
export class ClothesModule {}
