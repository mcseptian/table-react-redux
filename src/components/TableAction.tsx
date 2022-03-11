import { Form, Button } from 'antd';
import SelectGender from './Select'
import SearchName from './Search'
import { useAppDispatch } from '../app/hooks';
import { reset } from '../features/table/tableSlice';

export default function TableAction() {
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();
  const onReset = () => {
    dispatch(reset())
  }

  return (
    <Form
      form={form}
      layout="vertical"
      style={{ display: 'flex', flexDirection: 'row', gap: '16px' }}
    >
      <Form.Item
        label="Search">
        <SearchName />
      </Form.Item>

      <Form.Item
        label="Gender">
        <SelectGender />
      </Form.Item>
      <Form.Item
        style={{ marginTop: 'auto' }}>
        <Button size="large" onClick={onReset}>Reset Filter</Button>
      </Form.Item>
    </Form>
  );
};
