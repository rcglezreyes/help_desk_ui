import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import AddTicket from './AddTicket';

describe('<AddTicket />', () => {
  test('it should mount', () => {
    render(<AddTicket />);
    
    const addTicket = screen.getByTestId('AddTicket');

    expect(addTicket).toBeInTheDocument();
  });
});