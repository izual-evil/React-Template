import { RouterProvider } from 'react-router-dom'
import zhCN from 'antd/locale/zh_CN'
import enUS from 'antd/locale/en_US'
import zhTW from 'antd/locale/zh_TW'
import { shallow } from 'zustand/shallow'
import { Fragment } from 'react'
import { App as AntdApp, theme } from 'antd'
import { useShallow } from 'zustand/react/shallow'
import { ThemeProvider } from 'styled-components'
import { useSysConfigStore } from './stores/config'
import router from './router'
import AntdGlobal from './utils/AntdGlobal'

function App() {
  const { i18n } = useTranslation()

  const [locale, setLocale] = useState(zhCN)
  const [loading, setLoading] = useState(true)

  const { colorScheme, elementSize } = useSysConfigStore(useShallow(state => ({
    colorScheme: state.colorScheme,
    elementSize: state.elementSize,
  })))

  const isDark = colorScheme === 'dark'

  useEffect(() => {
    const cancelSub = useSysConfigStore.subscribe(
      state => state.defaultLanguage,
      (language) => {
        setLocale(language === 'zhCn' ? zhCN : language === 'zhTw' ? zhTW : enUS)
        i18n.changeLanguage(language)
        setLoading(false)
      },
      {
        equalityFn: shallow,
        fireImmediately: true,
      },
    )

    return () => cancelSub()
  }, [i18n])

  if (loading)
    return <div>loading...</div>

  return (
    <ConfigProvider locale={locale} componentSize={elementSize} theme={{ cssVar: true, hashed: false, algorithm: isDark ? theme.darkAlgorithm : theme.defaultAlgorithm }}>
      <ThemeProvider theme={{ isDark }}>
        <AntdApp component={false}>
          <AntdGlobal />
          {/* fallbackElement 防止闪屏 */}
          <RouterProvider router={router} fallbackElement={<Fragment />} />
        </AntdApp>
      </ThemeProvider>
    </ConfigProvider>
  )
}

export default App
