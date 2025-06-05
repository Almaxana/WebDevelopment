import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Order } from '../../order/entities/order.entity';
import { Reservation } from '../../reservation/entities/reservation.entity';
import { UserRole } from './user-role.enum';
import { Review } from '../../review/entities/review.entity';
import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Entity()
export class User {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Field()
  firstName: string;

  @Column()
  @Field()
  lastName: string;

  @OneToMany(() => Review, (review) => review.author, { onDelete: 'CASCADE', cascade: true })
  @Field(() => [Review], { nullable: true })
  reviews: Review[];

  @OneToMany(() => Order, (order) => order.author, { onDelete: 'CASCADE' })
  @Field(() => [Order], { nullable: true })
  orders: Order[];

  @OneToMany(() => Reservation, (reservation) => reservation.user, {onDelete: 'CASCADE', cascade: true})
  @Field(() => [Reservation], { nullable: true })
  reservations: Reservation[];

  @Field(() => UserRole)
  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.GUEST,
  })
  role: UserRole;
}