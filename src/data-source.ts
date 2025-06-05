import 'dotenv/config';
import { DataSource } from 'typeorm';
import { parse } from 'pg-connection-string';
import { Dish } from './dish/entities/dish.entity';
import { Order } from './order/entities/order.entity';
import { Review } from './review/entities/review.entity';
import { Reservation } from './reservation/entities/reservation.entity';
import { User } from './user/entities/user.entity';
import { EndpointStat } from './stats/stats.entity';


const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error('DATABASE_URL is not defined');
}

const dbConfig = parse(connectionString);

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: dbConfig.host ?? undefined,
  port: dbConfig.port ? Number(dbConfig.port) : 5432,
  username: dbConfig.user ?? undefined,
  password: dbConfig.password ?? undefined,
  database: dbConfig.database ?? undefined,
  entities: [Dish, Order, Review, Reservation, User, EndpointStat],
  migrations: ['src/migrations/*.ts'],
  ssl: {
    rejectUnauthorized: false,
  },
  synchronize: false,
});
