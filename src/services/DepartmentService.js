import SimpleCrudService from './SimpleCrudService';

class DepartmentService extends SimpleCrudService {
  constructor() {
    super({
      resourceName: 'department',
    });
  }
}

export default new DepartmentService();
