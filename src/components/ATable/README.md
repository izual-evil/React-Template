## 完成的功能

### 1. 基础表格功能

- ✅ 基于 Antd Table 的封装
- ✅ 支持泛型类型定义
- ✅ 自动处理数据请求和响应
- ✅ 支持自定义行键配置

### 2. 动态传参功能

- ✅ `defaultParams`: 设置默认参数
- ✅ `params`: 外部传入参数，支持动态更新
- ✅ `onParamsChange`: 参数变化回调
- ✅ 支持搜索参数、分页参数等

### 3. 搜索功能

- ✅ 支持输入框和下拉选择
- ✅ 可配置搜索字段
- ✅ 支持搜索表单布局
- ✅ 自动重置分页到第一页

### 4. 选择项功能

- ✅ 支持单选和多选
- ✅ 外部控制选中状态
- ✅ 自定义复选框属性
- ✅ 父组件可以获取选中的数据
- ✅ 支持禁用特定行的选择

### 5. 工具栏功能

- ✅ 自定义操作按钮
- ✅ 显示选中项数量
- ✅ 支持批量操作
- ✅ 响应式布局

### 6. 分页功能

- ✅ 自动处理分页逻辑
- ✅ 支持自定义分页配置
- ✅ 显示总数和当前页信息
- ✅ 支持快速跳转和页面大小切换

### 7. 响应式设计

- ✅ 自动计算表格滚动
- ✅ 支持容器大小变化监听
- ✅ 自适应列宽
- ✅ 支持横向和纵向滚动

### 8. 其他功能

- ✅ 加载状态管理
- ✅ 错误处理
- ✅ 数据加载回调
- ✅ 支持表格大小配置
- ✅ 支持边框显示

## 文件结构

```
src/components/ATable/
├── index.tsx          # 主组件文件
├── index.less         # 样式文件
├── README.md          # 使用文档
└── examples/          # 使用示例
    ├── BasicExample.tsx      # 基础示例
    └── AdvancedExample.tsx   # 高级示例
```

## 核心接口定义

### ATableProps<T>

```typescript
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
  searchLayout?: "horizontal" | "vertical";

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
  size?: "small" | "middle" | "large";
  loading?: boolean;
  scroll?: { x?: number | string; y?: number | string };

  // 回调函数
  onLoad?: (data: T[]) => void;
  onError?: (error: any) => void;
}
```

## 使用示例

### 基础用法

```tsx
<ATable<DataType> columns={columns} request={apiFunction} rowKey="id" />
```

### 完整功能

```tsx
<ATable<DataType>
  columns={columns}
  request={apiFunction}
  rowKey="id"
  showSearch={true}
  searchFields={searchFields}
  selection={{
    type: "checkbox",
    selectedRowKeys,
    onChange: handleSelectionChange,
  }}
  showToolbar={true}
  toolbarActions={toolbarActions}
  bordered={true}
  size="middle"
/>
```

## 父子组件传值

### 父组件获取选中数据

```tsx
const [selectedRows, setSelectedRows] = useState<DataType[]>([]);
const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

const handleSelectionChange = (keys: React.Key[], rows: DataType[]) => {
  setSelectedRowKeys(keys);
  setSelectedRows(rows);
  // 可以进行批量操作
  console.log("选中的数据:", rows);
};

<ATable
  selection={{
    selectedRowKeys,
    onChange: handleSelectionChange,
  }}
/>;
```

### 动态参数传递

```tsx
const [tableParams, setTableParams] = useState({ status: "active" });

<ATable
  params={tableParams}
  onParamsChange={(params) => {
    console.log("参数变化:", params);
  }}
/>;
```

## 优势特点

1. **类型安全**: 完整的 TypeScript 支持
2. **功能完整**: 涵盖表格常用功能
3. **易于使用**: 简单的 API 设计
4. **高度可定制**: 支持各种配置选项
5. **响应式**: 自适应不同屏幕尺寸
6. **性能优化**: 合理的状态管理和缓存策略

## 注意事项

1. `request` 函数必须返回符合 `TableResponse<T>` 格式的数据
2. 使用选择项功能时，需要在父组件中管理选中状态
3. 搜索字段的 `key` 必须与后端 API 参数名一致
4. 表格列配置建议包含 `width` 属性以支持横向滚动

## 后续扩展建议

1. 支持更多搜索字段类型（日期、数字范围等）
2. 添加表格列显示/隐藏配置
3. 支持表格数据导出功能
4. 添加表格行拖拽排序功能
5. 支持表格列固定配置
6. 添加表格数据缓存机制
