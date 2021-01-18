import api from 'common/api';

class SimpleCrudService {
  constructor(data) {
    this.resourceName = data.resourceName;
  }
  /**
   * List All Resource
   * @return {Promise}
   */
  list = (query) => {
    return api.call('post', `/${this.resourceName}/list`, query).then(api.getData);
  };

  /**
   * Post Resource and save
   * @param {FormData|Object} data Resource Form Data
   * @return {Promise}
   */
  save = (data) => {
    return api.call('post', `/${this.resourceName}/save`, data).then(api.getData);
  };

  /**
   * Edit Resource
   * @param {FormData|Object} data Resource Form Data
   * @return {Promise}
   */
  edit = (data) => {
    return api.call('post', `/${this.resourceName}/update`, data).then(api.getData);
  };

  /**
   * Get Single Resource
   * @param {Number} id Resource ID
   * @return {Promise}
   */
  get = (id) => {
    return api.call('get', `/${this.resourceName}/${id}`).then(api.getData);
  };

  /**
   * Delete Resource
   * @param {Number} id Resource ID
   * @return {Promise}
   */
  delete = (id) => {
    return api.call('delete', `/${this.resourceName}/delete/${id}`).then(api.getData);
  };
}

export default SimpleCrudService;
