import { Button, Form } from 'antd';

export const FormRoute = () => {
  return (
    <>
      <Form labelCol={{ span: 2 }} wrapperCol={{ xs: { span: 16 }, lg: { span: 8 } }}>
        {/* <Form.Item
          label="From"
          rules={[{ required: true, message: 'Please input your point of departure!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="To"
          rules={[{ required: true, message: 'Please input your destination!' }]}
        >
          <Input />
        </Form.Item> */}
        <Form.Item wrapperCol={{ offset: 2 }}>
          <Button type="primary" htmlType="submit">
            Order a taxi
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};
