import { LOG_IN, REGISTER } from './../../graphql/user.grapql';
import { client } from "../../apollo-graphql";
import { LoginInput, RegisterInput } from '../../types';
import axios from 'axios';
import { USER_REGISTER, USER_LOGIN } from '../../services/auth/auth.service';

export const UPDATE_USER = "UPDATE_USER";
export const UPDATE_USER_TOKEN = "UPDATE_USER_TOKEN";

export const register = (credential: RegisterInput, addToast: any) => {
    return () => {
        axios.post(USER_REGISTER.url, credential, {
            headers: {
                'Content-Type': 'application/json',
                'X-Requested-With': 'XMLHttpRequest'
            }
        })
        .then(response => {
            if (response.data?.username) {
                if (addToast) {
                    addToast("Register success, we just sent verify link to your mail", {
                        appearance: "success",
                        autoDismiss: true
                    })
                }
                setTimeout(() => {
                    window.location.reload()
                }, 1500)
            }
            else {
                if (addToast) {
                    addToast("Register failed !", {
                        appearance: "error",
                        autoDismiss: true
                    })
                }
                setTimeout(() => {
                    window.location.reload()
                }, 1500)
            }
        })
        .catch(e => {
            if (addToast) {
                addToast("Register failed !", {
                    appearance: "error",
                    autoDismiss: true
                })
            }
            setTimeout(() => {
                window.location.reload()
            }, 1500)
        })
    }
}

export const login = (loginInput: LoginInput, addToast: any) => {
    return async (dispatch: any) => {
        await axios.post(USER_LOGIN.url, loginInput)
            .then(res => {
                if (res.data?.access_token) {
                    dispatch({
                        type: UPDATE_USER_TOKEN,
                        payload: res.data
                    })
                    addToast("Welcome to Quizlet JP, Hi", {
                        appearance: "success",
                        autoDismiss: true
                    })
                    window.location.replace("/overview")
                }
                else {
                    addToast("Credential user wrong", {
                        appearance: "error",
                        autoDismiss: true
                    })
                }
            })
            .catch(e => {
                addToast("Credential user wrong", {
                    appearance: "error",
                    autoDismiss: true
                })
            })
    }
}

//tu phan nay la graph
export const userLogin = (credential: any, addToast: any) => {
    return async (dispatch: any) => {
        try {
            const response = await client.mutate({
                mutation: LOG_IN,
                variables: {
                    input: credential,
                }
            })
            if (response?.data?.login) {
                dispatch({
                    type: UPDATE_USER_TOKEN,
                    payload: response.data.login
                })
                if (addToast) {
                    addToast("Welcome to Quizlet JP, Hi", {
                        appearance: "success",
                        autoDismiss: true
                    })
                }
                window.location.replace("/overview")
            }
        }
        catch(e) {
            if(addToast) {
                addToast(e.message || e, {
                    appearance: "error",
                    autoDismiss: true
                })
            }
        }
    }
}

export const userRegister = (credential: any, addToast: any) => {
    return async (dispatch: any) => {
        try {
            const response = await client.mutate({
                mutation: REGISTER,
                variables:{
                    input: credential
                }
            })
            if (response?.data?.register) {
                dispatch({
                    type: UPDATE_USER_TOKEN,
                    payload: response.data.register
                })
                if (addToast) {
                    addToast("Welcome to Quizlet JP", {
                        appearance: "success",
                        autoDismiss: true
                    })
                }
                window.location.replace("/overview")
            }
        }
        catch(e) {
            console.log(e)
            if(addToast) {
                addToast(e.message || e, {
                    appearance: "error",
                    autoDismiss: true
                })
            }
        }
    }
}