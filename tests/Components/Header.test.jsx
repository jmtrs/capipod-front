import React from 'react'
import { render, screen } from '@testing-library/react'
import {describe, expect} from "@jest/globals";
import '@testing-library/jest-dom'
import { BrowserRouter } from 'react-router-dom'
import Header from '../../src/components/Header.jsx'

describe('Header', () => {
  it('renders without crashing and displays navigation links', () => {
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    )

    expect(screen.getByText('Podcasts')).toBeInTheDocument()

    expect(screen.getByText('Inicio')).toBeInTheDocument()
  })
})
