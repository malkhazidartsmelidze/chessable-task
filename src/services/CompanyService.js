import api from 'common/api';

class CompanyService {
  /**
   * List All Company
   * @return {Promise}
   */
  static list() {
    return api.call('get', '/company/list').then(api.getData);
  }

  /**
   * Post Company and save
   * @param {FormData|Object} data Company Form Data
   * @return {Promise}
   */
  static save(data) {
    return api.call('post', '/company/save', data).then(api.getData);
  }

  /**
   * Delete Company
   * @param {Number} id Company ID
   * @return {Promise}
   */
  static delete(id) {
    return api.call('delete', `/company/delete/${id}`).then(api.getData);
  }
}

export default CompanyService;
