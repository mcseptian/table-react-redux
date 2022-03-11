import { useMemo, useEffect, useCallback } from 'react';
import { Table } from 'antd'
import { useAppSelector, useAppDispatch } from '../app/hooks';
import { fetchAsync, selectTable } from '../features/table/tableSlice';

export default function MainTable() {
  const dataTable = useAppSelector(selectTable);
  const dispatch = useAppDispatch();

  const fetchDataTable = useCallback(() => {
    dispatch(fetchAsync(1))
  }, [dispatch])

  useEffect(() => {
    fetchDataTable()
  }, [fetchDataTable])

  let { data, status, filteredInfo } = dataTable;

  const columns = useMemo(
    () => [
      {
        title: 'Username',
        dataIndex: 'username',
        key: 'username',
        filteredValue: filteredInfo?.username || null,
        onFilter: (value, record) => record.username.toString().toLowerCase().includes(value),
        sorter: (a, b) => a.username.length - b.username.length,
        // sortOrder: sortedInfo.columnKey === 'username' && sortedInfo.order,
        ellipsis: true,
      },
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        // filteredValue: filteredInfo?.name || null,
        // filteredValue: filteredInfo?.name || null,
        // onFilter: (value, record) => record.name.includes(value),
        sorter: (a, b) => a.name.length - b.name.length,
        // sortOrder: sortedInfo.columnKey === 'name' && sortedInfo.order,
        ellipsis: true,
      },
      {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
        // filteredValue: filteredInfo?.email || null,
        // onFilter: (value, record) => record.email.includes(value),
        // sorter: (a, b) => a.email.length - b.email.length,
        // sortOrder: sortedInfo.columnKey === 'email' && sortedInfo.order,
        ellipsis: true,
      },
      {
        title: 'Gender',
        dataIndex: 'gender',
        key: 'gender',
        filteredValue: filteredInfo?.gender || null,
        onFilter: (value, record) => record.gender.toString().toLowerCase().startsWith(value),
        sorter: (a, b) => a.gender - b.gender,
        // sortOrder: sortedInfo.columnKey === 'gender' && sortedInfo.order,
        ellipsis: true,
      },
      {
        title: 'Registered date',
        dataIndex: 'registeredDate',
        key: 'registeredDate',
        // filteredValue: filteredInfo?.registeredDate || null,
        // onFilter: (value, record) => record.registeredDate.includes(value),
        sorter: (a, b) => a.registeredDate.length - b.registeredDate.length,
        // sortOrder: sortedInfo.columnKey === 'registeredDate' && sortedInfo.order,
        ellipsis: true,
      },
    ],
    [filteredInfo])

  const dataSource = useMemo(
    () => data,
    [data])

  return (
    <>
      <Table columns={columns} dataSource={dataSource} pagination={{ pageSize: 5 }} loading={status !== 'idle'} />
    </>
  )
}
