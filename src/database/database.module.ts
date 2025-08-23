import { Global, Module } from '@nestjs/common';
import { MueblesMarceloModule } from './muebles_marcelo/muebles_marcelo.module';

@Global()
@Module({
  imports: [MueblesMarceloModule],
  exports: [MueblesMarceloModule]
})
export class DatabaseModule {}
