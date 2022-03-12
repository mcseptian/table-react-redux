import { Typography, Row, Col } from 'antd';
import Nav from '../components/Nav';
import TableAction from '../components/TableAction';
import MainTable from '../components/Table';

export default function Example() {
  return (
    <>
      <Row>
        <Col span={12}>
          <Nav></Nav>
          <Typography.Title style={{ margin: '16px 0px' }}>
            Example With Search and Filter
          </Typography.Title>
          <TableAction></TableAction>
        </Col>
      </Row>
      <MainTable />
    </>
  );
}
