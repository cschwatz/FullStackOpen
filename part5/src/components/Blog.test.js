import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
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
})