import { UserEntity } from '@/api/users/entities/user.entity';
import { OmitType } from "@nestjs/swagger";
import { IsNotEmpty, IsString, Length } from "class-validator";

export class LoginDto {
  @IsNotEmpty()
  @IsString()
  @Length(3, 30)
  password: string

  @IsNotEmpty()
  @IsString()
  username: string
}

export class AuthReturnDto extends OmitType(UserEntity, ["password"] as const) {
  token: string
}