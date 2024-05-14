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
import { v4 as uuidv4 } from 'uuid';

import { StrictMode, useEffect, useState } from 'react';
import Nav from '../components/Nav';
export default function Root() {
  const [loading, setLoading] = useState(false);
  const [pdfs, setPdfs] = useState(false);
  const normFile = (e: any) => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    setPdfs(e.fileList);
    return e?.fileList;
  };

  const onFinish = async (values: any) => {
    setLoading(true);
    const formData = new FormData();
    values.dragger.forEach((file) => {
      formData.append('pdf', file.originFileObj);
    });

    Object.keys(values).forEach((key) => {
      formData.append(key, values[key]);
    });
    console.log(formData);

    const response = await fetch('http://localhost:4500/documents', {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.

      body: formData, // body data type must match "Content-Type" header
    });
    setLoading(false);
  };

  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 14 },
  };
  return (
    <div
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
      <Nav />
      <div style={{ width: '512px' }}>
        {loading && 'Uploading...'}
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
          <Form.Item label="Select PDF">
            <Form.Item label="Author" name="author">
              <Input name="author" placeholder="Author" />
            </Form.Item>

            <Form.Item
              name="kind"
              label="Kind"
              hasFeedback
              rules={[
                { required: true, message: 'Please select your country!' },
              ]}
            >
              <Select
                placeholder="Type"
                style={{ width: '100%' }}
                onChange={(e) => {
                  console.log(e);
                }}
              >
                <Select.Option value="iso">ISO norm</Select.Option>
                <Select.Option value="regulation">Regulation</Select.Option>
                <Select.Option value="internal">
                  Internal documentation
                </Select.Option>
              </Select>
            </Form.Item>
            <Form.Item
              name="dragger"
              valuePropName="fileList"
              getValueFromEvent={normFile}
              noStyle
            >
              <Upload.Dragger
                beforeUpload={(e) => false}
                accept=".pdf"
                multiple
                name="files"
              >
                <p className="ant-upload-text">
                  Click or drag file to this area to upload
                </p>
                <p className="ant-upload-hint">
                  Support for a single or bulk upload.
                </p>
              </Upload.Dragger>
            </Form.Item>
          </Form.Item>
          <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
            <Space>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
              <Button htmlType="reset">reset</Button>
            </Space>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
