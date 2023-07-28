import { Module } from '@nestjs/common';
import { AxiosAdapter } from './adapters/AxiosAdapter';
import { HttpModule } from '@nestjs/axios';

@Module({
  providers: [AxiosAdapter],
  imports: [HttpModule],
  exports: [
    AxiosAdapter,
    HttpModule.register({
      timeout: 60_000,
    }),
  ],
})
export class CommonModule {}
