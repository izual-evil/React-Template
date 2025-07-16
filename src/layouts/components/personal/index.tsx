import type { MenuProps } from 'antd'
import { useUserStore } from '@/stores'

export default function Personal() {
  const { t } = useTranslation()
  const nav = useNavigate()
  const { avatar } = useUserStore.getState().userInfo;
  function logout() {
    useUserStore.getState().logout().then(() => {
      nav('/login', { replace: true })
    })
  }
  function toPersonPage() {
    nav('/system/personal')
  }
  const items: MenuProps['items'] = [
    { key: '1', label: t('personal.personal'), onClick: toPersonPage },
    { key: '2', label: t('personal.loginOut'), onClick: logout },
  ]
  return (
    <Dropdown menu={{ items }} placement="bottom" arrow={{ pointAtCenter: true }}>
      <Avatar src={<img src={avatar} alt="avatar" />} className="cursor-pointer" />
    </Dropdown>
  )
}
