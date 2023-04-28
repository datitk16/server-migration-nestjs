import { EmployeeService } from './employee/service';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from 'db/data-source';
import { AuthModule } from 'auth/src/auth.module';
import { EmployeeController } from './employee/controller';
import { EmployeeRepository } from './employee/repository';
import { EmployeeTemplateControler } from './employee-template/controller';
import { EmployeeTemnplateSerivce } from './employee-template/service';
import { TemplateService } from './templates/service';
import { TemplateRepository } from './templates/repository';

@Module({
  // migrations k phụ thuộc vào có import module hay không vd: AuthModule
  // mà nó phụ thuộc vào entities: ['dist/**/*.entity{.ts,.js}', 'dist/**/entity{.ts,.js}']
  imports: [
    TypeOrmModule.forRoot(dataSourceOptions), AuthModule,
  ],
  controllers: [AppController, EmployeeController, EmployeeTemplateControler],
  providers: [AppService, EmployeeService, EmployeeRepository, EmployeeTemnplateSerivce, TemplateService, TemplateRepository],
})
export class AppModule { }
