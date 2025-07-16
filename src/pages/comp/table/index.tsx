import { listApi, listItem } from "@/api/modules/comp";
import { TableProps, Button, Space, message } from "antd";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import ATable, { SearchField } from "@/components/ATable";
import PageMain from "@/components/PageMain";

export function Component() {
  const { t } = useTranslation();
  const [selectedRows, setSelectedRows] = useState<listItem[]>([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  // 搜索字段配置
  const searchFields: SearchField[] = [
    {
      key: 'name',
      label: '姓名',
      type: 'input',
      placeholder: '请输入姓名'
    },
    {
      key: 'age',
      label: '年龄',
      type: 'select',
      options: [
        { label: '18-25岁', value: '18-25' },
        { label: '26-35岁', value: '26-35' },
        { label: '36-45岁', value: '36-45' },
        { label: '46岁以上', value: '46+' }
      ]
    }
  ];

  const handleEdit = (record: listItem) => {
    console.log(record, '====record');
    message.info(`编辑: ${record.name}`);
  };

  const handleDelete = (record: listItem) => {
    console.log(record, '====record');
    message.info(`删除: ${record.name}`);
  };

  // 批量操作
  const handleBatchDelete = () => {
    if (selectedRows.length === 0) {
      message.warning('请先选择要删除的数据');
      return;
    }
    message.info(`批量删除 ${selectedRows.length} 条数据`);
  };

  // 处理选择项变化
  const handleSelectionChange = (keys: React.Key[], rows: listItem[]) => {
    setSelectedRowKeys(keys);
    setSelectedRows(rows);
    console.log('选中的行:', keys, rows);
  };

  // 适配 API 请求函数
  const requestAdapter = async (params: any) => {
    const { data } = await listApi(params);
    console.log(data, '----response');

    return {
      list: data.list || [],
      total: data.total, // 模拟总数，实际应该从响应中获取
      current: params.current || 1,
      pageSize: params.pageSize || 10,
    };
  };

  const columns: TableProps<listItem>['columns'] = [
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <a>{text}</a>,
      width: 120,
    },
    {
      title: '年龄',
      dataIndex: 'age',
      key: 'age',
      width: 80,
    },
    {
      title: '住址',
      dataIndex: 'address',
      key: 'address',
      width: 200,
    },
    {
      title: '邮箱',
      dataIndex: 'email',
      key: 'email',
      width: 180,
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button type="link" onClick={() => handleEdit(record)}>
            {t('button.edit')}
          </Button>
          <Button type="link" danger onClick={() => handleDelete(record)}>
            {t('button.delete')}
          </Button>
        </Space>
      ),
      width: 160,
      fixed: 'right',
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
      <Button type="primary">
        新增
      </Button>
    </Space>
  );

  return (
    <PageMain>
      <ATable<listItem>
        columns={columns}
        request={requestAdapter}
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
            disabled: record.name === 'Disabled User',
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
          console.log('数据加载完成:', data);
        }}
        onError={(error) => {
          console.error('数据加载失败:', error);
        }}
      />
    </PageMain>
  );
}
