import { Module } from '@nestjs/common';
import { AxiosAdapter } from './adapters/AxiosAdapter';

@Module({
  providers: [AxiosAdapter],
  exports: [AxiosAdapter],
})
export class CommonModule {}
