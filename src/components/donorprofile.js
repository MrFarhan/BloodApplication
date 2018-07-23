import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Logout, donorprofile, deletefunction } from '../store/action/action';
import Paper from 'material-ui/Paper';
import { SelectField, MenuItem, FlatButton } from 'material-ui';


const style = {
    height: "auto",
    width: 350,
    margin: 10,
    padding: "10px",
    textAlign: 'center',
    display: 'inline-block',
};



class donorHome extends Component {

    componentWillMount = () => {
        let uid = localStorage.getItem("uid")
        this.props.donorprofile(uid)
    }

    deletebutton1 = () => {
        console.log("delete function")
        let uid = localStorage.getItem("uid")
        this.props.deletefunction(uid)
    }

    render() {
        return (
            <div>
                <h1>Welcome To Donor Home </h1>
                {
                    this.props.donorprofiledata1 ?
                        this.props.donorprofiledata1.map((value, index) => {
                            return <Paper key={index} style={{ "display": "block !important" }} key={index} style={style} zDepth={5}>
                                <div class="seekerMainDiv" >
                                    <li>Age : {value.age}</li>
                                    <li>Weight : {value.weight}</li>
                                    <li>Place Where You want to donate blood : {value.place}</li>
                                    <button onClick={this.deletebutton1}>Delete</button>
                                    <button onClick={this.props.Logout}>Log Out</button>
                                    {/* <Link to='/' onClick={() => this.props.Logout()}>Log Out</Link> */}

                                    <br />
                                </div>
                            </Paper>
                        })
                        : null
                }
            </div>
        )
    }
}

function mapStateToProp(state) {
    return ({
        donorprofiledata1: state.root.donorprofiledata
    })
}
function mapDispatchToProp(dispatch) {
    return ({
        Logout: () => { dispatch(Logout()) },
        donorprofile: (uid) => { dispatch(donorprofile(uid)) },
        deletefunction: (uid) => { dispatch(deletefunction(uid)) }
    })
}






export default connect(mapStateToProp, mapDispatchToProp)(donorHome);

