import React, { createContext, useContext, useState } from 'react';

const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const [notifications, setNotifications] = useState({});

  /**
   * Display new notification in App
   * @param {String} text notification text
   * @param {String} status Notification Status
   * @param {Object} options Notification options
   */
  const notificate = (text, status = null, options = {}) => {
    const notifId = new Date().getTime();

    const notification = {
      text: text,
      id: notifId,
      status: status || 'success',
      options,
    };

    setNotifications({ ...notifications, [notifId]: notification });
  };

  /**
   * When notification is closed
   * @param {Number} notificationId Id (timestamp) of notification
   */
  const onNotificationClose = (notificationId) => {
    setNotifications((old) => {
      delete old[notificationId];
      return { ...old };
    });
  };

  /**
   * Catch response and if success save in notifications
   *
   * @param {Object} res Response data got from server
   * @return {Object} Response
   */
  const catchApiSuccess = (res) => {
    let notif = {};

    if (typeof res._notification === 'object') {
      notif = res._notification;
    } else if (typeof res.data?._notification === 'object') {
      notif = res._notification;
    } else return;

    notificate(notif.text, notif.status, notif.options || {});
  };

  return (
    <AppContext.Provider
      value={{
        catchApiSuccess,
        onNotificationClose,
        notificate,
        notifications,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

const useApp = () => useContext(AppContext);

export default useApp;
