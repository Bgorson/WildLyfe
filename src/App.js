import React, { Component } from 'react';
import axios from 'axios'
import { Route, Link } from 'react-router-dom'
// components
import Signup from './components/sign-up'
import LoginForm from './components/login-form'
import Navbar from './components/navbar'
import Login from './components/login'
import Main from './components/mainHub'
import Minigame1 from "./components/minigame1/components/Clickygame"
import StatInfo from './components/statinfo'


class App extends Component {
  constructor() {
    super()
    this.state = {
      loggedIn: false,
      username: null,
      enableNav:true,
      stats: []
    }

    this.getUser = this.getUser.bind(this)
    this.componentDidMount = this.componentDidMount.bind(this)
    this.updateUser = this.updateUser.bind(this)
  }

  componentDidMount() {
    this.getUser()
    this.getStats()
  }

  updateUser (userObject) {
    this.setState(userObject)
  }

  getUser() {
    axios.get('/user/').then(response => {
      console.log('Get user response: ')
      console.log(response.data)
      if (response.data.user) {
        console.log('Get User: There is a user saved in the server session: ')
        this.setState({
          loggedIn: true,
          username: response.data.user.username,
          stats: response.data
        })
      } else {
        console.log('Get user: no user');
        this.setState({
          loggedIn: false,
          username: null
        })
      }
    })
  }
  getStats(){
    axios.get("/user/stats").then(response =>{
      console.log("new response")
      console.log(response.data)
      this.setState({
        stats: response.data
      })
    })
  }
toggleNav(){
  this.setState({
    enableNav:!(this.state.enableNav)
  })
}

  render() {
    return (
      <div className="App">
      {
        (this.state.enableNav)
        ?<Navbar updateUser={this.updateUser} loggedIn={this.state.loggedIn} /> : <div></div>
      }


        {/* greet user if logged in: */}
      {/* {(this.state.loggedIn)? 
     <Main></Main>: <div> "You're not logged in"</div>  
    } */}
        {this.state.loggedIn &&
          <p>Join the party, {this.state.username}!</p>
        }

        
        {/* Routes to different components */}
        <Route
          exact path="/"
          render={() =>
            <Login
              updateUser={this.updateUser}
            />}
        />
        <Route
          path="/login"
          render={() =>
            <Login
              updateUser={this.updateUser}
            />}
        />
        <Route
          path="/signup"
          render={() =>
            <Signup/>}
        />
        <Route
        path="/main"
        render={()=>
          <React.Fragment>
        <StatInfo
        stats = {this.state.stats}
        />
        <Main/>
        </React.Fragment>}
        />
                <Route
        exact path="/minigame1"
        render={()=>
       <Minigame1/>}
        />

      </div>
    );
  }
}

export default App;
