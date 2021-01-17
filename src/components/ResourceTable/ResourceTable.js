import React, { useRef, useState } from 'react';
import MaterialTable from 'material-table';

import useApp from 'context/AppProvider';
import { useHistory } from 'react-router';

const ResourceTable = (props) => {
  const tableRef = useRef();
  const { Service, resourceName, ...rest } = props;
  const history = useHistory();
  const { catchApiSuccess } = useApp();
  const [loading, setLoading] = useState(false);

  /**
   * Refresh Table
   * @return {void}
   */
  const refreshTable = () => {
    tableRef.current && tableRef.current.onQueryChange();
  };

  /**
   * Navigate to create url
   * @return {void}
   */
  const onCreate = () => {
    if (!props.enableCreate || typeof props.urls !== 'object' || !props.urls.create) return;
    const url = typeof props.urls.create === 'function' ? props.urls.create() : props.urls.create;
    history.push(url);
  };

  /**
   * Navigate to edit url
   * @param {Event} _ Button Click event
   * @param {Object} row Row data
   */
  const onEdit = (_, row) => {
    if (!props.enableEdit || typeof props.urls !== 'object' || !props.urls.edit) return;
    const url = typeof props.urls.edit === 'function' ? props.urls.edit(row.id) : props.urls.edit;
    history.push(url);
  };

  /**
   * Delete Given Resource
   * @param {Event} _ Button Click event
   * @param {Object} row Row data
   */
  const onDelete = (_, row) => {
    if (!props.enableDelete || typeof Service.delete !== 'function') return;
    setLoading(true);
    Service.delete(row.id)
      .then((res) => {
        setLoading(false);
        refreshTable();
        return catchApiSuccess(res);
      })
      .catch(() => setLoading(false));
  };

  /**
   * Generate Table Actions
   * @return {Array}
   */
  const createActions = () => {
    const actions = [];

    props.enableCreate &&
      actions.push({
        icon: 'add',
        tooltip: 'Create New',
        isFreeAction: true,
        onClick: onCreate,
      });

    props.enableRefresh &&
      actions.push({
        icon: 'refresh',
        tooltip: 'Refresh Table',
        isFreeAction: true,
        onClick: refreshTable,
      });

    props.enableEdit &&
      actions.push(() => ({
        icon: 'edit',
        tooltip: `Edit ${resourceName}`,
        onClick: onEdit,
      }));

    props.enableDelete &&
      actions.push(() => ({
        icon: 'delete',
        tooltip: `Delete ${resourceName}`,
        onClick: onDelete,
      }));

    return actions;
  };

  return (
    <MaterialTable
      tableRef={tableRef}
      isLoading={loading}
      actions={[...createActions(), ...(props.actions || [])]}
      data={
        props.data
          ? props.data
          : (query) => {
              console.log(query);
              return Service.list(query);
            }
      }
      options={{
        actionsColumnIndex: -1,
        pageSizeOptions: [2, 3, 5, 10],

        ...props.Options,
      }}
      {...rest}
    />
  );
};

export default ResourceTable;
