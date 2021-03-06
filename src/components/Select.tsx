import { Select } from 'antd';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import { search, selectTable } from '../features/table/tableSlice';
import { useSearchParams } from 'react-router-dom';
import { useCallback, useEffect } from 'react';

export default function SelectGender() {
  const dataTable = useAppSelector(selectTable);
  const { filteredInfo } = dataTable;
  const [searchParams] = useSearchParams();
  const { Option } = Select;
  const dispatch = useAppDispatch();

  const onChangeHandler = (value) => {
    dispatch(search({
      gender: [value],
    }))
  }

  const selectGender = useCallback(() => {
    const keyword = searchParams.has('gender') ? searchParams.get('gender') : ['']
    dispatch(search({ gender: [keyword] }))
  }, [searchParams, dispatch])

  useEffect(() => {
    selectGender()
  }, [selectGender])

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
