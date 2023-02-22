import React from 'react'
import useTranslation from 'next-translate/useTranslation'

// import LocaleToggle from 'containers/LocaleToggle'
import FooterWrapper from './FooterWrapper'

function Footer() {
  const { t } = useTranslation('common')

  return (
    <FooterWrapper>
      <section>
        {t('footer.copyRightMessage', { year: new Date().getFullYear() })}
        <section>{t('footer.copyRightSubMessage')}</section>
      </section>
      <section>
        {/* TODO: */}
        {/* <LocaleToggle /> */}
      </section>
    </FooterWrapper>
  )
}

export default Footer
