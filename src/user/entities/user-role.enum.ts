import { registerEnumType } from '@nestjs/graphql';

export enum UserRole {
  GUEST = 'guest',
  ADMIN = 'admin',
}

registerEnumType(UserRole, {
  name: 'UserRole',
});