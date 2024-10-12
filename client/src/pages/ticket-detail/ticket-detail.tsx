import { useTicketContext } from '../../context/TicketContext';
import { useParams } from 'react-router-dom';
import TicketItem from '../../components/TicketItem/TicketItem';

const TicketDetailPage = () => {
  const {
    state: { tickets },
  } = useTicketContext();
  const params = useParams();

  const data = tickets.find((t) => t.id === +(params['id'] as never));

  return (
    <div>
      <h2>Ticket detail</h2>
      {data ? <TicketItem ticket={data} /> : <div>Not found</div>}
    </div>
  );
};

export default TicketDetailPage;
