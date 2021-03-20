import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Protected from './components/layouts/Protected';
import Home from './components/pages/Home';
import Dashboard from './components/pages/Dashboard';
import Rso from './components/rso/Rso';
import EditRso from './components/rso/EditRso';
import AddRso from './components/rso/AddRso';
// import Blog from './components/pages/Blog';
// import Contact from './components/pages/Contact';
// import Ngologin from './components/user/Ngologin';
// import Ngoregister from './components/user/Ngoregister';
// import Ngoprofile from './components/user/Ngoprofile';
// import UpdateNgoprofile from './components/user/UpdateNgoprofile';
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
                </Switch>
              </div>
            </Router> 
          </>
        );
}

export default App;