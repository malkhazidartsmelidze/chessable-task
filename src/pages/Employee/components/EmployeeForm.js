import React from 'react';

import ResourceForm from 'components/ResourceForm';
import EmployeeService from 'services/EmployeeService';
import DepartmentService from 'services/DepartmentService';
import CompanyService from 'services/CompanyService';
import P from 'urls';

const EmployeeForm = (props) => {
  return (
    <ResourceForm
      Service={EmployeeService}
      urls={P.EMPLOYEE}
      onCreate='show_list'
      onUpdate='show_list'
      fields={[
        {
          name: 'name',
          label: 'Employee Name',
          autoFocus: true,
          required: true,
          sizes: { xs: 12, md: 6 },
        },
        {
          name: 'lastname',
          label: 'Employee Lastname',
          required: true,
          sizes: { xs: 12, md: 6 },
        },
        {
          name: 'address',
          label: 'Address',
        },
        {
          name: 'bank_account',
          label: 'Bank Account',
        },
        {
          name: 'salary',
          label: 'Salary',
          type: 'number',
          required: true,
        },
        {
          name: 'company_id',
          label: 'Company',
          required: true,
          autocomplete: true,
          column: 'name',
          service: CompanyService,
        },
        {
          name: 'department_id',
          label: 'Department',
          required: true,
          autocomplete: true,
          column: 'name',
          service: DepartmentService,
        },
      ]}
      {...props}
    />
  );
};

export default EmployeeForm;
