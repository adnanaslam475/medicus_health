import React from "react";
import Container from "../src/common/components/Container/Container";
import { Button, Row, Col, Tag, Radio } from "antd";
import { PlusCircleFilled } from "@ant-design/icons";

const GUI = () => {
  return (
    <Container>
      <h1>H1 Heading Create your account to start using Medicus</h1>
      <h2>H2 Heading</h2>
      <h3>H3 Heading</h3>
      <h4>H4 Heading</h4>
      <h5>H5 Heading</h5>
      <h6>H6 Heading</h6>
      <h3 className="pt-20">04. BUTTONS</h3>
      <hr />
      <Row className="pt-5">
        <Col span={6}>
          <Button type="primary">Primary Button</Button>
        </Col>
        <Col span={6}>
          <Button
            icon={<PlusCircleFilled />}
            className="default"
            type="primary"
          >
            Primary Button
          </Button>
        </Col>
      </Row>

      <Row className="pt-5">
        <Col span={6}>
          <Button type="default">Primary Button</Button>
        </Col>
        <Col span={6}>
          <Button
            icon={<PlusCircleFilled />}
            className="default"
            type="default"
          >
            Primary Button
          </Button>
        </Col>
      </Row>

      <Row className="pt-5">
        <Col span={6}>
          <Button type="link">Primary Button</Button>
        </Col>
      </Row>

      <Row className="pt-5">
        <Tag color="gold">Pending</Tag>
        <Tag color="cyan">Confirm</Tag>
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
    </Container>
  );
};
export default GUI;
