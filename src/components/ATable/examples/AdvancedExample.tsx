import React, { useState } from 'react';
import ATable, { SearchField } from '../index';
import { Button, Space, message } from 'antd';

// 模拟数据接口
interface ProductData {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  status: 'in_stock' | 'out_of_stock' | 'discontinued';
}

// 模拟 API 请求
const mockApi = async (params: any) => {
  await new Promise(resolve => setTimeout(resolve, 800));

  const mockData: ProductData[] = [
    { id: '1', name: 'iPhone 15', category: '手机', price: 5999, stock: 50, status: 'in_stock' },
    { id: '2', name: 'MacBook Pro', category: '电脑', price: 12999, stock: 20, status: 'in_stock' },
    { id: '3', name: 'iPad Air', category: '平板', price: 3999, stock: 0, status: 'out_of_stock' },
    { id: '4', name: 'iPod Classic', category: '音乐播放器', price: 1999, stock: 0, status: 'discontinued' },
  ];

  // 模拟搜索过滤
  let filteredData = mockData;
  if (params.name) {
    filteredData = filteredData.filter(item =>
      item.name.toLowerCase().includes(params.name.toLowerCase())
    );
  }
  if (params.category) {
    filteredData = filteredData.filter(item => item.category === params.category);
  }
  if (params.status) {
    filteredData = filteredData.filter(item => item.status === params.status);
  }

  return {
    list: filteredData,
    total: filteredData.length,
    current: params.current || 1,
    pageSize: params.pageSize || 10,
  };
};

const AdvancedExample: React.FC = () => {
  const [selectedRows, setSelectedRows] = useState<ProductData[]>([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  // 搜索字段配置
  const searchFields: SearchField[] = [
    {
      key: 'name',
      label: '产品名称',
      type: 'input',
      placeholder: '请输入产品名称'
    },
    {
      key: 'category',
      label: '产品分类',
      type: 'select',
      options: [
        { label: '手机', value: '手机' },
        { label: '电脑', value: '电脑' },
        { label: '平板', value: '平板' },
        { label: '音乐播放器', value: '音乐播放器' }
      ]
    },
    {
      key: 'status',
      label: '库存状态',
      type: 'select',
      options: [
        { label: '有库存', value: 'in_stock' },
        { label: '缺货', value: 'out_of_stock' },
        { label: '已停产', value: 'discontinued' }
      ]
    }
  ];

  // 处理选择项变化
  const handleSelectionChange = (keys: React.Key[], rows: ProductData[]) => {
    setSelectedRowKeys(keys);
    setSelectedRows(rows);
    console.log('选中的产品:', keys, rows);
  };

  // 批量操作
  const handleBatchDelete = () => {
    if (selectedRows.length === 0) {
      message.warning('请先选择要删除的产品');
      return;
    }
    message.success(`已删除 ${selectedRows.length} 个产品`);
    setSelectedRows([]);
    setSelectedRowKeys([]);
  };

  const handleBatchExport = () => {
    if (selectedRows.length === 0) {
      message.warning('请先选择要导出的产品');
      return;
    }
    message.success(`已导出 ${selectedRows.length} 个产品`);
  };

  const columns = [
    {
      title: '产品名称',
      dataIndex: 'name',
      key: 'name',
      width: 150,
    },
    {
      title: '分类',
      dataIndex: 'category',
      key: 'category',
      width: 100,
    },
    {
      title: '价格',
      dataIndex: 'price',
      key: 'price',
      width: 100,
      render: (price: number) => `¥${price.toLocaleString()}`,
    },
    {
      title: '库存',
      dataIndex: 'stock',
      key: 'stock',
      width: 80,
      render: (stock: number) => (
        <span style={{ color: stock > 0 ? 'green' : 'red' }}>
          {stock}
        </span>
      ),
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      width: 100,
      render: (status: string) => {
        const statusMap = {
          in_stock: { text: '有库存', color: 'green' },
          out_of_stock: { text: '缺货', color: 'orange' },
          discontinued: { text: '已停产', color: 'red' }
        };
        const config = statusMap[status as keyof typeof statusMap];
        return <span style={{ color: config.color }}>{config.text}</span>;
      },
    },
    {
      title: '操作',
      key: 'action',
      width: 200,
      fixed: 'right' as const,
      render: (_: any, record: ProductData) => (
        <Space>
          <Button type="link" size="small">
            编辑
          </Button>
          <Button type="link" size="small">
            查看详情
          </Button>
          <Button type="link" size="small" danger>
            删除
          </Button>
        </Space>
      ),
    },
  ];

  // 工具栏操作按钮
  const toolbarActions = (
    <Space>
      <Button
        type="primary"
        danger
        disabled={selectedRows.length === 0}
        onClick={handleBatchDelete}
      >
        批量删除 ({selectedRows.length})
      </Button>
      <Button
        type="primary"
        disabled={selectedRows.length === 0}
        onClick={handleBatchExport}
      >
        批量导出 ({selectedRows.length})
      </Button>
      <Button type="primary">
        新增产品
      </Button>
    </Space>
  );

  return (
    <div style={{ padding: '20px' }}>
      <h2>高级表格示例</h2>
      <p>包含搜索、选择项、工具栏等功能</p>

      <ATable<ProductData>
        columns={columns}
        request={mockApi}
        rowKey="id"
        // 搜索配置
        showSearch={true}
        searchFields={searchFields}
        // 分页配置
        showPagination={true}
        // 选择项配置
        selection={{
          type: 'checkbox',
          selectedRowKeys,
          onChange: handleSelectionChange,
          getCheckboxProps: (record) => ({
            disabled: record.status === 'discontinued',
          }),
        }}
        // 工具栏配置
        showToolbar={true}
        toolbarActions={toolbarActions}
        // 表格配置
        bordered={true}
        size="middle"
        // 回调函数
        onLoad={(data) => {
          console.log('数据加载完成，共', data.length, '条记录');
        }}
        onError={(error) => {
          console.error('数据加载失败:', error);
          message.error('数据加载失败');
        }}
      />
    </div>
  );
};

export default AdvancedExample; 