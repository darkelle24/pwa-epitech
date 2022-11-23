import { Trim } from "class-sanitizer"
import { IsEmail, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, Min } from "class-validator"

export class CreateClotheDto {
  @IsNotEmpty()
  @IsString()
  @Trim()
  name: string

  @IsNotEmpty()
  @IsInt()
  @Min(0)
  clotheAvaible: number

  @IsOptional()
  @IsNumber()
  longitude?: number

  @IsOptional()
  @IsNumber()
  latitude?: number
}
