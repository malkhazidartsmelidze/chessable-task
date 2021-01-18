import SimpleCrudService from './SimpleCrudService';

class EmployeeService extends SimpleCrudService {
  constructor() {
    super({
      resourceName: 'employee',
    });
  }
}

export default new EmployeeService();
