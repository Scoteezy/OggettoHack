import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

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
<<<<<<< HEAD
=======


>>>>>>> 156c9caa1bf56cd336cd81b6e2be03eb23a4b3a1
                body: JSON.stringify({login:login,password: password })
            })

            if(!response.ok){
                throw new Error('Server Error!');
            }

            const data = await response.json();
            
            if(data.status=='200'){
                const response = await fetch(`/api/user/profile`, {
                    method: 'GET',
                    credentials: "include",
                });

                if(!response.ok){
                    throw new Error('Server Error!');
                }

                const data = await response.json();
                
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
                credentials: "include",
                body: JSON.stringify({login:login,password: password,first_name:name, last_name:surname })
            })

            if(!response.ok){
                throw new Error('Server Error!');
            }

            const data = await response.json();

            if(data.status=='201'){
                const response = await fetch(`/api/user/profile`, {
                    method: 'GET',
                    credentials: "include",
                });

                if(!response.ok){
                    throw new Error('Server Error!');
                }

                const data = await response.json();
                
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