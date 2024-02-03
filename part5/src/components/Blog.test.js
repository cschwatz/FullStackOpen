import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import BlogForm from './BlogForm'

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

  test('Like button works if clicked', async () => {
    const blog = {
      title: 'testing',
      author: 'testingus',
      url: 'testing.com/test'
    }
    const mockHandler = jest.fn()
    const user = userEvent.setup()
    render(<Blog blog={blog} handleBlogUpdate={mockHandler}/>)
    const button = screen.getByText('Like')
    await user.click(button)
    await user.click(button)
    expect(mockHandler.mock.calls).toHaveLength(2)
  })
})

describe('Blog form tests', () => {
  test('Check if form calls the prop passed in as argument', async () => {
    const createBlog = jest.fn()
    const user = userEvent.setup()

    render(<BlogForm handleBlogCreation={createBlog} />)

    const title = screen.getByPlaceholderText('title of the blog')
    const url = screen.getByPlaceholderText('url of the blog')
    const createButton = screen.getByText('Create')
    await user.type(title, 'title of test')
    await user.type(url, 'url of test')
    await user.click(createButton)
    expect(createBlog.mock.calls).toHaveLength(1)
    expect(createBlog.mock.calls[0][0].title).toBe('title of test')
    expect(createBlog.mock.calls[0][0].url).toBe('url of test')
  })
})