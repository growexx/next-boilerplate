import React from 'react'
import { render, screen } from '@testing-library/react'
import useTranslation from 'next-translate/useTranslation'

import InternationalizationDemoPage from '@src/pages/internationalization-demo'

jest.mock('next-translate/useTranslation', () => jest.fn())

describe('InternationalizationDemoPage', () => {
  let mockTranslation
  beforeEach(() => {
    mockTranslation = jest.fn()
    useTranslation.mockReturnValue({ t: mockTranslation })
  })

  it('renders the translated paragraph', () => {
    mockTranslation.mockReturnValue('Bonjour!')
    render(<InternationalizationDemoPage />)
    expect(screen.getByText('Bonjour!')).toBeInTheDocument()
  })

  it('uses the correct translation key', () => {
    render(<InternationalizationDemoPage />)
    expect(mockTranslation).toHaveBeenCalledWith('common:internationalizationPara')
  })
})
