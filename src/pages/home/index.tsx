import ReactECharts from 'echarts-for-react';
import { frameworkList, PersonStatictics, getTodoList, myProjectList, ProjectList, supportList } from "./static";
import { useUserStore } from '@/stores'
import dayjs from 'dayjs'
import { TodoItem } from '@/api/modules/home';

export function Component() {
  const { avatar, userName } = useUserStore.getState().userInfo;
  const listItems = frameworkList.map((item, key) =>
    <div key={item.value}
      className={`flex-1 text-center pt-24px pb-24px text-white ${key == frameworkList.length - 1 ? '' : 'mr-3'}`}
      style={{ backgroundColor: item.bg }}>
      <div className='text-6 font-bold'>{item.label}</div>
      <div className='mt-3 text-4'>{item.num}</div>
    </div>
  );
  const getPersonOption = () => ({
    ...PersonStatictics,
  });
  const now = dayjs();
  const { t } = useTranslation()
  const formattedDate = now.format(`YYYY-MM-DD`);
  const weekList = [t('route.home.week.sunday'),
  t('route.home.week.monday'),
  t('route.home.week.tuesday'),
  t('route.home.week.wednesday'),
  t('route.home.week.thursday'),
  t('route.home.week.friday'),
  t('route.home.week.saturday')];
  console.log(formattedDate);

  const [data, setData] = useState<TodoItem[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const getList = async () => {
      try {
        const res = await getTodoList();
        setData(res);
        setLoading(false);
      } finally { }
    }
    getList();
  }, [])
  // 跳转站外
  const toPage = (item: ProjectList) => {
    window.open(item.url, '_blank');
  }
  return (
    <div>
      <Card className='border-rd-0'>
        <div className='flex'>
          <div>
            <Avatar src={<img src={avatar} alt="avatar" />} className="w-16 h-16" />
          </div>
          <div className='ml-6'>
            <div className='font-bold text-5'>{userName}, {t('route.home.text.come')}</div>
            <div className='text-4 mt-2'>{t('route.home.text.today')} {formattedDate} {weekList[now.day()]}, {t('route.home.text.work')}</div>
          </div>
        </div>
      </Card>
      <PageMain>
        <div className='flex mt-3'>
          <Card className='flex-1 mr-3' bodyStyle={{ padding: "12px 24px" }}>
            <div className='text-4 font-bold'>{t('route.home.text.support')}：</div>
            <div className='flex mt-2 mb-2 items-center justify-between flex-wrap'>
              {
                supportList.map((item, key) => {
                  return (
                    <div key={key} className={`cursor-pointer text-center p-12 bg-gray-100 rounded-md 
                      w-[calc(50%-12px)] mb-12px`}>
                      <div className='text-6 font-bold text-[#409eff] hover:text-[#409eff]'>{t(item.name)}</div>
                      <div className='text-4 color-gray-500'>{t(item.desc)}</div>
                    </div>
                  )
                })
              }
            </div>
          </Card>
          <Card className='flex-1' bodyStyle={{ padding: "12px 24px", height: "100%" }}>
            <div className='h-full flex flex-col'>
              <div className='text-4 font-bold'>{t('route.home.text.myProject')}：</div>
              <div className='mt-2 flex-1 flex flex-col justify-between'>
                {
                  myProjectList.map((item, key) => {
                    return (
                      <div key={key} className={`cursor-pointer text-center h-1/2 justify-center flex flex-col bg-gray-100 hover:bg-gray-300 rounded-md ${key == 0 ? 'mb-12px' : ''}`}
                        onClick={() => toPage(item)}>
                        <div className='text-6 font-bold text-[#409eff] hover:text-[#409eff]'>{item.name}</div>
                        <div className='text-4 color-gray-500'>{t(item.desc)}</div>
                      </div>
                    )
                  })
                }
              </div>
            </div>
          </Card>
        </div>
        <div className='flex justify-between items-center mb-4 mt-4'>
          {listItems}
        </div>
        <div className='flex'>
          <Card className='mr-3 flex-1'>
            <ReactECharts option={getPersonOption()} />;
          </Card>
          <Card title={t('route.home.text.todo')} className='flex-1'>
            <List
              loading={loading}
              itemLayout="horizontal"
              dataSource={data}
              className='overflow-y-auto h-370px'
              renderItem={(item) => (
                <List.Item className='flex items-start!'>
                  <div className='mr-3 mt-4px'>
                    <SvgIcon name={item.status ? 'todone' : 'toding'} size={20} className={item.status ? 'text-green-500' : 'text-red-500'} />
                  </div>
                  <List.Item.Meta
                    title={item.title}
                    description={item.descriptions}
                  />
                </List.Item>
              )}
            />
          </Card>
        </div>
      </PageMain>
    </div>
  )
}
