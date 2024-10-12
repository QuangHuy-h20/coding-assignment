import { Ticket } from '@acme/shared-models';
import { ChangeEvent, MouseEvent } from 'react';
import {
  assignTicketToUser,
  markTicketAsCompleted,
  markTicketAsInCompleted,
  unassignTicketToUser,
} from '../../apis/ticket';
import { useTicketContext } from '../../context/TicketContext';
import styles from './TicketItem.module.css';
type Props = {
  ticket: Ticket;
};

const TicketItem = ({ ticket }: Props) => {
  const { description, assigneeId, completed, id } = ticket;

  const {
    state: { users },
    dispatch,
  } = useTicketContext();

  const userOptions = [
    { value: '', name: 'unassign' },
    ...users.map((item) => ({ value: `${item.id}`, name: item.name })),
  ];

  const handleAssignTask = async (e: ChangeEvent<HTMLSelectElement>) => {
    const newAssigneeId = +e.target.value;

    newAssigneeId
      ? await assignTicketToUser(id, newAssigneeId)
      : unassignTicketToUser(id);

    dispatch({
      type: 'ASSIGN_TICKET',
      payload: { ticketId: id, assigneeId: newAssigneeId || null },
    });
  };

  const handleToggleCompleteTask = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    await (!completed
      ? markTicketAsCompleted(id)
      : markTicketAsInCompleted(id));
    dispatch({ type: 'TOGGLE_COMPLETE', payload: { ticketId: id } });
  };

  return (
    <div className={styles['container']}>
      <div data-completed={`${completed}`} className={styles['description']}>
        <span>{`Ticket: ${description}`}</span>
        <div className={styles['assignee']}>
          <span>Assignee:</span>
          <select
            value={assigneeId ? `${assigneeId}` : ''}
            onChange={handleAssignTask}
            onClick={(e) => e.preventDefault()}
          >
            {userOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      <button onClick={handleToggleCompleteTask}>
        {completed ? 'Incomplete' : 'Done'}
      </button>
    </div>
  );
};

export default TicketItem;
