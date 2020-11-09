import { USER_LOGOUT, USER_SIGNIN_FAIL, USER_SIGNIN_REQUEST, USER_SIGNIN_SUCCESS } from "../constants/userConstants";

export const userSignInReducer = (state={},action) =>{
    switch(action.type){
        case USER_SIGNIN_REQUEST :
            return {...state,loading:true};
        case USER_SIGNIN_SUCCESS : 
            return {...state, loading:false,userInfo:action.payload}
        case USER_SIGNIN_FAIL :
            return {...state,loading:false,error:action.payload};
        case USER_LOGOUT :
            return {};
        default: return {...state};
    }
}