import { HttpServer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TransactionsModule } from './transactions/transactions.module';
import { OwnersModule } from './owners/owners.module';
import { AccountsModule } from './accounts/accounts.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Owner } from './owners/entities/owner.entity';
import { ConfigModule } from '@nestjs/config';
import { CategoriesModule } from './categories/categories.module';
import * as express from 'express';

@Module({
  imports: [
    TransactionsModule, OwnersModule, AccountsModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'database-test.czyusc842pwt.us-east-1.rds.amazonaws.com',
      port: 3306,
      username: 'dbtesting',
      password: 'dbpass_micasa0ficina',
      database: 'finance',
      autoLoadEntities: true,
      entities: [Owner],
      synchronize: false,
    }),
    ConfigModule.forRoot(),
    CategoriesModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
}
