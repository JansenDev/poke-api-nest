import { Logger, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { PokemonModule } from './pokemon/pokemon.module';
import { MongooseModule } from '@nestjs/mongoose';
import { CommonModule } from './common/common.module';
import { SeedModule } from './seed/seed.module';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { configs } from './config/config.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      // isGlobal: true,
      load: [configs],
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    MongooseModule.forRoot(configs().DB.MONGO.URI),
    PokemonModule,
    CommonModule,
    SeedModule,
    HttpModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {
  constructor() {
    const logger = new Logger('NestApplication');
    const enviroment = configs();

    logger.log(`[DB]: Database up on ${enviroment.DB.MONGO.URI}`);
    logger.log( `[APP]: Server Up on port  http://localhost:${enviroment.APP.PORT}`, );
    console.log({tz: process.env.TZ});
    
  }
}
