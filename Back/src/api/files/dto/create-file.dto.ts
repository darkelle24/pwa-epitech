import { Trim } from "class-sanitizer"
import { IsNotEmpty, IsString, Length, IsEmail } from "class-validator"

export class CreateFileDto {
  @IsNotEmpty()
  @IsString()
  name: string

  @IsNotEmpty()
  @IsString()
  path: string

  @IsNotEmpty()
  @IsString()
  mimetype: string
}
