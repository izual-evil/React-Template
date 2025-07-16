import { Table, PaginationProps, Space, Button, Input, Select, Form, Row, Col } from 'antd';
import type { ColumnsType, TableProps } from 'antd/es/table';
import { SearchOutlined, ReloadOutlined } from '@ant-design/icons';
import './index.less';
import { useEffect, useState, useRef, useCallback } from 'react';

const { Search } = Input;

// 搜索字段配置
export interface SearchField {
  key: string;
  label: string;
  type: 'input' | 'select';
  options?: { label: string; value: any }[];
  placeholder?: string;
}

// 表格参数
export interface TableParams {
  current: number;
  pageSize: number;
  [key: string]: any;
}

// 表格响应数据
export interface TableResponse<T> {
  list: T[];
  total: number;
  current: number;
  pageSize: number;
}

// 选择项配置
export interface SelectionConfig<T = any> {
  type?: 'checkbox' | 'radio';
  selectedRowKeys?: React.Key[];
  onChange?: (selectedRowKeys: React.Key[], selectedRows: T[]) => void;
  getCheckboxProps?: (record: T) => any;
  disabled?: boolean;
}

interface ATableProps<T = any> {
  // 基础配置
  columns: ColumnsType<T>;
  request: (params: TableParams) => Promise<TableResponse<T>>;
  rowKey?: string | ((record: T) => string);

  // 参数配置
  defaultParams?: Partial<TableParams>;
  params?: Partial<TableParams>;
  onParamsChange?: (params: TableParams) => void;

  // 搜索配置
  searchFields?: SearchField[];
  showSearch?: boolean;
  searchLayout?: 'horizontal' | 'vertical';

  // 分页配置
  showPagination?: boolean;
  pagination?: Partial<PaginationProps>;

  // 选择项配置
  selection?: SelectionConfig<T>;

  // 工具栏配置
  showToolbar?: boolean;
  toolbarActions?: React.ReactNode;

  // 表格配置
  bordered?: boolean;
  size?: 'small' | 'middle' | 'large';
  loading?: boolean;
  scroll?: { x?: number | string; y?: number | string };

  // 回调函数
  onLoad?: (data: T[]) => void;
  onError?: (error: any) => void;
}

