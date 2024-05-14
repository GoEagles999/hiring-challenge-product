import { Table } from 'antd';
import { Button } from 'antd';
import { Menu } from 'antd';
import { StrictMode, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Root() {
  const navigate = useNavigate();

  const onClick = (e) => {
    setCurrent(e.key);
    navigate(`/${e.key}`);
  };
  const [current, setCurrent] = useState('mail');
  const items: MenuItem[] = [
    {
      label: 'Processed',
      key: '',
    },
    {
      label: 'Pending',
      key: 'pending',
    },
    {
      label: 'Upload',
      key: 'upload-new',
    },
  ];
  return (
    <Menu
      onClick={onClick}
      selectedKeys={[current]}
      mode="horizontal"
      items={items}
    />
  );
}
