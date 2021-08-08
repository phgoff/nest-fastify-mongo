import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CatsModule } from './cats/cats.module';
import { CoreModule } from './core/core.interceptors';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/auto-buy'),
    CoreModule,
    CatsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
