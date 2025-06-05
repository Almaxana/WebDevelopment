// src/types/express-session.d.ts

import 'express-session';
import { Session, SessionData } from 'express-session'; // Обязательно импортируйте модуль для расширения

declare module 'express-session' {
  // Расширяем интерфейс SessionData
  interface SessionData {
    // Добавляем наше пользовательское свойство 'user'
    // Сделайте его опциональным (?), так как оно существует не всегда
    // (например, до логина пользователя сессия может существовать, но без user)
    user?: {
      uid: string;       // Firebase User ID - обязательное поле
      email?: string;      // Email - опционально, если может отсутствовать
      name?: string;       // Имя - опционально
// Добавьте сюда
    }
  }
}

