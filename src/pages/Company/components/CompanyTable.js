import React, { Fragment } from 'react';

import CompanyService from 'services/CompanyService';
import formatCurrency from 'common/formatters/formatCurrency';
import ResourceTable from 'components/ResourceTable';
import P from 'urls';
import { Link } from 'react-router-dom';

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
        { title: 'ID', field: 'id', filtering: false },
        { title: 'Name', field: 'name' },
        { title: 'Address', field: 'address' },
        { title: 'Code', field: 'code' },
        { title: 'Departaments', field: 'dep_count', filtering: false },
        {
          title: 'Total Employees',
          field: 'total_employee',
          filtering: false,
          render: (rowData) => (
            <Link to={`${P.EMPLOYEE.list}?company_name=${rowData.name}`}>
              {rowData.total_employee}
            </Link>
          ),
        },
        {
          title: 'Salary Expense',
          field: 'total_salary',
          filtering: false,
          render: (rowData) => formatCurrency(rowData.total_salary),
        },
      ]}
      options={{
        filtering: true,
      }}
      {...props}
    />
  );
};

export default CompanyTable;
