import React from 'react';
import { render } from "@testing-library/react"
import '@testing-library/jest-dom/extend-expect'
import App from './App';

import { sumTwoNumbers, loginUser } from './actions/authActions'

describe('Frontend automated tests', () => {

  test('Check if "Unleashed Capital Test Homepage..." text in home page', () => {
    const {getByText} = render(<App />);
    const emailInput = getByText("Unleashed Capital Test Homepage...");
    expect(emailInput).toBeInTheDocument();
  })

  test('Check if "loginUser" function has been called in "authActions"', () => {
    const isLogin = loginUser({email: "surya@somerandomguy.xyz", password: "pass123123"});
    expect(isLogin(0)).toBe();
  })

})

