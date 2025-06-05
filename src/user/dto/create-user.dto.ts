import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from '../entities/user-role.enum';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateUserDto {
  @ApiProperty({
    description: 'Имя пользователя',
    example: 'John',
  })
  @Field({ description: 'Имя пользователя' })
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({
    description: 'Фамилия пользователя',
    example: 'Doe',
  })
  @Field({ description: 'Фамилия пользователя' })
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @ApiProperty({
    description: 'Роль пользователя',
    example: 'ADMIN',
    enum: UserRole,
  })
  @Field(() => UserRole, { description: 'Роль пользователя' })
  @IsEnum(UserRole)
  role: UserRole;
}
