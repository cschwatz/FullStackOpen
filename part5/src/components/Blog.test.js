import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('Blog tests', () => {
  test('Blog renders only title and author by default', () => {
    const blog = {
      title: 'testing',
      author: 'testingus',
      url: 'testing.com/test'
    }
    render(<Blog blog={blog}/>)
    const titleElement = screen.getByText('testing')
    const authorElement = screen.getByText('testingus')
    const hiddenPart = document.getElementsByClassName('hiddenBlogPart')[0]
    expect(titleElement).toBeInTheDocument()
    expect(authorElement).toBeInTheDocument()
    expect(hiddenPart).toHaveStyle({ display: 'none' })
  })

  test('Blog renders url and likes if show button is clicked', async () => {
    const blog = {
      title: 'testing',
      author: 'testingus',
      url: 'testing.com/test'
    }
    const user = userEvent.setup()
    render(<Blog blog={blog}/>)
    const button = screen.getByText('show')
    const hiddenPart = document.getElementsByClassName('hiddenBlogPart')[0]
    expect(hiddenPart).toHaveStyle({ display: 'none' })
    await user.click(button)
    expect(hiddenPart).toHaveStyle({ display: 'block' })
  })
})