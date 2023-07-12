import { Controller, Get } from '@nestjs/common';

@Controller("grettings")
export class AppController {
  constructor() {}

  @Get()
  getHello() {
    return { greetigs: 'hello world' };
  }
}
