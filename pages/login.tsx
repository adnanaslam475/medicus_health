import { Form, Input, Button } from "antd";
import Container from "../src/common/components/Container/Container";
import { useQuery, createClient } from "urql";

const Login = () => {
  const onFinish = async (values: object) => {
    console.log("Success:", values);
    reexecuteQuery();
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  const loginQuery = `
  query($data:LoginStudentInput!) {
    login(data:$data) {
      token
    }
  }
`;

  const [result, reexecuteQuery] = useQuery({
    query: loginQuery,
    variables: {
      data: {
        email: "yasir9001@yahoo.com",
        password: "123admin",
      },
    },
  });
  console.log(result);
  return (
    <Container>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 8 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        style={{ marginTop: "250px" }}
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Container>
  );
};
export default Login;
