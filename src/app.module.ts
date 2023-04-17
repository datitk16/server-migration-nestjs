import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from 'db/data-source';
import { AuthModule } from 'src/auth/src/auth.module';

@Module({
  imports: [TypeOrmModule.forRoot(dataSourceOptions), AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
