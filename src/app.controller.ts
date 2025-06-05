import { Controller, Get, Query, Render, Req, Res, Sse } from '@nestjs/common';
import { fromEvent, interval, map, Observable } from 'rxjs';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Request, Response } from 'express';


@Controller()
export class AppController {
  constructor(private eventEmitter: EventEmitter2) {}
  @Get()
  @Render('index')
  root(@Req() req: Request, @Res() res: Response) {
    const user = req.session.user;
    return {
        status: user != undefined
    }

  }

  @Get('Gallery')
  @Render('extraPages/Gallery')
  gallery(@Query('auth') auth: string) {
    const authed = auth === 'authed';
    if (authed) {
      return {
        status: true
      }
    }
  }

  @Get('DishesWishList')
  @Render('extraPages/DishesWishList')
  wishList() {}

  @Get('Login')
  @Render('extraPages/Login')
  login(@Query('auth') auth: string) {
    const authed = auth === 'authed';
    if (authed) {
      return {
        status: true
      }
    }
  }


  @Get('SignIn')
  @Render('extraPages/SignIn')
  signIn(@Query('auth') auth: string) {
    const authed = auth === 'authed';
    if (authed) {
      return {
        status: true
      }
    }
  }

  // @Sse('sse')
  // sse(): Observable<MessageEvent> {
  //   return fromEvent(this.eventEmitter, 'review.created').pipe(
  //     map((_) => ({ data: 'New review created' } ) as MessageEvent),
  //   );
  // }

}