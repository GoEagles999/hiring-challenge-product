import { Table } from 'antd';
import { Button } from 'antd';
import { Menu } from 'antd';
import { StrictMode, useEffect, useState } from 'react';
import Nav from '../components/Nav';
export default function Root() {
  const [loading, setLoading] = useState(false);
  const [pdfs, setPdfs] = useState([]);

  const columns = [
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Author',
      dataIndex: 'author',
      key: 'author',
    },
    {
      title: 'Document kind',
      dataIndex: 'document_kind',
      key: 'document_kind',
    },
    {
      title: 'Uploaded at',
      dataIndex: 'uploaded_at',
      key: 'uploaded_at',
    },
    {
      title: 'Processed at',
      dataIndex: 'processed_at',
      key: 'processed_at',
    },
  ];

  useEffect(() => {
    const getProcessed = async () => {
      setLoading(true);
      let d = await fetch('http://localhost:4500/documents?status=processed');
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
