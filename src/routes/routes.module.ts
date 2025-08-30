import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { AdminModule } from './admin/admin.module';

@Module({
  imports:[DatabaseModule, AdminModule],
})
export class RoutesModule {}