import ActionTypes from '../constant/constant';

const INITIAL_STATE = {
    currentUser: '',
    currentUserError: '',
    seekerHomeData: [],
    donorHomeData: '',
    donorprofiledata: '',
    bloodgroup: '',
    signinError: ""
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {

        case ActionTypes.CURRENTUSERERROR:
            return ({
                ...state,
                currentUserError: action.payload
            })

        case ActionTypes.CURRENTUSER:
            return ({
                ...state,
                currentUser: action.payload
            })

        case ActionTypes.SEEKERHOMEDATA:
            // console.log(action.payload)
            return ({
                ...state,
                seekerHomeData: action.payload
            })

        case ActionTypes.SIGNINERROR:
            console.log(action.payload)
            return ({
                ...state,
                signinError: action.payload
            })

        case ActionTypes.LOGOUT:
            return INITIAL_STATE

        case ActionTypes.DONORHOMEDATA:
            return ({
                ...state,
                donorHomeData: action.payload
            })

        case ActionTypes.DONORPROFILE:
            return ({
                ...state,
                donorprofiledata: action.payload
            })

        case ActionTypes.BLOODGROUP:
            return ({
                ...state,
                bloodgroup: action.payload
            })

        default:
            return state;
    }

}