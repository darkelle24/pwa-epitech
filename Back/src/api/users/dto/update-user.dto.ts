import { UserEntity } from '@/api/users/entities/user.entity';
import { OmitType, PartialType } from '@nestjs/swagger';

export class UpdateUserDto extends PartialType(OmitType(UserEntity, ['password', 'email', 'role', 'id', 'picture'] as const)) {
}

export class UpdateUserAdminDto extends PartialType(OmitType(UserEntity, ['id', 'picture'] as const)) { }
