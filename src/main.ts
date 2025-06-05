import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as hbs from 'hbs';
import { ConfigService } from '@nestjs/config';
import { Logger, ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './http-exception.filter';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import session = require('express-session');
import * as admin from 'firebase-admin';
import * as Handlebars from 'handlebars';

async function bootstrap() {

  const app = await NestFactory.create<NestExpressApplication>(
    AppModule,
  );

  const configService = app.get(ConfigService);
  const logger = new Logger('Bootstrap');

  const serviceAccountPath = configService.get<string>('FIREBASE_SERVICE_ACCOUNT_PATH');
  if (!serviceAccountPath) {
    logger.error('FIREBASE_SERVICE_ACCOUNT_PATH is not defined in .env');
    process.exit(1);
  }
  try {
    const serviceAccount = require(join(process.cwd(), serviceAccountPath)); // Используем join для корректного пути
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      // databaseURL: configService.get<string>('FIREBASE_DATABASE_URL'), // Если используете Realtime Database
    });
    logger.log('Firebase Admin SDK initialized successfully.');
  } catch (error) {
    logger.error('Failed to initialize Firebase Admin SDK:', error);
    process.exit(1);
  }

  const sessionSecret = configService.get<string>('SESSION_SECRET');
  if (!sessionSecret) {
    logger.warn('SESSION_SECRET is not set in .env. Using a default, insecure secret for development only.');
  }
  app.use(
    session({
      secret: sessionSecret || 'a-very-insecure-default-secret-for-dev', // ЗАМЕНИТЕ НА СЕКРЕТ ИЗ .env В ПРОДАКШЕНЕ!
      resave: false, // Не сохранять сессию, если не было изменений
      saveUninitialized: false, // Не сохранять пустую сессию
      cookie: {
        secure: process.env.NODE_ENV === 'production', // Использовать secure cookie только в HTTPS
        maxAge: 1000 * 60 * 60 * 24 * 7 // Пример: сессия на 7 дней
      },
      // Рассмотрите использование session store (connect-redis, connect-mongo и т.д.) для продакшена
    }),
  );

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,   // Удаляет поля, которых нет в DTO
    forbidNonWhitelisted: true, // Ошибка, если есть лишние поля
    transform: true, // Приводит входные данные к нужному типу
  }));

  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  hbs.registerPartials(join(__dirname, '..', 'views', 'partials'));

  hbs.registerHelper('json', function(context) {
    // Используем SafeString из импортированного Handlebars
    return new Handlebars.SafeString(JSON.stringify(context));
  });

  hbs.registerHelper('truncate', function (str, len) {
    if (str && str.length > len) {
      return str.substring(0, len) + '...';
    }
    return str;
  });
  hbs.registerHelper('inc', (value: number) => value + 1);

  app.setViewEngine('hbs');

  app.useGlobalFilters(new HttpExceptionFilter());

  // swagger
  const config = new DocumentBuilder()
    .setTitle('MyRest API')
    .setDescription('Документация API для ресторана MyRest')
    .setVersion('1.0')
    .addTag('dish', 'Управление блюдами')
    .addTag('order', 'Управление заказами')
    .addTag('reservation', 'Управление бронированием')
    .addTag('review', 'Управление отзывами')
    .addTag('user', 'Управление пользователями')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);


  // Используем configService для получения переменной из .env файла
  const port = configService.get('PORT') ?? 3000;
  await app.listen(port);
  console.log("App started on PORT = ", port)
}
bootstrap();
