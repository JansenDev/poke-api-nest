import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { PokemonModule } from './pokemon/pokemon.module';
import { MongooseModule } from '@nestjs/mongoose';
import { CommonModule } from './common/common.module';
import { SeedModule } from './seed/seed.module';
import { HttpModule } from '@nestjs/axios';

const MONGO_URI = 'mongodb://127.0.0.1:27017/nest-pokemon';
@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    MongooseModule.forRoot(MONGO_URI),
    PokemonModule,
    CommonModule,
    SeedModule,
    HttpModule,
    HttpModule
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
