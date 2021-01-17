import React from 'react';

import CompanyService from 'services/CompanyService';
import formatCurrency from 'common/formatters/formatCurrency';
import ResourceTable from 'components/ResourceTable';
import P from 'urls';

const CompanyTable = (props) => {
  return (
    <ResourceTable
      enableCreate
      enableEdit
      enableRefresh
      enableDelete
      urls={P.COMPANY}
      resourceName='Company'
      Service={CompanyService}
      columns={[
        { title: 'ID', field: 'id' },
        { title: 'Name', field: 'name' },
        { title: 'Address', field: 'address' },
        { title: 'Code', field: 'code' },
        { title: 'Departaments', field: 'dep_count' },
        { title: 'Total Employees', field: 'total_employee' },
        {
          title: 'Salary Expense',
          field: 'total_salary',
          render: (rowData) => formatCurrency(rowData.total_salary),
        },
      ]}
      {...props}
    />
  );
};

export default CompanyTable;
