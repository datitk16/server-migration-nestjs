import { ApiTags, ApiOkResponse, ApiBearerAuth } from '@nestjs/swagger';
import { Employee } from 'src/employee/entity';
import { EmployeeService } from './service';
import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Permission } from '@libs/shared/guards';
import { EmployeeDto } from './dto';
@Controller('employee')
export class EmployeeController {
    constructor(
        private readonly employeeService: EmployeeService,
    ) { }

    @ApiOkResponse()
    @ApiBearerAuth()
    @ApiTags('Employee')
    @UseGuards(AuthGuard('jwt'), Permission({ action: 'read' }))
    @Post('getList')
    async getList(): Promise<Employee[]> {
        return this.employeeService.getList();
    }

    @ApiOkResponse()
    @ApiBearerAuth()
    @ApiTags('Employee')
    @UseGuards(AuthGuard('jwt'), Permission({ action: 'create' }))
    @Post('create')
    async create(@Body() employee: EmployeeDto): Promise<Employee> {
        return this.employeeService.create(employee);
    }
}
