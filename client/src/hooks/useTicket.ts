import { Ticket } from '@acme/shared-models';
import { useState } from 'react';
import { fetchTickets } from '../apis/ticket';

const useTicket = () => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(false);

  const handleGetTickets = async () => {
    try {
      setLoading(true);
      const res = await fetchTickets();
      setTickets(res);
    } catch (error) {
      console.error('error', error);
    } finally {
      setLoading(false);
    }
  };

  return { tickets, loading, handleGetTickets };
};

export default useTicket;
