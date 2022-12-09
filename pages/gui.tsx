import React from "react";
import Container from "../src/common/components/Container/Container";
import {
  Button,
  Row,
  Col,
  Tag,
  Radio,
  Checkbox,
  Form,
  Input,
  Alert,
  Select,
  DatePicker,
} from "antd";
import { PlusCircleFilled } from "@ant-design/icons";
import { isChrome } from "utils/helper";

const { Option } = Select;

const GUI = () => {
  return (
    <Container>
      <h3 className="pt-20">02. TYPOGRAPHY</h3>
      <hr />
      <h1>H1 Heading Create your account to start using Medicus</h1>
      <h2>H2 Heading</h2>
      <h3>H3 Heading</h3>
      <h4>H4 Heading</h4>
      <h5>H5 Heading</h5>
      <h6>H6 Heading</h6>

      <p>This is a Long text paragraph you should test for body text with known zerium,</p>

      <h3 className="pt-20">04. BUTTONS</h3>
      <hr />
      <Row className="pt-5">
        <Col span={6}>
          <Button type="primary" className={`${isChrome && 'antCustomBtn'}`}>Primary Button</Button>
        </Col>
        <Col span={6}>
          <Button
            icon={<PlusCircleFilled />}
            className={`default ${isChrome && 'antCustomBtn'}`}
            type="primary"
          >
            Primary Button
          </Button>
        </Col>
      </Row>
      <Row className="pt-5">
        <Col span={6}>
          <Button type="default">Primary Button outline</Button>
        </Col>
        <Col span={6}>
          <Button
            icon={<PlusCircleFilled />}
            className={`default ${isChrome && 'antCustomBtn'}`}
            type="default"
          >
            Primary Button outline icon
          </Button>
        </Col>
      </Row>

      <Row className="pt-5">
        <Col span={6}>
          <Button type="link" className={`${isChrome && 'antCustomBtn'}`}>Primary Button</Button>
        </Col>
      </Row>

      <Row className="pt-5">
        <Tag color="gold">Pending</Tag>
        <Tag color="cyan">Confirm</Tag>
      </Row>

      <h3 className="pt-20">07. DROPDOWNS</h3>
      <hr />
      <Row className="pt-5 pb-20">
        <Col span={6}>
          <Select style={{ width: 200 }} placeholder="Dropdown">
            <Option value="1">Text 1</Option>
            <Option value="2">Text 2</Option>
            <Option value="3">Text 3</Option>
          </Select>
        </Col>
        <Col span={6}>
          <DatePicker />
        </Col>
      </Row>

      <h3 className="pt-20">05. FORMS</h3>
      <hr />
      <Row className="pt-5">
        <Col span={6}>
          <Radio>Radio</Radio>
        </Col>
        <Col span={6}>
          <Radio.Group value={1}>
            <Radio value={1}>Active Radio </Radio>
          </Radio.Group>
        </Col>
      </Row>
      <Row className="pt-5">
        <Col span={6}>
          <Checkbox>Checkbox</Checkbox>
        </Col>
        <Col span={6}>
          <Checkbox checked>Checkbox</Checkbox>
        </Col>
      </Row>
      <Row className="pt-5">
        <Col span={6}>
          <Form.Item name="name">
            <Input placeholder="Placeholder" />
          </Form.Item>
        </Col>
      </Row>
      <h3 className="pt-20">06. ALERT BOXS</h3>
      <hr />
      <Col className="pt-10" span={12}>
        <Alert
          message="Well done! You successfully read the important alert message"
          type="success"
        />
      </Col>
      <Col className="pt-5" span={12}>
        <Alert
          message="Heads up! This alert needs your attention, but it's not super imporant"
          type="info"
        />
      </Col>
      <Col className="pt-5" span={12}>
        <Alert
          message="Warning! Better check yourself, you're not looking too good"
          type="warning"
        />
      </Col>
      <Col className="pt-5" span={12}>
        <Alert
          message="Oh snap! Change a few things up and try submitting again"
          type="error"
        />
      </Col>
    </Container>
  );
};
export default GUI;
