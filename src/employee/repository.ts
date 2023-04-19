import { Employee } from 'src/employee/entity';
import { EntityRepository } from '@libs/shared/typeorm/decorators';
import { BaseRepository } from '@libs/shared/typeorm/repositories';

@EntityRepository(Employee)
export class EmployeeRepository extends BaseRepository<Employee> { }
