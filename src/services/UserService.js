import api from 'common/api';

class UserService {
  /**
   * Login user with credentials.
   * @param {Object} data User Credentials
   * @param {String} data.email User Email
   * @param {String} data.password User Password
   */
  static login(data) {
    return api
      .call('post', '/auth/login', data)
      .then(api.getData)
      .then((data) => {
        if (data.token) {
          api.setToken(data.token);
        }
        return data;
      });
  }

  /**
   * Bootstrap user data
   */
  static bootstrap() {
    if (!Boolean(api.authToken)) {
      return new Promise((_, reject) => reject());
    }

    return api.call('post', '/auth/bootstrap').then(api.getData);
  }

  /**
   * Logout on backend and on frontnend
   */
  static logOut() {
    if (Boolean(api.authToken)) {
      api.call('post', '/auth/logout');
    }
    api.logOut();
  }
}

export default UserService;
