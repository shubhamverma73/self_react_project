import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Protected from './components/layouts/Protected';
import Home from './components/pages/Home';
import Dashboard from './components/pages/Dashboard';
import Rso from './components/rso/Rso';
import EditRso from './components/rso/EditRso';
import AddRso from './components/rso/AddRso';
import Ticket from './components/ticket/Ticket';
import EditTicket from './components/ticket/EditTicket';
import Stores from './components/stores/Stores';
import EditStore from './components/stores/EditStore';
import Logout from './components/user/Logout';
// import NotFound from './components/pages/NotFound';

function App() {

  return ( 
          <>
            <Router>
              <div className="App">
                <Switch>
                  <Route exact path="/" component={Home} />
                  <Protected exact path="/dashboard" component={Dashboard} />
                  <Protected exact path="/logout" component={Logout} />
                  <Protected exact path="/rso" component={Rso} />
                  <Protected exact path="/rso/edit/:id" component={EditRso} />
                  <Protected exact path="/add-rso" component={AddRso} />
                  <Protected exact path="/ticket" component={Ticket} />
                  <Protected exact path="/ticket/edit/:id" component={EditTicket} />
                  <Protected exact path="/stores" component={Stores} />
                  <Protected exact path="/store/edit/:id" component={EditStore} />
                </Switch>
              </div>
            </Router> 
          </>
        );
}

export default App;