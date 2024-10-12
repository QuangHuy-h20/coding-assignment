import { createTicket } from '../../apis/ticket';
import { useTicketContext } from '../../context/TicketContext';
import { FormEvent, useState } from 'react';
import styles from './CreateTicket.module.css';

const CreateTicket = () => {
  const [text, setText] = useState('');
  const { dispatch } = useTicketContext();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!text) {
      return;
    }

    const res = await createTicket(text);
    dispatch({ type: 'ADD_TICKET', payload: res });
  };

  return (
    <form onSubmit={handleSubmit} className={styles['container']}>
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter description..."
      />
      <button type="submit">Create ticket</button>
    </form>
  );
};

export default CreateTicket;
