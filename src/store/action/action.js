import ActionTypes from '../constant/constant';
import history from '../../History';
import firebase from 'firebase';

export function signupAction(user) {
    return dispatch => {
        firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
            .then((createdUser) => {
                console.log('signed up successfully', createdUser.uid);
                delete user.password;
                delete user.confirmPassword;
                user.uid = createdUser.uid;
                firebase.database().ref('users/' + createdUser.uid + '/').set(user)
                if (user.category === "donor") {
                    history.push('/donorHome');
                }
                if (user.category === "seeker") {
                    history.push('/seekerHome');
                }
                localStorage.setItem("uid", createdUser.uid)
                localStorage.setItem("bloodgroup", user.bloodGroup)
                dispatch({ type: ActionTypes.CURRENTUSER, payload: createdUser.uid })
            }).catch((error) => {
                alert(error.message)
                dispatch({ type: ActionTypes.CURRENTUSERERROR, payload: error.message })
            })
    }
}



export function signinAction(user) {
    return dispatch => {
        console.log('user in signin', user);
        firebase.auth().signInWithEmailAndPassword(user.email, user.password)
            .then((signedinUser) => {
                firebase.database().ref(`users/${signedinUser.uid}/`).once('value')
                    .then((userData) => {
                        console.log(userData.val().bloodGroup)
                        let data = userData.val()
                        localStorage.setItem("uid", signedinUser.uid)
                        localStorage.setItem("bloodgroup", data.bloodGroup)
                        let bloodgroup = data.bloodGroup
                        if (data.category === "donor") {
                            history.push('/donorhome');
                        }
                        if (data.category === "seeker") {
                            history.push('/seekerHome');
                        }

                        dispatch({ type: ActionTypes.CURRENTUSER, payload: signedinUser.uid })
                        dispatch({ type: ActionTypes.BLOODGROUP, payload: bloodgroup })
                    }).catch((error) => {
                        alert(error);
                        dispatch({ type: ActionTypes.SIGNINERROR, payload: error.message })
                    })
            })
            .catch((err) => {
                alert(err);
            })
    }
}


export function seekerHomeData(bloodgroup) {
    return dispatch => {
        // firebase.database().ref(`users/`).on('value', snap => {
        //     snap.val()
            // let data = snap.val()
            // var uid = (localStorage.getItem("uid"))
            firebase.database().ref(`users/`).once('value')
                .then((user) => {
                    var dataarr = []
                    var user1 = user.val()
                    for(let key in user1){
                        if(user1[key]['category'] === 'donor')
                        dataarr.push(user1[key]);                  
                    }
                    dispatch({ type: ActionTypes.SEEKERHOMEDATA, payload: dataarr })
                })
        // })
    }

}


export function donorprofile(uid) {
    return dispatch => {
        firebase.database().ref(`users/${uid}/datafordonate/`).once('value')
            .then((data) => {
                var array = []
                array.push(data.val())
                dispatch({ type: ActionTypes.DONORPROFILE, payload: array })
            })
    }
}


export function donorformdata(obj) {
    return dispatch => {
        firebase.database().ref(`users/${obj.uid}/datafordonate/`).set(obj)
    }
}


export function deletefunction(uid) {
    return dispatch => {
        console.log("chal raha hai")
        firebase.database().ref(`users/${uid}/datafordonate`).remove()
            .then(() => {
                history.push("/donorhome")
            })
    }
}



export function Logout() {
    return dispatch => {
        firebase.auth().signOut().then(function () {
            localStorage.clear()
            history.push('/')
            dispatch({ type: ActionTypes.LOGOUT, payload: '' })
        })
    }
}