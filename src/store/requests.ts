import { AnyAction, ThunkDispatch, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { IAddEvent, IAuth, IEvent } from 'src/interface';

export const getEventsNextAPI = createAsyncThunk(
  'eventsNext/getEventsNextAPI',
  async (_, {rejectWithValue}) => {
    try {
      const response = await axios.put('http://localhost:8080/events/next');
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message)
    }
  }
)
export const getEventsPastAPI = createAsyncThunk(
  'eventsPast/getEventsPastAPI',
  async (_, {rejectWithValue}) => {
    try {
      const response = await axios.put('http://localhost:8080/events/past30days');
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message)
    }
  }
)
export const checkAuthAPI = createAsyncThunk(
  'admin_name/checkAuthAPI',
  async (obj: IAuth, {rejectWithValue}) => {
    try {
      const response = await fetch(`http://localhost:8080/admin/auth`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(obj)
      })
      if (!response.ok) throw new Error();
      const data = await response.json();
      const name = data.name;
      console.log(name);
      return name;
    } catch (error: any) {
      return rejectWithValue(error.message)
    }
  }
)
export const addEventAPI = createAsyncThunk(
  'eventsNext/addEventAPI',
  async (obj: IAddEvent, {dispatch, rejectWithValue}) => {
    try {
      const response = await fetch(`http://localhost:8080/events/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(obj)
      })
      if (!response.ok) throw new Error();
      const data = await response.json();
      console.log(data)
      dispatch(getEventsNextAPI());
    } catch (error: any) {
      return rejectWithValue(error.message)
    }
  }
)
export const updateEventAPI = createAsyncThunk(
  'eventsNext/updateEventAPI',
  async (obj: IEvent, {dispatch, rejectWithValue}) => {
    try {
      console.log(obj)
      const response = await fetch(`http://localhost:8080/events/update?id=${obj.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(obj)
      })
      if (!response.ok) throw new Error();
      const data = await response.json();
      console.log(data)
      if (data) {
        dispatch(getEventsNextAPI());
        dispatch(getEventsPastAPI());
      }
    } catch (error: any) {
      return rejectWithValue(error.message)
    }
  }
)
export const deleteEventAPI = createAsyncThunk(
  'eventsNext/updateEventAPI',
  async (id: number, {dispatch, rejectWithValue}) => {
    try {
      const response = await fetch(`http://localhost:8080/events/delete?id=${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        }
      })
      if (!response.ok) throw new Error();
      const data = await response.json();
      console.log(data)
      if (data) {
        dispatch(getEventsNextAPI());
        dispatch(getEventsPastAPI());
      }
    } catch (error: any) {
      return rejectWithValue(error.message)
    }
  }
)
export const setReceiverEmailAPI = createAsyncThunk(
  'user/setReceiverEmailAPI',
  async (email: string, {rejectWithValue}) => {
    try {
      const response = await fetch(`http://localhost:8080/receiver/new`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({email})
      })
      if (!response.ok) throw new Error();
      const data = await response.json();
      console.log(data)
    } catch (error: any) {
      return rejectWithValue(error.message)
    }
  }
)
export const sendMembersAPI = createAsyncThunk(
  'user/setReceiverEmailAPI',
  async ({ members, id }: { members: string[], id: number }, {rejectWithValue}) => {
    try {
      const response = await fetch(`http://localhost:8080/participants/add?id=${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({members})
      })
      if (!response.ok) throw new Error();
      const data = await response.json();
      console.log(data)
    } catch (error: any) {
      return rejectWithValue(error.message)
    }
  }
)