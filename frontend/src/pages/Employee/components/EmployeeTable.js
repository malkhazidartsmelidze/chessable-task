import React from 'react';
import qs from 'query-string';

import EmployeeService from 'services/EmployeeService';
import formatCurrency from 'common/formatters/formatCurrency';
import ResourceTable from 'components/ResourceTable';
import P from 'urls';

const EmployeeTable = (props) => {
  const params = qs.parse(window.location.search);

  return (
    <ResourceTable
      enableCreate
      enableEdit
      enableRefresh
      enableDelete
      urls={P.EMPLOYEE}
      resourceName='Employee'
      Service={EmployeeService}
      columns={[
        { title: 'ID', field: 'id', filtering: false },
        { title: 'Name', field: 'name' },
        { title: 'Company Name', field: 'company_name', defaultFilter: params.company_name || '' },
        {
          title: 'Department Name',
          field: 'department_name',
          defaultFilter: params.department_name || '',
        },
        { title: 'Address', field: 'address' },
        {
          title: 'Bank Account',
          field: 'bank_account',
          filtering: false,
        },
        {
          title: 'Salary',
          field: 'salary',
          filtering: false,
          render: (rowData) => formatCurrency(rowData.salary),
        },
      ]}
      options={{
        filtering: true,
      }}
      {...props}
    />
  );
};

export default EmployeeTable;
