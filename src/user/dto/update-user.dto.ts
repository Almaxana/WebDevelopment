import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { UserRole } from '../entities/user-role.enum';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateUserDto extends PartialType(CreateUserDto) {
  @Field({ description: 'Имя пользователя' })
  @ApiPropertyOptional({
    description: 'Имя пользователя',
    example: 'John',
  })
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @Field({ description: 'Фамилия пользователя' })
  @ApiPropertyOptional({
    description: 'Фамилия пользователя',
    example: 'Doe',
  })
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @Field(() => UserRole, { description: 'Роль пользователя' })
  @ApiPropertyOptional({
    description: 'Роль пользователя',
    example: 'ADMIN',
    enum: UserRole,
  })
  @IsEnum(UserRole)
  role: UserRole;
}
