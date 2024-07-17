import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import CustomerForm from '../forms/CustomerForm';
import { createUser } from '@/lib/api'; // Assurez-vous d'importer la fonction createUser
import { useRouter } from 'next/router';

jest.mock('@/lib/api');
jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

const mockCreateUser = createUser as jest.MockedFunction<typeof createUser>;
const mockRouterPush = jest.fn();

(useRouter as jest.Mock).mockReturnValue({
  push: mockRouterPush,
});

describe('CustomerForm', () => {
  beforeEach(() => {
    mockCreateUser.mockReset();
    mockRouterPush.mockReset();
  });

  it('renders the form fields correctly', () => {
    render(<CustomerForm />);

    expect(screen.getByLabelText(/full name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/phone number/i)).toBeInTheDocument();
    expect(screen.getByText(/get started/i)).toBeInTheDocument();
  });

  it('submits the form successfully', async () => {
    mockCreateUser.mockResolvedValue({ id: '123' });

    render(<CustomerForm />);

    fireEvent.change(screen.getByLabelText(/full name/i), { target: { value: 'Stephane' } });
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'monnier1977@gmail.com' } });
    fireEvent.change(screen.getByLabelText(/phone number/i), { target: { value: '0711111111' } });

    fireEvent.click(screen.getByText(/get started/i));

    await waitFor(() => expect(mockCreateUser).toHaveBeenCalledWith({
      name: 'Stephane',
      email: 'monnier1977@gmail.com',
      phone: '0711111111',
    }));

    await waitFor(() => expect(mockRouterPush).toHaveBeenCalledWith('/customer/123/register'));
  });

  it('handles submission error', async () => {
    mockCreateUser.mockRejectedValue(new Error('Failed to create user'));

    render(<CustomerForm />);

    fireEvent.change(screen.getByLabelText(/full name/i), { target: { value: 'Stephane' } });
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'monnier1977@gmail.com' } });
    fireEvent.change(screen.getByLabelText(/phone number/i), { target: { value: '0711111111' } });

    fireEvent.click(screen.getByText(/get started/i));

    await waitFor(() => expect(mockCreateUser).toHaveBeenCalledWith({
      name: 'Stephane',
      email: 'monnier1977@gmail.com',
      phone: '0711111111',
    }));

    // Vérifiez que le message d'erreur est affiché (si vous en avez un)
    await waitFor(() => expect(mockRouterPush).not.toHaveBeenCalled());
  });
});
