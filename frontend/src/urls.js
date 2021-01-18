const urls = {
  HOME: '/',
  LOGIN: '/login',
  DASHBOARD: '/app/',

  DEPARTMENT: {
    list: '/app/departament/all',
    create: '/app/departament/create',
    edit: (id) => `/app/departament/${id}/edit`,
  },

  COMPANY: {
    list: '/app/company/all',
    create: '/app/company/create',
    edit: (id) => `/app/company/${id}/edit`,
  },

  EMPLOYEE: {
    list: '/app/employee/all',
    create: '/app/employee/create',
    edit: (id) => `/app/employee/${id}/edit`,
  },
};

export default urls;
