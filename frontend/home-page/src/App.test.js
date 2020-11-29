import React from 'react';
import { render } from "@testing-library/react"
import '@testing-library/jest-dom/extend-expect'
import App from './App';

import { sumTwoNumbers, loginUser } from './actions/authActions'

describe('Frontend automated tests', () => {

  test('Random test to see if our testing logic is working. Adding 2 numbers', () => {
    expect(sumTwoNumbers(2,4)).toBe(6);
  })

  test('Check if "Welcome to homepage" heading exists', () => {
    const {getByText} = render(<App />);
    const emailInput = getByText("Welcome to homepage!");
    expect(emailInput).toBeInTheDocument();
  })

  test('Check if "loginUser" function has been called in "authActions"', () => {
    const isLogin = loginUser({email: "haseeb.khanzada@ymail.com", password: "123456"});
    expect(isLogin(0)).toBe();
  })

})

