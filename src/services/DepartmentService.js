import api from 'common/api';
import SimpleCrudService from './SimpleCrudService';

class DepartmentService extends SimpleCrudService {
  constructor() {
    super({
      resourceName: 'department',
    });
  }

  autoComplete = (formData) => {
    return api.call('post', `${this.resourceName}/autocomplete`, formData).then(api.getData);
  };
}

export default new DepartmentService();
