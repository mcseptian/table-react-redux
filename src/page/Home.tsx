import { Menu } from "antd"
import { Link } from "react-router-dom"
import { Row, Col } from 'antd';

export function Home() {
  return (
    <Row align="center" justify="center">
      <Col flex="auto" span={24}>
        <Menu>
          <Menu.Item key="example-link">
            <Link to="/example">
              Example
            </Link>
          </Menu.Item>
        </Menu >
      </Col>
    </Row>
  )
}
