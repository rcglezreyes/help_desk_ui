import './App.css';
import HelpDesk from "./components/helpDesk/helpDesk";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import AddTicket from "./components/addTicket/addTicket";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import ListTickets from "./components/listTickets/listTickets";
import Confirmation from "./components/listTickets/confirmation";

function App() {

  return (
      <Router>
          <Routes>
              <Route index element={<HelpDesk />} />
              <Route path='/add_ticket' element={<AddTicket />} />
              <Route path='/tickets' element={<ListTickets />} />
              <Route path='/confirmation' element={<Confirmation />} />
          </Routes>
      </Router>
  );
}

export default App;
