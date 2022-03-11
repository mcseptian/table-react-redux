import { Space, Input } from 'antd';
import debounce from 'lodash/debounce';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import { search, selectTable } from '../features/table/tableSlice';

export default function SearchName() {
  const dataTable = useAppSelector(selectTable);
  let { filteredInfo } = dataTable;
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
