import {
  Button,
  Input,
  Checkbox,
  Col,
  ColorPicker,
  Form,
  InputNumber,
  Radio,
  Rate,
  Row,
  Select,
  Slider,
  Space,
  Switch,
  Upload,
} from 'antd';
import { StrictMode, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Nav from '../components/Nav';
export default function Root() {
  const [loading, setLoading] = useState(false);
  const [updated, setUpdated] = useState(false);
  const [name, setName] = useState('');
  const [author, setAuthor] = useState('');
  const [kind, setKind] = useState('');
  let [searchParams, setSearchParams] = useSearchParams();
  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 14 },
  };
  useEffect(() => {});
  const onFinish = async (values: any) => {
    const response = await fetch(
      `http://localhost:4500/documents/${searchParams.get('id')}`,
      {
        method: 'PATCH', // *GET, POST, PUT, DELETE, etc.
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          kind,
          name,
          author,
        }), // body data type must match "Content-Type" header
      }
    );
    setUpdated(true);
  };
  useEffect(() => {
    const getProcessed = async () => {
      setLoading(true);
      let d = await fetch(
        `http://localhost:4500/documents/${searchParams.get('id')}`
      );
      d = await d.json();
      console.log(d);
      setName(d?.data?.name);
      setKind(d?.data?.kind);
      setAuthor(d?.data?.author);
      setLoading(false);
    };
    getProcessed();
  }, []);

  return (
    <div
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
      <Nav />
      <Button
        type="primary"
        onClick={async (e) => {
          let d = await fetch(
            `http://localhost:4500/documents/${searchParams.get('id')}/resource`
          );
          d = await d.blob();
          console.log(d);
          var blob = new Blob([d], { type: 'application/pdf' });
          var blobURL = URL.createObjectURL(blob);
          window.open(blobURL);
        }}
      >
        View PDF
      </Button>
      <Form
        name="validate_other"
        {...formItemLayout}
        onFinish={onFinish}
        initialValues={{
          'input-number': 3,
          'checkbox-group': ['A', 'B'],
          rate: 3.5,
          'color-picker': null,
        }}
        style={{ maxWidth: 600 }}
      >
        <Form.Item label="Name" name="name">
          <Input
            name="name"
            onChange={(e) => setName(e.target.value)}
            placeholder={name}
          />
        </Form.Item>
        <Form.Item label="Author" name="author">
          <Input
            name="author"
            onChange={(e) => {
              setAuthor(e.target.value);
            }}
            placeholder={author}
          />
        </Form.Item>

        <Form.Item
          name="kind"
          label="Kind"
          hasFeedback
          rules={[{ required: true, message: 'Please select your country!' }]}
        >
          <Select
            placeholder="Type"
            value={kind}
            style={{ width: '100%' }}
            onChange={(e) => {
              setKind(e);
            }}
          >
            <Select.Option value="iso">ISO norm</Select.Option>
            <Select.Option value="regulation">Regulation</Select.Option>
            <Select.Option value="internal">
              Internal documentation
            </Select.Option>
          </Select>
        </Form.Item>
        <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
          <Space>
            <Button type="primary" htmlType="submit">
              Update
            </Button>
            <Button htmlType="reset">reset</Button>
          </Space>
        </Form.Item>
      </Form>
      <Button
        type="primary"
        onClick={async (e) => {
          const response = await fetch(
            `http://localhost:4500/documents/${searchParams.get('id')}`,
            {
              method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
            }
          );
          alert('deleted');
        }}
      >
        Delete
      </Button>
      {updated && <div>Updated</div>}
    </div>
  );
}
