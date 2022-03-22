// Write your tests here
import React from 'react';
import AppClass from './AppClass';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';


beforeEach (() => {
  render(<AppClass />);
})

test('sanity', () => {
  expect(true).toBe(true);
})

test ("test if the down button works", () => {
  fireEvent.click(screen.getByText('DOWN'))
  expect(screen.queryByText("Coordinates (2,3"))
})

test ("test if the up button works", () => {
  fireEvent.click(screen.getByText('UP'))
  expect(screen.queryByText("Coordinates (2,1"))
})

test ("test if the right button works", () => {
  fireEvent.click(screen.getByText('RIGHT'))
  expect(screen.queryByText("Coordinates (3,2"))
})

test ("test if the left button works", () => {
  fireEvent.click(screen.getByText('LEFT'))
  expect(screen.queryByText("Coordinates (1,2"))
})

