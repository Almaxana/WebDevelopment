// src/auth/auth.module.ts

import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { ConfigModule } from '@nestjs/config'; // Импортируем ConfigModule

@Module({
  imports: [
    ConfigModule, // Делаем ConfigService доступным для инъекции в AuthController/AuthService
  ],
  controllers: [AuthController], // Регистрируем контроллер этого модуля
  providers: [AuthService],     // Регистрируем сервис этого модуля
  // exports: [AuthService] // Раскомментируйте, если AuthService нужен в других модулях
})
export class AuthModule {}