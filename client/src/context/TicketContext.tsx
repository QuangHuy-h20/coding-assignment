import { Ticket, User } from '@acme/shared-models';
import {
  createContext,
  Dispatch,
  ReactNode,
  useContext,
  useEffect,
  useReducer,
} from 'react';
import { fetchTickets, fetchUsers } from '../apis/ticket';

type State = {
  tickets: Ticket[];
  users: User[];
  loading: boolean;
};

type Action =
  | { type: 'FETCH_TICKETS'; payload: Ticket[] }
  | { type: 'FETCH_USERS'; payload: User[] }
  | { type: 'FETCH_SUCCESS' }
  | { type: 'ADD_TICKET'; payload: Ticket }
  | {
      type: 'TOGGLE_COMPLETE';
      payload: { ticketId: number };
    }
  | {
      type: 'ASSIGN_TICKET';
      payload: { ticketId: number; assigneeId: number | null };
    };

type Context = {
  state: State;
  dispatch: Dispatch<Action>;
};
export const TicketDataContext = createContext<Context>({} as Context);

const initialState: State = {
  users: [],
  tickets: [],
  loading: true,
};

export const TicketProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(ticketReducer, initialState);

  useEffect(() => {
    (async () => {
      const [tickets, users] = await Promise.all([
        fetchTickets(),
        fetchUsers(),
      ]);
      dispatch({ type: 'FETCH_TICKETS', payload: tickets });
      dispatch({ type: 'FETCH_USERS', payload: users });
      dispatch({ type: 'FETCH_SUCCESS' });
    })();
  }, []);

  return (
    <TicketDataContext.Provider value={{ state, dispatch }}>
      {children}
    </TicketDataContext.Provider>
  );
};

const ticketReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'FETCH_TICKETS':
      return {
        ...state,
        tickets: action.payload,
      };
    case 'FETCH_USERS':
      return {
        ...state,
        users: action.payload,
      };
    case 'FETCH_SUCCESS':
      return {
        ...state,
        loading: false,
      };
    case 'ADD_TICKET':
      return {
        ...state,
        tickets: [...state.tickets, action.payload],
      };
    case 'TOGGLE_COMPLETE':
      return {
        ...state,
        tickets: state.tickets.map((ticket) =>
          ticket.id === action.payload.ticketId
            ? { ...ticket, completed: !ticket.completed }
            : ticket
        ),
      };
    case 'ASSIGN_TICKET':
      return {
        ...state,
        tickets: state.tickets.map((ticket) =>
          ticket.id === action.payload.ticketId
            ? { ...ticket, assigneeId: action.payload.assigneeId }
            : ticket
        ),
      };
    default:
      return state;
  }
};

export const useTicketContext = () => {
  const context = useContext(TicketDataContext);
  if (!context)
    throw new Error('useStateContext must be used within a StateProvider');
  return context;
};
