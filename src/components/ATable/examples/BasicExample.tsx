import React from 'react';
import ATable from '../index';
import { Button, Space } from 'antd';

// 模拟数据接口
interface UserData {
  id: string;
  name: string;
  age: number;
  email: string;
  status: 'active' | 'inactive';
}

// 模拟 API 请求
const mockApi = async (params: any) => {
  // 模拟网络延迟
  await new Promise(resolve => setTimeout(resolve, 1000));

  const mockData: UserData[] = [
    { id: '1', name: '张三', age: 25, email: 'zhangsan@example.com', status: 'active' },
    { id: '2', name: '李四', age: 30, email: 'lisi@example.com', status: 'inactive' },
    { id: '3', name: '王五', age: 28, email: 'wangwu@example.com', status: 'active' },
  ];

  return {
    list: mockData,
    total: 100,
    current: params.current || 1,
    pageSize: params.pageSize || 10,
  };
};

const BasicExample: React.FC = () => {
  const columns = [
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
      width: 120,
    },
    {
      title: '年龄',
      dataIndex: 'age',
      key: 'age',
      width: 80,
    },
    {
      title: '邮箱',
      dataIndex: 'email',
      key: 'email',
      width: 200,
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      width: 100,
      render: (status: string) => (
        <span style={{ color: status === 'active' ? 'green' : 'red' }}>
          {status === 'active' ? '启用' : '禁用'}
        </span>
      ),
    },
    {
      title: '操作',
      key: 'action',
      width: 150,
      render: (_: any, record: UserData) => (
        <Space>
          <Button type="link" size="small">
            编辑
          </Button>
          <Button type="link" size="small" danger>
            删除
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: '20px' }}>
      <h2>基础表格示例</h2>
      <ATable<UserData>
        columns={columns}
        request={mockApi}
        rowKey="id"
        bordered
        size="middle"
      />
    </div>
  );
};

export default BasicExample; 