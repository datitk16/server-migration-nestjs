import { Employee } from 'src/employee/entity';
import { EmployeeService } from './service';
import { Body, Controller, Post } from '@nestjs/common';

@Controller('employee')
export class EmployeeController {
    constructor(
        private readonly employeeService: EmployeeService,
    ) { }

    @Post('getList')
    async getList(): Promise<Employee[]> {
        return this.employeeService.getList();
    }

    @Post('create')
    async create(@Body() employee: Employee): Promise<Employee> {
        return this.employeeService.create(employee);
    }
}
