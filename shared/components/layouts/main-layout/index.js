import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

import Emitter from '@shared/utils/events'
import { LAYOUT_CONFIG } from '@shared/constants'
import { EMITTER_EVENTS } from '@shared/utils/constants'
import { StyledMainLayout } from './StyledMainLayout'
import Layouts from './layout'
import { userExists } from '@shared/utils/helper'

const MainLayout = ({ children, defaultLayout }) => {
  const urlParams = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : null
  const layoutVariant = urlParams?.get('layout') ? +urlParams?.get('layout') : defaultLayout
  const [collapsed, setCollapsed] = useState(![LAYOUT_CONFIG.VERTICAL_OPTION_2].includes(layoutVariant))
  useEffect(() => {
    Emitter.on(EMITTER_EVENTS.LOG_IN, () => {
      this.forceUpdate()
    })
    Emitter.on(EMITTER_EVENTS.LOG_OUT, () => {
      this.forceUpdate()
    })
    return () => {
      Emitter.off(EMITTER_EVENTS.LOG_IN)
      Emitter.off(EMITTER_EVENTS.LOG_OUT)
    }
  }, [])

  const toggle = () => {
    setCollapsed((prev) => !prev)
  }

  if (userExists()) {
    return (
      <StyledMainLayout data-environment={process.env.NODE_ENV !== 'production' ? process.env.NODE_ENV : null} className="main-layout">
        <Layouts collapsed={collapsed} layoutVariant={layoutVariant} toggle={toggle}>
          {children}
        </Layouts>
      </StyledMainLayout>
    )
  }

  return children
}

export default MainLayout

MainLayout.propTypes = {
  defaultLayout: PropTypes.number,
  children: PropTypes.node
}

MainLayout.defaultProps = {
  defaultLayout: 1,
  appLoading: false
}
