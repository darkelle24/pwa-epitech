import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppService } from './app.service';
import { UsersModule } from './api/users/users.module';
import { AuthModule } from './api/users/auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { FilesModule } from './api/files/files.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
          type: 'postgres',
          host: configService.get<string>('DB_HOST'),
          port: configService.get<number>('DB_PORT'),
          username: configService.get<string>('DB_USER'),
          password: configService.get<string>('DB_PASSWORD'),
          database: configService.get<string>('DB_NAME'),
          synchronize: configService.get<boolean>('DB_SYNC'),
          autoLoadEntities: true,
          migrations: ['src/migration/*{.ts,.js}'],
          cli: {
            migrationsDir: 'src/migration'
          },
      }),
      inject: [ConfigService]
      }
    ),
    UsersModule,
    AuthModule,
    FilesModule,
  ],
  controllers: [],
  providers: [AppService]
})
export class AppModule { }
