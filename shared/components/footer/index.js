import React from 'react'
import useTranslation from 'next-translate/useTranslation'

import FooterWrapper from './FooterWrapper'

const Footer = () => {
  const { t } = useTranslation('common')

  return (
    <FooterWrapper>
      <section>
        {t('footer.copyRightMessage', { year: new Date().getFullYear() })}
        <section>{t('footer.copyRightSubMessage')}</section>
      </section>
    </FooterWrapper>
  )
}

export default Footer
