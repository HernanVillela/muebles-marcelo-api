import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { configFactory } from './config.factory';
import { configSchema } from './config.schema';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      load: [configFactory],
      validationSchema: configSchema,
      validationOptions: {
        allowUnknown: true,
        abortEarly: true,
      },
    }),
  ],
  exports: [ConfigModule],
})
export class ConfigurationModule {}
