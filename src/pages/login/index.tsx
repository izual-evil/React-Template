import { useUserStore } from '@/stores'
import "./index.less";
export function Component() {
  interface FormProps {
    account: string
    password: string
  }
  const { t } = useTranslation()
  const nav = useNavigate()
  const [search] = useSearchParams()
  function onFinish(values: FormProps) {
    useUserStore.getState().login(values).then(() => {
      nav(search.get('redirectPath') ?? '/', {
        replace: true,
      })
    })
  }

  return (
    <div className="min-h-screen">
      <div className='w-full h-screen relative overflow-hidden login-box'>
        <div className='flex z-1 relative w-full h-full'>
          <div className='w-20% h-50% bg-white rounded-10px p-24px absolute left-57% top-20%'>
            <div className='text-center'>
              <div className="my-6 flex items-center justify-center text-3xl">
                {t('login.title')}
              </div>
              <Form autoComplete="off" size="large" layout="vertical" onFinish={onFinish}>
                <Form.Item name="account" label="账户" rules={[{ required: true, message: t('login.accountRequired') }, { min: 3, max: 20, message: t('login.accountLength') }]}>
                  <Input placeholder={`${t('login.account')}:admin/test`} prefix={<SvgIcon name="ant-design:user-outlined" size={16} />} />
                </Form.Item>

                <Form.Item name="password" label="密码" rules={[{ required: true, message: t('login.passwordRquired') }, { min: 6, max: 20, message: t('login.passwordLength') }]}>
                  <Input.Password placeholder={`${t('login.password')}:123456`} prefix={<SvgIcon name="ant-design:lock-outlined" size={16} />} />
                </Form.Item>

                <Form.Item>
                  <Button type="primary" block htmlType="submit">
                    {t('login.loginBtn')}
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
    // <section className="min-h-screen flex items-stretch text-white">
    //   <div className="hidden w-1/2 items-center bg-[url(@/assets/images/login-bg.webp)] bg-cover bg-no-repeat lg:flex">
    //     <div className="z-10 w-full px-24">
    //       <div className="text-left text-5xl font-bold tracking-wide">
    //         欢迎您
    //       </div>
    //       <div className="my-4 text-3xl">
    //         这是一款美观，实用，易用的管理后台
    //       </div>
    //     </div>
    //   </div>

    //   <div className="relative z-0 w-full flex items-center justify-center bg-[#161616] px-0 text-center lg:w-1/2 md:px-16">
    //     <div className="absolute inset-0 z-10 bg-[url(@/assets/images/login-bg.webp)] bg-cover bg-no-repeat lg:hidden">
    //       <div className="absolute inset-0 z-0 bg-black opacity-60" />
    //     </div>

    //     <div className="z-999 w-full">
    //       <div className="my-6 flex items-center justify-center text-3xl">
    //         {t('login.title')}
    //       </div>

    //       <Form autoComplete="off" onFinish={onFinish}>
    //         <Form.Item name="account" rules={[{ required: true, message: t('login.accountRequired') }, { min: 3, max: 20, message: t('login.accountLength') }]}>
    //           <Input placeholder={`${t('login.account')}:admin/test`} prefix={<SvgIcon name="ant-design:user-outlined" size={16} />} />
    //         </Form.Item>

    //         <Form.Item name="password" rules={[{ required: true, message: t('login.passwordRquired') }, { min: 6, max: 20, message: t('login.passwordLength') }]}>
    //           <Input.Password placeholder={`${t('login.password')}:123456`} prefix={<SvgIcon name="ant-design:lock-outlined" size={16} />} />
    //         </Form.Item>

    //         <Form.Item>
    //           <Button type="primary" block htmlType="submit">
    //             {t('login.loginBtn')}
    //           </Button>
    //         </Form.Item>
    //       </Form>
    //     </div>
    //   </div>
    // </section>
  )
}
