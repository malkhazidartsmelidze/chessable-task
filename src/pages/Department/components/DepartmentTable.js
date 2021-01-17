import React from 'react';

import DepartmentService from 'services/DepartmentService';
import formatCurrency from 'common/formatters/formatCurrency';
import ResourceTable from 'components/ResourceTable';
import P from 'urls';

const DepartmentTable = (props) => {
  return (
    <ResourceTable
      enableCreate
      enableEdit
      enableRefresh
      enableDelete
      urls={P.DEPARTMENT}
      resourceName='Department'
      Service={DepartmentService}
      columns={[
        { title: 'ID', field: 'id' },
        { title: 'Name', field: 'name' },
        { title: 'Company Name', field: 'company_name' },
        { title: 'Total Employees', field: 'total_employee' },
        {
          title: 'Total Salary',
          field: 'total_salary',
          render: (rowData) => formatCurrency(rowData.total_salary),
        },
      ]}
      {...props}
    />
  );
};

export default DepartmentTable;
