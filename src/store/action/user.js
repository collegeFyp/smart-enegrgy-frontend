import * as apiList from '../apiList';
import * as actionTypes from "../action/actionType"
import axios from 'axios';

export const fetchUserStart = () => {
    return {
        type: actionTypes.FETCH_USER_START
    }
}

export const fetchUserSuccess = ( users ) => {
    return {
        type: actionTypes.FETCH_USER_SUCCESS,
        users:users
    }
}

export const fetchUserFail = ( err ) => {
    return {
        type: actionTypes.FETCH_USER_FAIL,
        err: err
    }
} 


export const fetchUser = (token ) => {
    return dispatch => {
        dispatch(fetchUserStart())
        axios( {
            method: "get",
            url: apiList.getUser,
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Barer " + token
            }

        } )
            .then( response => {
            console.log(response.data)
            dispatch( fetchUserSuccess( response.data ) );
        } )
            .catch( err => {
                console.log( err );
                dispatch(fetchUserFail(err))
            
        })
    }
}