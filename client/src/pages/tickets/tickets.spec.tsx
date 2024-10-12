import { render, act, waitFor } from '@testing-library/react';
import { TicketProvider, useTicketContext } from '../../context/TicketContext';
import { fetchTickets, fetchUsers } from '../../apis/ticket';

jest.mock('../apis/ticket', () => ({
  fetchTickets: jest.fn(),
  fetchUsers: jest.fn(),
}));

const TestComponent = () => {
  const { state, dispatch } = useTicketContext();
  return (
    <div>
      <div data-testid="tickets-count">{state.tickets.length}</div>
      <div data-testid="users-count">{state.users.length}</div>
      <button
        onClick={() =>
          dispatch({
            type: 'ADD_TICKET',
            payload: {
              id: 999,
              description: 'New Ticket',
              completed: false,
              assigneeId: null,
            },
          })
        }
      >
        Add Ticket
      </button>
    </div>
  );
};

describe('TicketProvider', () => {
  beforeEach(() => {
    fetchTickets.mockReset();
    fetchUsers.mockReset();
  });

  it('should fetch tickets and users on mount', async () => {
    fetchTickets.mockResolvedValue([{ id: 1, title: 'Test Ticket' }]);
    fetchUsers.mockResolvedValue([{ id: 1, name: 'Test User' }]);

    const { getByTestId } = render(
      <TicketProvider>
        <TestComponent />
      </TicketProvider>
    );

    await waitFor(() => {
      expect(getByTestId('tickets-count')).toHaveTextContent('1');
      expect(getByTestId('users-count')).toHaveTextContent('1');
    });

    expect(fetchTickets).toHaveBeenCalledTimes(1);
    expect(fetchUsers).toHaveBeenCalledTimes(1);
  });

  it('should add a ticket when dispatch is called with ADD_TICKET', async () => {
    fetchTickets.mockResolvedValue([]);
    fetchUsers.mockResolvedValue([]);

    const { getByTestId, getByText } = render(
      <TicketProvider>
        <TestComponent />
      </TicketProvider>
    );

    expect(getByTestId('tickets-count')).toHaveTextContent('0');

    act(() => {
      getByText('Add Ticket').click();
    });

    expect(getByTestId('tickets-count')).toHaveTextContent('1');
  });
});
