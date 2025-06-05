import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { ObjectType, Field, Int } from '@nestjs/graphql';

@Entity()
@ObjectType()
export class Review {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column()
  @Field({ description: 'Содержимое отзыва' })
  content: string;

  @JoinColumn()
  @ManyToOne(() => User, (user) => user.reviews, {
    eager: true,
    nullable: false,
    onDelete: 'CASCADE'
  })
  @Field(() => User, { description: 'Автор отзыва' })
  author: User;
}