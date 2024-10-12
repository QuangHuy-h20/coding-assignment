export const fetchTickets = async () => {
  const response = await fetch('/api/tickets');
  const data = await response.json();
  return data;
};

export const fetchSingleTicket = async (ticketId: number) => {
  const response = await fetch(`/api/tickets/${ticketId}`);
  const data = await response.json();
  return data;
};

export const fetchUsers = async () => {
  const response = await fetch('/api/users');
  const data = await response.json();
  return data;
};

export const createTicket = async (description: string) => {
  const response = await fetch('/api/tickets', {
    method: 'POST',
    body: JSON.stringify({ description }),
    headers: { 'Content-Type': 'application/json' },
  });
  const data = await response.json();
  return data;
};

export const assignTicketToUser = async (
  ticketId: number,
  assigneeId: number
) => {
  await fetch(`/api/tickets/${ticketId}/assign/${assigneeId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
  });
};

export const unassignTicketToUser = async (ticketId: number) => {
  await fetch(`/api/tickets/${ticketId}/unassign`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
  });
};

export const markTicketAsCompleted = async (ticketId: number) => {
  await fetch(`/api/tickets/${ticketId}/complete`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
  });
};

export const markTicketAsInCompleted = async (ticketId: number) => {
  await fetch(`/api/tickets/${ticketId}/complete`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
  });
};
