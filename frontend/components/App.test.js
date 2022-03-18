// Write your tests here
import React from 'react'
import { render } from 'react-dom'
import AppFunctional from './AppFunctional'

test('sanity', () => {
  expect(true).toBe(false)
})

beforeEach(() => {
  render(<AppFunctional/>)
})

test('renders the left toggle button', () => {
  const leftToggle = screen.queryByText('LEFT')
  expect(leftToggle).toBeVisible()
  expect(leftToggle).toBeInTheDocument()
})

test('renders the right toggle button', () => {
  const rightToggle = screen.queryByText('RIGHT')
  expect(rightToggle).toBeVisible()
  expect(rightToggle).toBeInTheDocument()
})

test('The type your email box exists', () => {
  const typeEmail = screen.getPlaceholderText('type email')
  expect(typeEmail).toBeVisible()
  expect(typeEmail).toBeInTheDocument()
})

test('Shows the user how many times they have moved', () => {
  const movementCounter = screen.queryByText('You move 0 times')
  expect(movementCounter).toBeVisible()
  expect(movementCounter).toBeInTheDocument()
})

test('Shows the user what coordinates of the box they are on', () => {
  const coordinates = screen.queryByText('Coordinates (2, 2)')
  expect(coordinates).toBeVisible()
  expect(coordinates).toBeInTheDocument()
})