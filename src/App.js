
import  Chat  from './Chat';
import './App.css';
import Sidebar from './Sidebar';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import { useState } from 'react';
import Login from './Login';
import { useStateValue } from './StateProvider';

function App() {
  const [{user},dispatch]=useStateValue();
  return (
    <div className="app">
      {!user?(
        <Login></Login>
      ):(
        <div className="app__body">
        <Router>
    <Sidebar></Sidebar>
      <Switch>
     
      <Route path="/rooms/:roomId">
      
<Chat></Chat>

</Route>
      <Route path="/">

        <Chat></Chat>
      </Route>


</Switch>
</Router>
</div>
      )}
    
    
      
    
  
    </div>
  );
}

export default App;
