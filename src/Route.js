import React, { Component } from 'react';
import { Route, Router } from 'react-router-dom';
import Signup from './components/signup';
import Signin from './components/signin';
import history from './History';
import donorlist from './components/donorprofile';
import donorHome from './components/donorhome'
import seekerHome from './components/seekerhome'
import firebase from 'firebase'

class Routers extends Component {

    async componentWillMount(){
        let user = await localStorage.getItem("uid")
        if (user) {
            firebase.database().ref(`users/${user}/`).once('value')
                .then((userData) => {
                    let data = userData.val()
                    if (data.category === "seeker") {
                        history.push("/seekerHome")
                    }
                    if (data.category === "donor") {
                        history.push("/donorHome")
                    }
                })
        } else {
            history.push('/')
        }
    }
    render() {
        return (
            <Router history={history}>
                <div>
                    <Route exact path="/" component={Signin} />
                    <Route exact path="/signup" component={Signup} />
                    <Route exact path="/donorlist" component={donorlist} />
                    <Route exact path="/donorhome" component={donorHome} />
                    <Route exact path="/seekerHome" component={seekerHome} />
                </div>
            </Router>
        )
    }
}


export default Routers;