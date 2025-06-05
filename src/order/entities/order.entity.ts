import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Dish } from '../../dish/entities/dish.entity';
import { OrderStatus } from '../order-status';
import { User } from '../../user/entities/user.entity';
import { Field, Int, ObjectType } from '@nestjs/graphql';

@Entity()
@ObjectType()
export class Order {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.orders, { eager: true, nullable: false, onDelete: 'CASCADE' })
  author: User;

  @Field(() => [Dish])
  @OneToMany(() => Dish, (dish) => dish.order, { eager: true, cascade: false })
  dishes: Dish[];

  @Field(() => OrderStatus)
  @Column({
    type: 'enum',
    enum: OrderStatus,
    default: OrderStatus.PENDING,
  })
  status: OrderStatus;

  @Field()
  @CreateDateColumn()
  createdAt: Date;
}
