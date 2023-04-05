import { render, screen, fireEvent } from '@testing-library/react'

import SignIn from '../index'
import { TEST_IDS } from '../stub'

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({})
  })
)

describe.only('SignIn component', () => {
  test('renders email and password inputs', () => {
    render(<SignIn />)
    const emailInput = screen.getByLabelText('Email *')
    const passwordInput = screen.getByLabelText('Password *')
    expect(emailInput).toBeInTheDocument()
    expect(passwordInput).toBeInTheDocument()
  })

  test('clicking on Github sign in button calls signIn with "github" provider', () => {
    render(<SignIn />)
    const githubButton = screen.getByTestId(TEST_IDS.GITHUB_SIGN_IN_BUTTON)
    fireEvent.click(githubButton)
    expect(fetch).toHaveBeenCalledTimes(1)
  })

  test('clicking on Google sign in button calls signIn with "google" provider', () => {
    render(<SignIn />)
    const googleButton = screen.getByTestId(TEST_IDS.GOOGLE_SIGN_IN_BUTTON)
    fireEvent.click(googleButton)
    expect(fetch).toHaveBeenCalledTimes(3)
  })
})
