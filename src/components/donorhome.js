import React, { Component } from 'react';
import { connect } from 'react-redux';
import { donorformdata } from '../store/action/action';
import { Link } from 'react-router-dom'
import "../App.css"
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import history from './../History'


const style = {
    height: "auto",
    width: 350,
    margin: 20,
    padding: "10px",
    textAlign: 'center',
    display: 'inline-block',
};


const style1 = {
    margin: 12,
};


const floatingLabelStyle = {
    textAlign: 'left'
}


class Signup extends Component {
    constructor(props) {
        super(props);

        this.state = {
            age: '',
            weight: '',
            place: '',
        }
    }

    submit(e) {
        e.preventDefault()
        let { age, weight, place } = this.state
        let data = {
            age: age,
            weight: weight,
            place: place,
            uid: localStorage.getItem("uid")
        }
        // this.setState({
        //     age: '',
        //     weight: '',
        //     place: '',
        // })
        console.log(data)
        if (age && weight && place) {
            console.log(this.props.uid)
            this.props.donorformdata(data)
            history.push("/donorlist")
        }
    }

    render() {
        return (
            <div>

                <div className="box">

                    <Paper style={style} zDepth={5}>

                        <form onSubmit={this.submit}>

                            <div>

                                <h1>Create Account</h1>

                                <TextField hintText="Type your Age here..." floatingLabelText="Your Age" type='number' name='age' value={this.state.age} onChange={(e) => this.setState({ [e.target.name]: e.target.value })} required />
                                <br />

                                <TextField hintText="Type your Weight here..." floatingLabelText="weight" type='number' name='weight' value={this.state.weight} onChange={(e) => this.setState({ [e.target.name]: e.target.value })} required />
                                <br />

                                <TextField hintText="Type Place here..." floatingLabelText="Where You want to Donate" type='text' name='place' value={this.state.place} onChange={(e) => this.setState({ [e.target.name]: e.target.value })} required />
                                <br />

                                <RaisedButton label="Submit" type="submit" primary={true} style={style1} onClick={(e)=>this.submit(e)} />

                            </div>

                        </form>

                    </Paper >

                </div>


            </div >
        )
    }
}


function mapStateToProp(state) {
    return ({
        uid: state.root.currentUser
    })
}


function mapDispatchToProp(dispatch) {
    return ({
        donorformdata: (data) => {
            dispatch(donorformdata(data));
        }
    })
}

export default connect(mapStateToProp, mapDispatchToProp)(Signup);