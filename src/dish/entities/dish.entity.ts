import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Order } from '../../order/entities/order.entity';
import { Expose } from 'class-transformer';
import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Entity()
export class Dish {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  @Field(() => Int)
  @Column('decimal', { precision: 5, scale: 2 })
  protein: number; // Белки

  @Field(() => Int)
  @Column('decimal', { precision: 5, scale: 2 })
  fat: number; // Жиры

  @Field(() => Int)
  @Column('decimal', { precision: 5, scale: 2 })
  carbohydrates: number; // Углеводы

  @Field(() => Int)
  @Column('decimal', { precision: 5, scale: 2 })
  price: number;

  @Field(() => Int)
  @Column('decimal', { precision: 5, scale: 2 })
  grams: number;

  @Field(() => Order, { nullable: true })
  @ManyToOne(() => Order, (order) => order.dishes, { nullable: true, onDelete: 'SET NULL', cascade: false })
  @Expose()
  order: Order | null;
}
