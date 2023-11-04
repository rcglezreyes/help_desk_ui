import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ListTickets from './ListTickets';

describe('<ListTickets />', () => {
  test('it should mount', () => {
    render(<ListTickets />);
    
    const listTickets = screen.getByTestId('ListTickets');

    expect(listTickets).toBeInTheDocument();
  });
});