import { Table } from 'antd';
import { Button } from 'antd';
import { Menu } from 'antd';
import { StrictMode, useEffect, useState } from 'react';
import Nav from '../components/Nav';
import { useNavigate } from 'react-router-dom';

export default function Root() {
  const [loading, setLoading] = useState(false);
  const [pdfs, setPdfs] = useState([]);
  const navigate = useNavigate();

  const columns = [
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Author',
      dataIndex: 'author',
      key: 'author',
    },
    {
      title: 'Document kind',
      dataIndex: 'kind',
      key: 'kind',
    },
    {
      title: 'Uploaded at',
      dataIndex: 'uploadedAt',
      key: 'uploadedAt',
      render: (_, { uploadedAt }) => (
        <div>{new Date(uploadedAt).toISOString()}</div>
      ),
    },
    {
      title: 'Processed at',
      dataIndex: 'processedAt',
      key: 'processedAt',
      render: (_, { processedAt }) => (
        <div>{new Date(processedAt).toISOString()}</div>
      ),
    },
    {
      title: 'View/edit PDF',
      dataIndex: 'id',
      key: 'id',
      render: (_, { id }) => (
        <div
          style={{ cursor: 'pointer' }}
          onClick={(e) => {
            navigate(`/pdf?id=${id}`);
          }}
        >
          View/edit PDF
        </div>
      ),
    },
  ];

  useEffect(() => {
    const getProcessed = async () => {
      setLoading(true);
      let d = await fetch('http://localhost:4500/documents?status=pending');
      d = await d.json();
      setPdfs(d?.data);
      setLoading(false);
    };
    getProcessed();
  }, []);

  return (
    <div
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
      <Nav />
      <Table dataSource={pdfs} columns={columns} />;
    </div>
  );
}
