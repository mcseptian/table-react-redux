import { Select } from 'antd';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import { search, selectTable } from '../features/table/tableSlice';

export default function SelectGender() {
  const dataTable = useAppSelector(selectTable);
  let { filteredInfo } = dataTable;
  const { Option } = Select;
  const dispatch = useAppDispatch();
  const onChangeHandler = (value) => {
    dispatch(search({
      gender: [value],
    }))
  }

  return (
    <Select
      defaultValue=""
      value={filteredInfo?.gender[0]}
      style={{ width: 200 }}
      onChange={onChangeHandler}
      size="large">
      <Option value="">All</Option>
      <Option value="female">Female</Option>
      <Option value="male">Male</Option>
    </Select>
  )
}
