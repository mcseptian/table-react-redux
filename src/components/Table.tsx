import { useMemo, useEffect, useCallback } from 'react';
import { Table } from 'antd'
import { useAppSelector, useAppDispatch } from '../app/hooks';
import { fetchAsync, sort, paginate, selectTable } from '../features/table/tableSlice';
import { useSearchParams } from 'react-router-dom';

export default function MainTable() {
  const dataTable = useAppSelector(selectTable);
  const dispatch = useAppDispatch();
  const [searchParams] = useSearchParams();

  const fetchDataTable = useCallback(() => {
    const result = searchParams.has('result') ? parseInt(searchParams.get('result')) : 10
    dispatch(fetchAsync({ page: 1, result: result }))
  }, [searchParams, dispatch])

  const sortDataTable = useCallback(() => {
    const sortBy = searchParams.has('sortBy') ? searchParams.get('sortBy') : false
    const sortOrder = searchParams.has('sorOrder') ? searchParams.get('sorOrder') : false
    dispatch(sort({
      order: sortOrder,
      columnKey: sortBy,
    }))
  }, [searchParams, dispatch])

  const gotoPage = useCallback(() => {
    const pageSize = searchParams.has('pageSize') ? searchParams.get('pageSize') : 5
    const page = searchParams.has('page') ? parseInt(searchParams.get('page')) : 1
    dispatch(paginate({ currentPage: page, pageSize: pageSize }))
  }, [searchParams, dispatch])


  useEffect(() => {
    fetchDataTable()
    sortDataTable()
    gotoPage()
  }, [fetchDataTable, sortDataTable, gotoPage])

  const dateConverter = (date: string) => new Date(date).getTime()

  const { data, status, filteredInfo, sortedInfo, pagination } = dataTable;

  const changeHandler = (pagination, sorter, extra) => {
    extra.action === 'sort' && dispatch(sort({
      order: sorter.order,
      columnKey: sorter.columnKey
    }))
    extra.action === 'paginate' && dispatch(paginate({ currentPage: pagination.current, pageSize: pagination.pageSize }))
  }

  const columns = useMemo(
    () => [
      {
        title: 'Username',
        dataIndex: 'username',
        key: 'username',
        filteredValue: filteredInfo?.username || null,
        onFilter: (value, record) => record.username.toString().toLowerCase().includes(value),
        // sorter: (a, b) => a.username.length - b.username.length,
        // sortOrder: sortedInfo.columnKey === 'username' && sortedInfo.order,
        ellipsis: true,
      },
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        // filteredValue: filteredInfo?.name || null,
        // onFilter: (value, record) => record.username.toString().toLowerCase().includes(value),
        sorter: (a, b) => a.name.length - b.name.length,
        sortOrder: sortedInfo.columnKey === 'name' && sortedInfo.order,
        ellipsis: true,
      },
      {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
        // filteredValue: filteredInfo?.email || null,
        // onFilter: (value, record) => record.email.includes(value),
        sorter: (a, b) => a.email.length - b.email.length,
        sortOrder: sortedInfo.columnKey === 'email' && sortedInfo.order,
        ellipsis: true,
      },
      {
        title: 'Gender',
        dataIndex: 'gender',
        key: 'gender',
        filteredValue: filteredInfo?.gender || null,
        onFilter: (value, record) => record.gender.toString().toLowerCase().startsWith(value),
        sorter: (a, b) => a.gender.length - b.gender.length,
        sortOrder: sortedInfo.columnKey === 'gender' && sortedInfo.order,
        ellipsis: true,
      },
      {
        title: 'Registered date',
        dataIndex: 'registeredDate',
        key: 'registeredDate',
        // filteredValue: filteredInfo?.registeredDate || null,
        // onFilter: (value, record) => record.registeredDate.includes(value),
        sorter: (a, b) => dateConverter(a.registeredDate.toString()) - dateConverter(b.registeredDate.toString()),
        sortOrder: sortedInfo.columnKey === 'registeredDate' && sortedInfo.order,
        ellipsis: true,
      },
    ],
    [filteredInfo, sortedInfo])

  const dataSource = useMemo(
    () => data,
    [data])

  return (
    <>
      <Table columns={columns} dataSource={dataSource} pagination={{ pageSize: pagination.pageSize, current: pagination.currentPage }} loading={status !== 'idle'} onChange={(pagination, filters, sorter, extra) => changeHandler(pagination, sorter, extra)} />
    </>
  )
}
