import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from 'db/data-source';
import { AuthModule } from 'src/auth/src/auth.module';

@Module({
  // migrations k phụ thuộc vào có import module hay không vd: AuthModule
  // mà nó phụ thuộc vào entities: ['dist/**/*.entity{.ts,.js}', 'dist/**/entity{.ts,.js}']
  imports: [TypeOrmModule.forRoot(dataSourceOptions), AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
