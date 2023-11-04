import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import HelpDesk from './helpDesk';

describe('<HelpDesk />', () => {
  test('it should mount', () => {
    render(<HelpDesk />);
    
    const addTicket = screen.getByTestId('AddTicket');

    expect(addTicket).toBeInTheDocument();
  });
});