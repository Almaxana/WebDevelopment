// src/auth/auth.service.ts

import { Injectable, Logger, UnauthorizedException, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as admin from 'firebase-admin'; // Импортируем Firebase Admin
import { Request } from 'express'; // Нужен тип Request для доступа к сессии

// Определим тип для возвращаемого пользователя (можно вынести в отдельный файл)
export interface AuthenticatedUser {
  uid: string;
  email?: string;
  name?: string;
  // Добавьте другие поля по необходимости
}

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  async verifyFirebaseTokenAndCreateSession(idToken: string, req: Request): Promise<AuthenticatedUser> {
    if (!idToken) {
      this.logger.warn('Verification attempt without ID token.');
      throw new UnauthorizedException('ID token is required.'); // Используем стандартные исключения NestJS
    }

    try {
      this.logger.log(`Verifying ID token...`);
      const decodedToken = await admin.auth().verifyIdToken(idToken);
      const uid = decodedToken.uid;
      const email = decodedToken.email;
      this.logger.log(`ID Token verified successfully for UID: ${uid}, Email: ${email}`);

      const userToSave: AuthenticatedUser = {
        uid: uid,
        email: email,
        name: decodedToken.name,
      };

      req.session.user = userToSave;

      await new Promise<void>((resolve, reject) => {
        req.session.save((err) => {
          if (err) {
            this.logger.error('Failed to save session after login:', err);
            reject(new InternalServerErrorException('Session save error.'));
          } else {
            this.logger.log(`User session saved for UID: ${uid}.`);
            resolve();
          }
        });
      });

      // Возвращаем данные пользователя
      return userToSave;

    } catch (error) {
      this.logger.error('Firebase ID token verification or session save failed:', error);
      // Если ошибка не InternalServerErrorException, считаем ее ошибкой авторизации
      if (!(error instanceof InternalServerErrorException)) {
        throw new UnauthorizedException('Invalid Firebase token or failed verification.');
      }
      throw error;
    }
  }

  async logoutUser(req: Request): Promise<void> {
    if (req.session) {
      const userId = req.session.user?.uid || 'Unknown user';
      await new Promise<void>((resolve, reject) => {
        req.session.destroy((err) => {
          if (err) {
            this.logger.error(`Error destroying session for user ${userId}:`, err);
            resolve();
          } else {
            this.logger.log(`Session destroyed for user ${userId}.`);
            resolve();
          }
        });
      });
    }
  }

  getFrontendFirebaseConfig(configService: ConfigService): Record<string, any> {
    return {
      apiKey: configService.get('FIREBASE_API_KEY'),
      authDomain: configService.get('FIREBASE_AUTH_DOMAIN'),
      projectId: configService.get('FIREBASE_PROJECT_ID'),
      storageBucket: configService.get('FIREBASE_STORAGE_BUCKET'),
      messagingSenderId: configService.get('FIREBASE_MESSAGING_SENDER_ID'),
      appId: configService.get('FIREBASE_APP_ID'),
    };
  }

}