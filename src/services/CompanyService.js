import api from 'common/api';
import SimpleCrudService from './SimpleCrudService';

class CompanyService extends SimpleCrudService {
  constructor() {
    super({
      resourceName: 'company',
    });
  }

  autoComplete = (q) => {
    return api
      .call('get', `${this.resourceName}/autocomplete`, { params: { q } })
      .then(api.getData);
  };
}

export default new CompanyService();
