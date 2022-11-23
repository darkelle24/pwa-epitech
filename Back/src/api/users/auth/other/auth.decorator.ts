import { AddDescription } from '@Helper/add-description.decorator';
import { RolesEnum } from '@Helper/roles/roles';
import { RolesGuard } from '@Helper/roles/roles.guard';
import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiForbiddenResponse, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from './auth.guard';

/**
 * Decorator that check if the user is logged and check if it as a valid role to access this route
 *
 * @param roles roles to access this route
 *
 * @publicApi
 */
export function Auth(...roles: RolesEnum[]) {
  return applyDecorators(
    SetMetadata('roles', roles),
    UseGuards(JwtAuthGuard, RolesGuard),
    AddDescription("## Access\n### To access this route need to be authentified" + (roles && roles.length !== 0 ? (" and have one of this role [" + roles.join(', ') + "].") : "."), 5),
    ApiBearerAuth(),
    ApiUnauthorizedResponse({ description: 'You need to be logged to access this route.' }),
    ApiForbiddenResponse({ description: 'You don\'t have the right to access this route.'})
  );
}