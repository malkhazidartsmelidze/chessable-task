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
   * Edit Company
   * @param {FormData|Object} data Company Form Data
   * @return {Promise}
   */
  static edit(data) {
    return api.call('post', '/company/update', data).then(api.getData);
  }

  /**
   * Get Single Company
   * @param {Number} id Company ID
   * @return {Promise}
   */
  static get(id) {
    return api.call('get', `/company/${id}`).then(api.getData);
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
