import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';

export const fetchAllEvents = createAsyncThunk(
    'events/fetchEvents',
    async function (_,{rejectWithValue}){
        try{
            const response = await fetch(`/api/meetups`,{
                method: "GET",
                credentials: "include"
            });

            if(!response.ok){
                throw new Error('Server Error!');
            }

            const data = await response.json();

            return data.data.meetups;
        }
        catch(error){
            return rejectWithValue(error.message);
        }
        
    }
)

export const addNewEvent = createAsyncThunk(
    'users/addNewEvent',

    async function(title, {rejectWithValue, dispatch}){
        try{
            const response = await fetch(`/api/meetup/create`,{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                },
                credentials: "include",
                body: JSON.stringify({
                    title: title
                })
            })

            if(!response.ok){
                throw new Error('Cannot add task. Server Error!');
            }
           
            const data = await response.json();

            dispatch(addEvent(data.data.meetup))
        }
        catch(error){
            return rejectWithValue(error.message)
        }
    } 
)
 
export const deleteEvent = createAsyncThunk(
    'events/deleteEvent',
    async function(event,{rejectWithValue,dispatch}){
        try {
            const response = await fetch(`/api/meetup/${event.id}/delete`,{
                method: 'DELETE',
                credentials: "include"
            })

            if (!response.ok){
                throw new Error('Cannot delete task. Server Error!');
            }

            dispatch(deleteMeet(event))
        }
        catch(error){
            return rejectWithValue(error.message)
        }
    }
)

export const changeEvent = createAsyncThunk(
    'events/changeEvent',
    async function(event,{rejectWithValue,dispatch}){
        try {
            console.log(event)
            const response = await fetch(`/api/meetup/${event.id}/update`,{
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(event)
            })

            if (!response.ok){
                throw new Error('Cannot delete task. Server Error!');
            }

            dispatch(changeMeet(event))
        }
        catch(error){
            return rejectWithValue(error.message)
        }
    }
)

const setError = (state,action)=>{
    state.status = 'rejected';
    state.error = action.payload
  }
const eventSlice = createSlice({
	name: 'events', // название слайса
	initialState: { 
        events: [
            
            ],
        status: null,
        error:null
},
	reducers: {
        addEvent(state,action){
            state.events.push(action.payload);
        },
        changeMeet(state,action){
            console.log(action.payload);
            const index = state.events.findIndex(item=>item.id === action.payload.id);
            if(index!== -1){
                state.events[index]=action.payload
            }
        },
        deleteMeet(state, action) {
            state.events = state.events.filter((event) => event.id != action.payload.id)
        }
	},
    extraReducers: {
        [fetchAllEvents.pending]:(state)=>{
            state.status = 'loading';
            state.error = null;
        },
        [fetchAllEvents.fulfilled]:(state,action)=>{
            state.status = 'resolved';
            state.events = action.payload;
        },

        [changeEvent.rejected]:setError,
        [fetchAllEvents.rejected]:setError,
        [addNewEvent.rejected]:setError
    }
	
});
export const {addEvent,changeMeet, deleteMeet} = eventSlice.actions;
export default eventSlice.reducer;