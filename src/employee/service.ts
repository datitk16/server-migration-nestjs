import { Employee } from 'src/employee/entity';
import { EmployeeRepository } from './repository';
import { Injectable } from '@nestjs/common';
import { EmployeeDto } from './dto';

@Injectable()
export class EmployeeService {
    constructor(
        private readonly employeeRepository: EmployeeRepository,
    ) { }

    async getList(): Promise<Employee[]> {
        return this.employeeRepository.find();
    }

    async create(employee: EmployeeDto): Promise<Employee> {
        const payload = this.employeeRepository.create(employee);
        return this.employeeRepository.save(payload)
    }

}
