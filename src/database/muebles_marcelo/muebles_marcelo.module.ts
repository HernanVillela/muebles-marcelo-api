import { Module } from '@nestjs/common';
import { MueblesMarceloService } from './muebles_marcelo.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigService } from '@nestjs/config';
import { Models } from './schemas';

@Module({
  providers: [MueblesMarceloService],
  imports: [SequelizeModule.forRootAsync({
      name: 'muebles_marcelo', 
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const dbConfig = configService.get('databases.muebles_marcelo');
        return {
          dialect: dbConfig.dialect,
          host: dbConfig.host,
          port: dbConfig.port,
          username: dbConfig.username,
          password: dbConfig.password,
          database: dbConfig.name,
          autoLoadModels: true,
          synchronize: true,
          logging: false
        };
      },
    }),
    SequelizeModule.forFeature([...Models], 'muebles_marcelo'),
  ],
  exports: [MueblesMarceloService]
})
export class MueblesMarceloModule {}
