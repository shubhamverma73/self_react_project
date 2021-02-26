import React from 'react';
import {BrowserRouter as Router, Switch} from 'react-router-dom';
import Footer from './components/layouts/Footer';
import Protected from './components/layouts/Protected';
// import Home from './components/pages/Home';
// import About from './components/pages/About';
// import Causes from './components/pages/Causes';
// import Events from './components/pages/Events';
// import Blog from './components/pages/Blog';
// import Contact from './components/pages/Contact';
// import Ngologin from './components/user/Ngologin';
// import Ngoregister from './components/user/Ngoregister';
// import Ngoprofile from './components/user/Ngoprofile';
// import UpdateNgoprofile from './components/user/UpdateNgoprofile';
// import Logout from './components/user/Logout';
// import NotFound from './components/pages/NotFound';

function App() {
  return ( 
          <>            
            <Router>
              <div className="App">
                {/* <Switch>
                  <Protected exact path="/" component={Home} />
                  <Protected exact path="/about" component={About} />
                  <Protected exact path="/causes" component={Causes} />
                  <Protected exact path="/events" component={Events} />
                  <Protected exact path="/blog" component={Blog} />
                  <Protected exact path="/contact" component={Contact} />
                  <Protected exact path="/ngo-login" component={Ngologin} />
                  <Protected exact path="/ngo-register" component={Ngoregister} />
                  <Protected exact path="/ngo-profile" component={Ngoprofile} />
                  <Protected exact path="/update-ngo-profile" component={UpdateNgoprofile} />
                  <Protected exact path="/logout" component={Logout} />
                  <Protected component={NotFound} />
                </Switch> */}
                <Footer />
              </div>
            </Router>
            
          </>
        );
}

export default App;