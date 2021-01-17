import SimpleCrudService from './SimpleCrudService';

class CompanyService extends SimpleCrudService {
  constructor() {
    super({
      resourceName: 'company',
    });
  }
}

export default new CompanyService();
