import React from 'react'
import useTranslation from 'next-translate/useTranslation'

const InternationalizationDemoPage = () => {
  const { t } = useTranslation()
  return <div>{t('common:internationalizationPara')}</div>
}

export default InternationalizationDemoPage
