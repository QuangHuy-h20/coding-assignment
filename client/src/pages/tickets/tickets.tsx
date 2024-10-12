import styles from './tickets.module.css';

import { useTicketContext } from '../../context/TicketContext';
import TicketItem from '../../components/TicketItem/TicketItem';
import { ChangeEvent, useState } from 'react';
import CreateTicket from '../../components/CreateTicket/CreateTicket';
import { Link } from 'react-router-dom';

type Filter = 'all' | 'complete' | 'incomplete';

const options = [
  { text: 'All', value: 'all' },
  { text: 'Complete', value: 'complete' },
  { text: 'Incomplete', value: 'incomplete' },
];

const mappingOptions = {
  all: null,
  complete: true,
  incomplete: false,
};

const TicketsPage = () => {
  const {
    state: { tickets, loading },
  } = useTicketContext();

  const [filter, setFilter] = useState<Filter>('all');

  const handleFilter = (e: ChangeEvent<HTMLSelectElement>) => {
    setFilter(e.target.value as typeof filter);
  };

  const filteredTickets =
    mappingOptions[filter] === null
      ? tickets
      : tickets.filter((t) => t.completed === mappingOptions[filter]);

  if (loading) {
    return <div>Loading</div>;
  }

  return (
    <div className={styles['container']}>
      <h2>Tickets</h2>
      <CreateTicket />
      <select value={filter} onChange={handleFilter}>
        {options.map((opt) => (
          <option key={opt.text} value={opt.value}>
            {opt.text}
          </option>
        ))}
      </select>
      {filteredTickets.length ? (
        <div className={styles['ticket-list']}>
          {filteredTickets.map((t) => (
            <div>
              <Link
                key={t.id}
                to={`/detail/${t.id}`}
                className={styles['item']}
              >
                <TicketItem ticket={t} />
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <span>No record</span>
      )}
    </div>
  );
};

export default TicketsPage;
