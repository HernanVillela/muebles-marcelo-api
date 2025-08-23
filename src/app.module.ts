import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './routes/users/users.module';
import { DatabaseModule } from './database/database.module';
import { ConfigurationModule } from './config/config.module';
import { RoutesModule } from './routes/routes.module';

@Module({
  imports: [UsersModule, DatabaseModule, ConfigurationModule, RoutesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
