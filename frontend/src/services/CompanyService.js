import api from 'common/api';
import SimpleCrudService from './SimpleCrudService';

class CompanyService extends SimpleCrudService {
  constructor() {
    super({
      resourceName: 'company',
    });
  }

  autoComplete = (formData) => {
    return api.call('post', `${this.resourceName}/autocomplete`, formData).then(api.getData);
  };
}

export default new CompanyService();
