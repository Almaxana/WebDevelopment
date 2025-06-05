// src/auth/auth.controller.ts
import { Controller, Get, Post, Res, Body, Req, HttpStatus, Logger, Inject, UseFilters, UnauthorizedException, InternalServerErrorException } from '@nestjs/common';
import { Response, Request } from 'express';
import { ConfigService } from '@nestjs/config';
import { AuthService } from './auth.service';
import { IsNotEmpty, IsString } from 'class-validator'; // Импортируем наш сервис

// Оставляем DTO здесь или выносим в отдельный файл
export class VerifyTokenDto { // <-- Добавьте export, если выносите в отдельный файл

  @IsString()   // Указываем, что это должна быть строка
  @IsNotEmpty() // Указываем, что строка не должна быть пустой
  idToken: string;
}

@Controller('auth') // Префикс для всех маршрутов этого контроллера
// @UseFilters(...) // Можно добавить фильтры исключений специфичные для auth, если нужно
export class AuthController {
  private readonly logger = new Logger(AuthController.name);

  // Инжектируем AuthService и ConfigService
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService // Оставляем для frontend config
  ) {}

  @Get('login')
  showLoginPage(@Req() req: Request, @Res() res: Response) {
    if (req.session?.user) {
      this.logger.verbose(`User ${req.session.user.uid} already logged in, redirecting to dashboard.`);
      return res.redirect('/');
    }
    this.logger.verbose('Showing login page.');
    const firebaseConfig = this.authService.getFrontendFirebaseConfig(this.configService);
    res.render('extraPages/login', {
      firebaseConfig: firebaseConfig,
    });
  }

  @Post('verify')
  async verifyToken(@Body() body: VerifyTokenDto, @Req() req: Request, @Res() res: Response) {
    try {
      // Вызываем метод сервиса для верификации и создания сессии
      const user = await this.authService.verifyFirebaseTokenAndCreateSession(body.idToken, req);

      this.logger.log(`User ${user.uid} successfully authenticated via verify endpoint.`);
      // Отправляем успешный ответ клиенту (фронтенд ожидает JSON с redirectUrl)
      return res.status(HttpStatus.OK).json({
        message: 'Login successful, redirecting...',
        redirectUrl: '/' // Явно указываем, куда редиректить
      });

    } catch (error) {
      // Ловим ошибки из сервиса (UnauthorizedException, InternalServerErrorException)
      this.logger.error(`Token verification failed: ${error.message}`);
      if (error instanceof UnauthorizedException) {
        return res.status(HttpStatus.UNAUTHORIZED).json({ message: error.message });
      } else if (error instanceof InternalServerErrorException) {
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
      } else {
        // Обработка других неожиданных ошибок
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'An unexpected error occurred during login.' });
      }
    }
  }

  @Get('logout')
  async logout(@Req() req: Request, @Res() res: Response) {
    try {
      const userId = req.session?.user?.uid; // Получаем ID до уничтожения сессии
      await this.authService.logoutUser(req); // Вызываем метод сервиса для логаута

      if (userId) {
        this.logger.log(`User ${userId} logged out.`);
      } else {
        this.logger.log('Logout attempt without active session.');
      }

      // Очищаем cookie на клиенте (дополнительно)
      res.clearCookie('connect.sid'); // Имя cookie по умолчанию для express-session
      // Редирект на страницу логина
      return res.redirect('/auth/login');
    } catch (error) {
      this.logger.error(`Error during logout: ${error.message}`);
      // Даже если была ошибка при уничтожении сессии, пытаемся редиректнуть
      return res.redirect('/auth/login');
    }
  }
}