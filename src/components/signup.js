import React, { Component } from 'react';
import { connect } from 'react-redux';
import { signupAction } from '../store/action/action';
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
            email: '',
            userName: '',
            password: '',
            confirmPassword: '',
            number: '',
            gender: '',
            bloodGroup: '',
        }
        this._onChangeUserName = this._onChangeUserName.bind(this);
        this._onChangeEmail = this._onChangeEmail.bind(this);
        this._onChangePassword = this._onChangePassword.bind(this);
        this.confirmPassword = this.confirmPassword.bind(this)
        this._onChangenumber = this._onChangenumber.bind(this);
        this.signup = this.signup.bind(this);
    }

    handleChange = (event, index, value) => this.setState({ gender: value });
    handleChange1 = (event, index, value) => this.setState({ bloodGroup: value });

    signup() {
        let { email, userName, password, confirmPassword, gender, bloodGroup, number, Category } = this.state
        let user = {
            email: email,
            username: userName,
            password: password,
            confirmPassword: confirmPassword,
            number: number,
            gender: gender,
            bloodGroup: bloodGroup,
            category: Category

        }
        if (userName && password && confirmPassword && gender && bloodGroup && number && Category) {
            if (password === confirmPassword) {
                this.props.signupwithEmailPassword(user)
            } else {
                alert("password doesnt match")
            }
        } else {
            alert("Fill up form correctly")
        }
    }


    _onChangeEmail(event) {
        this.setState({
            email: event.target.value
        })
    }


    _onChangeUserName(event) {
        this.setState({
            userName: event.target.value
        })
    }


    _onChangePassword(event) {
        this.setState({
            password: event.target.value
        })
    }


    _onChangenumber(event) {
        this.setState({
            number: event.target.value
        })
    }

    confirmPassword(event) {
        this.setState({
            confirmPassword: event.target.value
        })
    }

    handleChange2 = event => {
        this.setState({ Category: event.target.value });
    };


    render() {
        return (
                <div className="box">

                    <Paper style={style} zDepth={5}>

                        <div >

                            <h1>Create Account</h1>

                            <TextField hintText="Type your name here..." floatingLabelText="User Name" type='text' name='username' value={this.state.userName} onChange={this._onChangeUserName} required />
                            <br />

                            <TextField hintText="Type your email address here..." floatingLabelText="Email" type='email' name='email' value={this.state.email} onChange={this._onChangeEmail} required />
                            <br />

                            <SelectField
                                floatingLabelText="Blood Group"
                                value={this.state.bloodGroup}
                                onChange={this.handleChange1}
                                style={floatingLabelStyle}>
                                <MenuItem value={'O-'} primaryText="O-" />
                                <MenuItem value={'O+'} primaryText="O+" />
                                <MenuItem value={'A+'} primaryText="A+" />
                                <MenuItem value={'A-'} primaryText="A-" />
                                <MenuItem value={'B+'} primaryText="B+" />
                                <MenuItem value={'B-'} primaryText="B-" />
                                <MenuItem value={'AB+'} primaryText="AB+" />
                                <MenuItem value={'AB-'} primaryText="AB-" />

                            </SelectField>

                            <TextField hintText="Type your password here..." floatingLabelText="Password" type='password' name='password' value={this.state.password} onChange={this._onChangePassword} required />
                            <br />

                            <TextField hintText="Confirm your password here..." floatingLabelText="Confirm Password" type='password' name='confirmPassword' value={this.state.confirmPassword} onChange={this.confirmPassword} required />

                            <br />

                            <TextField hintText="(+92)XXXXXXXXX" floatingLabelText="Contact No." >
                                <input type='number' name='number' value={this.state.number} onChange={this._onChangenumber} required />
                            </TextField>
                            <br />

                            <FormControl component="fieldset" required
                            >
                                <FormLabel component="legend">Category</FormLabel>
                                <RadioGroup
                                    aria-label="category"
                                    name="Category"
                                    value={this.state.Category}
                                    onChange={this.handleChange2}
                                >
                                    <FormControlLabel value="seeker" control={<Radio />} label="Seeker" />
                                    <FormControlLabel value="donor" control={<Radio />} label="Donor" />
                                </RadioGroup>
                            </FormControl>


                            <SelectField style={{ flexDirection: "row !important" }}
                                floatingLabelText="Gender"
                                value={this.state.gender}
                                onChange={this.handleChange}>
                                <MenuItem value={'male'} primaryText="Male" />
                                <MenuItem value={'female'} primaryText="Female" />
                                <MenuItem value={'other'} primaryText="other" />
                            </SelectField>

                            {this.props.currentUserError}

                            <RaisedButton label="Signup" primary={true} style={style1} onClick={this.signup} />
                            <br />

                            <Link to="/">
                                <RaisedButton label="For Sign in Click here...." secondary={true} style={style1}>
                                </RaisedButton>
                            </Link>

                        </div>

                    </Paper >

                </div>
        )
    }
}


function mapStateToProp(state) {
    return ({
        // userName: state.root.userName
        currentUserError: state.root.currentUserError
    })
}


function mapDispatchToProp(dispatch) {
    return ({
        // changeUserName: ()=>{dispatch(changeUserName())}
        signupwithEmailPassword: (user) => {
            dispatch(signupAction(user));
        }
    })
}

export default connect(mapStateToProp, mapDispatchToProp)(Signup);