import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  private readonly logger = new Logger(AuthMiddleware.name);

  use(req: Request, res: Response, next: NextFunction) {
    this.logger.verbose(`Checking authentication for: ${req.originalUrl}`);
    // Проверяем, есть ли пользователь в сессии
    if (req.session && req.session.user) {
      this.logger.verbose(`User authenticated (UID: ${req.session.user.uid}). Proceeding...`);
      next(); // Пользователь аутентифицирован, продолжаем
    } else {
      this.logger.warn(`User not authenticated. Redirecting to login from: ${req.originalUrl}`);
      // Пользователь не аутентифицирован, перенаправляем на страницу входа
      res.redirect('/auth/login');
    }
  }
}