export default function ATable<T = any>(props: ATableProps<T>) {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [searchParams, setSearchParams] = useState<Record<string, any>>({});
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [selectedRows, setSelectedRows] = useState<T[]>([]);
  const [form] = Form.useForm();
  const tableRef = useRef<HTMLDivElement>(null);
  const [tableWidth, setTableWidth] = useState<number>(0);

  // 获取表格数据
  const fetchData = useCallback(async (params: TableParams) => {
    setLoading(true);
    try {
      const requestParams = {
        ...searchParams,
        ...props.params,
        ...params,
      };

      const response = await props.request(requestParams);
      const { list, total: totalCount, current: currentPage, pageSize: pageSizeCount } = response;

      setData(list || []);
      setTotal(totalCount || 0);
      setCurrent(currentPage || 1);
      setPageSize(pageSizeCount || 10);

      // 回调
      props.onLoad?.(list || []);
      props.onParamsChange?.(requestParams);
    } catch (error) {
      console.error('获取表格数据失败:', error);
      props.onError?.(error);
    } finally {
      setLoading(false);
    }
  }, [props.request, searchParams, props.params, props.onLoad, props.onParamsChange, props.onError]);

  // 初始化数据
  useEffect(() => {
    const initialParams = {
      current: 1,
      pageSize: 10,
      ...props.defaultParams,
    };
    fetchData(initialParams);
  }, [fetchData]);

  // 监听外部参数变化
  useEffect(() => {
    if (props.params) {
      fetchData({ current, pageSize, ...props.params });
    }
  }, [props.params]);

  // 监听容器大小变化
  useEffect(() => {
    if (!tableRef.current) return;

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setTableWidth(entry.contentRect.width);
      }
    });

    resizeObserver.observe(tableRef.current);
    return () => resizeObserver.disconnect();
  }, []);

  // 处理搜索
  const handleSearch = (values: Record<string, any>) => {
    setSearchParams(values);
    setCurrent(1);
    fetchData({ current: 1, pageSize, ...values });
  };

  // 处理重置
  const handleReset = () => {
    form.resetFields();
    setSearchParams({});
    setCurrent(1);
    fetchData({ current: 1, pageSize });
  };

  // 处理分页变化
  const handlePageChange = (page: number, size?: number) => {
    const newPageSize = size || pageSize;
    setCurrent(page);
    setPageSize(newPageSize);
    fetchData({ current: page, pageSize: newPageSize });
  };

  // 处理选择项变化
  const handleSelectionChange = (keys: React.Key[], rows: T[]) => {
    setSelectedRowKeys(keys);
    setSelectedRows(rows);
    props.selection?.onChange?.(keys, rows);
  };

  // 计算表格滚动配置
  const totalColumnWidth = props.columns.reduce((sum: number, column: any) => {
    if (typeof column.width === 'number') {
      return sum + column.width;
    }
    return sum + 100;
  }, 0);

  const scrollConfig = props.scroll || (totalColumnWidth > tableWidth ? { x: totalColumnWidth } : undefined);

  // 渲染搜索表单
  const renderSearchForm = () => {
    if (!props.showSearch || !props.searchFields?.length) return null;

    return (
      <div className="atable-search">
        <Form
          form={form}
          layout={props.searchLayout || 'horizontal'}
          onFinish={handleSearch}
          initialValues={searchParams}
        >
          <Row gutter={16}>
            {props.searchFields.map((field) => (
              <Col key={field.key} span={6}>
                <Form.Item name={field.key} label={field.label}>
                  {field.type === 'select' ? (
                    <Select
                      placeholder={field.placeholder || `请选择${field.label}`}
                      allowClear
                      options={field.options}
                    />
                  ) : (
                    <Input placeholder={field.placeholder || `请输入${field.label}`} />
                  )}
                </Form.Item>
              </Col>
            ))}
            <Col span={6}>
              <Form.Item>
                <Space>
                  <Button type="primary" htmlType="submit" icon={<SearchOutlined />}>
                    搜索
                  </Button>
                  <Button onClick={handleReset} icon={<ReloadOutlined />}>
                    重置
                  </Button>
                </Space>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </div>
    );
  };

  // 渲染工具栏
  const renderToolbar = () => {
    if (!props.showToolbar && !props.toolbarActions) return null;

    return (
      <div className="atable-toolbar">
        <Space>
          {props.toolbarActions}
          {props.selection && selectedRowKeys.length > 0 && (
            <span>已选择 {selectedRowKeys.length} 项</span>
          )}
        </Space>
      </div>
    );
  };

  // 配置选择项
  const rowSelection = props.selection ? {
    type: props.selection.type || 'checkbox',
    selectedRowKeys: props.selection.selectedRowKeys || selectedRowKeys,
    onChange: handleSelectionChange,
    getCheckboxProps: props.selection.getCheckboxProps,
    disabled: props.selection.disabled,
  } : undefined;

  return (
    <div ref={tableRef} className="atable-container">
      {renderSearchForm()}
      {renderToolbar()}

      <Table<T>
        bordered={props.bordered}
        size={props.size || 'middle'}
        loading={props.loading || loading}
        rowSelection={rowSelection}
        rowKey={props.rowKey || 'id'}
        dataSource={data}
        columns={props.columns}
        scroll={scrollConfig}
        pagination={props.showPagination !== false ? {
          current,
          pageSize,
          total,
          showSizeChanger: true,
          showQuickJumper: true,
          showTotal: (total) => `共 ${total} 条`,
          onChange: handlePageChange,
          onShowSizeChange: handlePageChange,
          ...props.pagination,
        } : false}
      />
    </div>
  );
}