import { withProviders } from './providers'
import { Text } from 'react-native'
import { useTranslation } from 'react-i18next'

const Main = () => {
  const { t } = useTranslation()

  return <Text>{t('common:L_welcome')}</Text>
}

export default withProviders(Main)
