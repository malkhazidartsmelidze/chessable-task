import React from 'react';
import { Link } from 'react-router-dom';

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
        { title: 'ID', field: 'id', filtering: false },
        { title: 'Name', field: 'name' },
        {
          title: 'Total Employees',
          field: 'total_employee',
          filtering: false,
          render: (rowData) => (
            <Link to={`${P.EMPLOYEE.list}?department_name=${rowData.name}`}>
              {rowData.total_employee}
            </Link>
          ),
        },
        {
          title: 'Max Salary',
          field: 'max_salary',
          filtering: false,
          render: (rowData) => formatCurrency(rowData.max_salary),
        },
        {
          title: 'Total Salary',
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

export default DepartmentTable;