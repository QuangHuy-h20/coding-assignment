import { Route, Routes } from 'react-router-dom';

import styles from './app.module.css';
import TicketsPage from './pages/tickets/tickets';
import { TicketProvider } from './context/TicketContext';
import TicketDetailPage from './pages/ticket-detail/ticket-detail';

const App = () => {
  return (
    <TicketProvider>
      <div className={styles['app']}>
        <h1>Ticketing App</h1>
        <Routes>
          <Route path="/" element={<TicketsPage />} />
          <Route path="/detail/:id" element={<TicketDetailPage />} />
        </Routes>
      </div>
    </TicketProvider>
  );
};

export default App;
