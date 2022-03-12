import { Space, Input } from 'antd';
import debounce from 'lodash/debounce';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import { search, selectTable } from '../features/table/tableSlice';
import { useSearchParams } from 'react-router-dom';
import { useCallback, useEffect } from 'react';

export default function SearchUsername() {
  const dataTable = useAppSelector(selectTable);
  const { filteredInfo } = dataTable;
  const [searchParams] = useSearchParams();
  const { Search } = Input;
  const dispatch = useAppDispatch();
  const changeHandler = (e) => {
    const change = dispatch(search({
      username: [e.target.value]
    }))

    debounce(
      () => change, 1500
    )
  }

  const searchHandler = debounce((value) => dispatch(search({
    username: [value],
  })), 500);

  const searchUsername = useCallback(() => {
    const keyword = searchParams.has('keyword') ? searchParams.get('keyword') : ['']
    dispatch(search({ username: [keyword] }))
  }, [searchParams, dispatch])

  useEffect(() => {
    searchUsername()
  }, [searchUsername])

  return (
    <Space direction="horizontal">
      <Search
        value={filteredInfo?.username[0]}
        placeholder="Search..."
        allowClear
        size="large"
        enterButton
        onChange={changeHandler}
        onSearch={searchHandler}
        style={{ width: '300px' }}
      />
    </Space>
  )
}
