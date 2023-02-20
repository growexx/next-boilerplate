import { render } from '@testing-library/react'

import Home from '@src/pages'

it('renders homepage unchanged', () => {
  const { container } = render(<Home />)
  expect(container).toMatchInlineSnapshot(`
    <div>
      <h1>
        Welcome to Next.js!
      </h1>
    </div>
  `)
})
