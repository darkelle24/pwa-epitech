import { RolesEnum } from '@Helper/roles/roles';
import { PartialType } from "@nestjs/mapped-types"
import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, Length } from "class-validator"
import { Trim } from 'class-sanitizer';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @Length(3, 30)
  @Trim()
  username: string

  @IsNotEmpty()
  @IsString()
  @Length(3, 30)
  password: string

  @IsNotEmpty()
  @IsEmail()
  @Trim()
  email: string
}

export class CreateUserAdminDto extends CreateUserDto {
  @IsEnum(RolesEnum)
  @IsOptional()
  role: RolesEnum
}