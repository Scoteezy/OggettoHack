import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_URL } from "../services";
export const setUserAuth = createAsyncThunk(
    'users/setUserAuth',
    async function ({login,password},{rejectWithValue,dispatch}){
        try{
            const response = await fetch(`/api/auth/login`,{
                method: 'POST',
                headers:{
                    'Content-Type' : 'application/json;charset=utf-8',
                
                },
                credentials: "include",


                body: JSON.stringify({login:login,password: password })
            })
            if(!response.ok){
            throw new Error('Server Error!');
            }
            const data = await response.json();
            // console.log(data.data.tokens.access)
            localStorage.setItem('AccessToken', data.data.tokens.access);
            if(data.status=='200'){
                console.log({headers:{
                    'access': localStorage.getItem('AccessToken')
                }})
                const response = await fetch(`/api/user/profile`,{
                    headers:{
                        'access': localStorage.getItem('AccessToken')
                    }
                });
                if(!response.ok){
                    throw new Error('Server Error!');
                }
                const data = await response.json();
                console.log(data.data.user)
                dispatch(setAuth(data.data.user))
            }
        }
        catch(error){
            return rejectWithValue(error.message);
        }
        
    }
)
export const registerUser = createAsyncThunk(
    'users/registerUser',
    async function ({login,password,name,surname},{rejectWithValue,dispatch}){
        try{
            const response = await fetch(`/api/auth/signup`,{
                method: 'POST',
                headers:{
                    'Content-Type' : 'application/json;charset=utf-8',
                },


                body: JSON.stringify({login:login,password: password,first_name:name, last_name:surname })
            })
            if(!response.ok){
            throw new Error('Server Error!');
            }
            const data = await response.json();
            // console.log(data.data.tokens.access)
            localStorage.setItem('AccessToken', data.data.tokens.access);
            if(data.status=='201'){
                console.log({headers:{
                    'access': localStorage.getItem('AccessToken')
                }})
                const response = await fetch(`/api/user/profile`,{
                    headers:{
                        'access': localStorage.getItem('AccessToken')
                    }
                });
                if(!response.ok){
                    throw new Error('Server Error!');
                }
                const data = await response.json();
                console.log(data.data.user)
                dispatch(setAuth(data.data.user))
            }
        }
        catch(error){
            return rejectWithValue(error.message);
        }

    }

    )
const setError = (state,action)=>{
    state.status = 'rejected';
    state.error = action.payload
  }
  const initialState = {
    auth: false, //TYT
    userInfo:{},
    status: null,
    error:null
}
const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
        setAuth(state,action){
            state.auth = true; 
            state.userInfo = action.payload
        },
        logoutUser(state){
            state.auth= false; 
            state.userInfo= {};
        }
	},
    extraReducers: {
        [setUserAuth.pending]:(state)=>{
            state.status = 'loading';
            state.error = null;
        },
        [setUserAuth.rejected]:setError,
        [registerUser.pending]:(state)=>{
            state.status = 'loading';
            state.error = null;
        },
        [registerUser.rejected]:setError,
    }
	
});
export const {setAuth,logoutUser} = authSlice.actions;
export default authSlice.reducer;