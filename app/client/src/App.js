import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
 
import Posts from './components/posts';
import SignUp from './components/signup';
 
class App extends Component {
  render() {
    return (      
       <BrowserRouter>
        <div>
            <Switch>
             <Route path="/" component={Posts} exact/>
             <Route path="/signup" component={SignUp} exact/>
           </Switch>
        </div> 
      </BrowserRouter>
    );
  }
}
 
export default App;