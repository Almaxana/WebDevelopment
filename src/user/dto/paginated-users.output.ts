import { ObjectType, Field } from '@nestjs/graphql';
import { User } from '../entities/user.entity';

@ObjectType()
export class PaginatedUsers {
  @Field(() => [User])
  data: User[];

  @Field()
  total: number;
}