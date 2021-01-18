import React, { useEffect, useRef, useState } from 'react';
import MaterialTable from 'material-table';

import useApp from 'context/AppProvider';
import { useHistory } from 'react-router';
import formToJSON from 'common/formToJson';

const ResourceTable = (props) => {
  const tableRef = useRef();
  const { Service, resourceName, filterFormRef, ...rest } = props;
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

  useEffect(() => {
    if (!filterFormRef) return;
    filterFormRef.addEventListener('submit', (e) => {
      e.preventDefault();
      refreshTable();
    });
  }, [filterFormRef]);

  const listRequest = (query) => {
    const filters = filterFormRef ? formToJSON(filterFormRef) : {};

    return Service.list({ query, ...filters });
  };

  return (
    <MaterialTable
      tableRef={tableRef}
      isLoading={loading}
      actions={[...createActions(), ...(props.actions || [])]}
      data={props.data ? props.data : listRequest}
      {...rest}
      options={{
        actionsColumnIndex: -1,
        pageSizeOptions: [10, 25, 50, 100],
        pageSize: 10,
        search: false,
        ...props.options,
      }}
    />
  );
};

export default ResourceTable;
