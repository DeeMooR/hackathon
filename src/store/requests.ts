import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';
import { IAuth } from 'src/interface';

interface ErrorResponse {
  message: string;
}

export const getEventsNextAPI = createAsyncThunk(
  'eventsNext/getEventsNextAPI',
  async (_, {rejectWithValue}) => {
    try {
      const response = await axios.get('http://localhost:8080/events/next');
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
      const response = await axios.get('http://localhost:8080/events/past30days');
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
      // const response = await axios.post('http://localhost:8080/admin/auth', {
      //   headers: {
      //     'Content-Type': 'application/json',
      //     'Content-Length': '*'
      //   },
      //   body: JSON.stringify(obj)
      // });

      const response = await fetch(`http://localhost:8080/admin/auth`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(obj)
      })

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const responseData = await response.json();
      console.log(responseData);
      return responseData;
    } catch (error: any) {
      return rejectWithValue(error.message)
    }
  }
)

// export const checkAuthAPI = createAsyncThunk(
//   'admin_name/checkAuthAPI',
//   (obj: IAuth, { rejectWithValue }) => {
//     return fetch(`http://localhost:8080/admin/auth`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(obj)
//     })
//     .then(response => {
//       console.log('2')
//       if (!response.ok) {
//         throw new Error('Network response was not ok');
//       }
//       console.log('3')
//       console.log(response.json())
//       return response.json();
//     })
//     .then(responseData => {
//       console.log('4')
//       console.log(responseData.text);
//       return responseData;
//     })
//     .catch(error => {
//       // Обрабатываем ошибки сетевого запроса или разбора ответа
//       return rejectWithValue(error.message);
//     });
//   }
// );