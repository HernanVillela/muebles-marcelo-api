import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { ConfigurationModule } from './config/config.module';
import { RoutesModule } from './routes/routes.module';

@Module({
  imports: [DatabaseModule, ConfigurationModule, RoutesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
