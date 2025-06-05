import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { parse } from 'pg-connection-string';
import { Dish } from './dish/entities/dish.entity';
import { DishModule } from './dish/dish.module';
import { OrderModule } from './order/order.module';
import { Order } from './order/entities/order.entity';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { ReviewModule } from './review/review.module';
import { Review } from './review/entities/review.entity';
import { ReservationModule } from './reservation/reservation.module';
import { Reservation } from './reservation/entities/reservation.entity';
import { UserModule } from './user/user.module';
import { User } from './user/entities/user.entity';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { OrderController } from './order/order.controller';
import { AuthMiddleware } from './auth/auth.middleware';
import { AuthModule } from './auth/auth.module';
import { StatsModule } from './stats/stats.module';
import { EndpointStat } from './stats/stats.entity';


@Module({
  imports: [
    ConfigModule.forRoot({
        isGlobal: true
      }
    ),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const connectionString = configService.get('DATABASE_URL');
        if (!connectionString) {
          throw new Error('DATABASE_URL is not defined');
        }
        const dbConfig = parse(connectionString);

        return {
          type: 'postgres',
          host: dbConfig.host?.toString(),
          port: Number(dbConfig.port),
          username: dbConfig.user?.toString(),
          password: dbConfig.password?.toString(),
          database: dbConfig.database?.toString(),
          entities: [Dish, Order, Review, Reservation, User, EndpointStat],
          ssl: {
            rejectUnauthorized: false,
          },
          synchronize: false,
        }
      },

    }),
    DishModule,
    OrderModule,
    EventEmitterModule.forRoot(),
    ReviewModule,
    ReservationModule,
    UserModule,
    AuthModule,
    StatsModule,
  ],
  controllers: [AppController],
  providers: [AppService],

})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware) // Применяем наш AuthMiddleware
      .exclude('auth/(.*)', '/') // Исключаем все маршруты /auth/* и главную '/'
      .forRoutes(OrderController); // Применяем ко всем маршрутам DashboardController
    // Можно также указать конкретные пути: .forRoutes('/dashboard', '/profile', ...)
  }
}
