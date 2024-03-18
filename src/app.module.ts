import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DataSource } from 'typeorm';
import dbConfig from './config/db.config';
import { GarageUIAppModule } from './Modules/UIToUX_Module/garage-ui.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    GarageUIAppModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

export const dbConnection = new DataSource(dbConfig());
dbConnection
  .initialize()
  .then(() => {
    //console.log(`Data Source has been initialized!`);
  })
  .catch((err) => {
    console.error('Error during Data Source initialization', err);
  });
