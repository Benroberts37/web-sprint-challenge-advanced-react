// Write your tests here
import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import AppClass from './AppClass';
import { render, screen } from '@testing-library/react';



test('sanity', () => {
  expect(true).toBe(false);
})


test('renders the left toggle button', () => {
  render(<AppClass />);

  const leftToggle = screen.queryByText('LEFT');
  expect(leftToggle).toBeVisible();
  expect(leftToggle).toBeInTheDocument();
})

test('renders the right toggle button', () => {
  render(<AppClass />);

  const rightToggle = screen.queryByText('RIGHT');
  expect(rightToggle).toBeVisible();
  expect(rightToggle).toBeInTheDocument();
})

test('The type your email box exists', () => {
  render(<AppClass />);

  const typeEmail = screen.getPlaceholderText('type email');
  expect(typeEmail).toBeVisible();
  expect(typeEmail).toBeInTheDocument();
})

test('Shows the user how many times they have moved', () => {
  render(<AppClass />);

  const movementCounter = screen.queryByText('You move 0 times');
  expect(movementCounter).toBeVisible();
  expect(movementCounter).toBeInTheDocument();
})

test('Shows the user what coordinates of the box they are on', () => {
  render(<AppClass />);

  const coordinates = screen.queryByText('Coordinates (2, 2)');
  expect(coordinates).toBeVisible();
  expect(coordinates).toBeInTheDocument();
})