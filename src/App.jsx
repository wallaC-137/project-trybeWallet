import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Wallet from './pages/Wallet';

function App() {
  return (
    <div>
      <div>Hello, TrybeWallet!</div>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route path="/carteira" component={ Wallet } />
        <Route path="*" render={ () => <div>Page not found</div> } />
        {/* apagar depois esse ultimo router */}
      </Switch>
    </div>
  );
}

export default App;
