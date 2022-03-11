import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../app/store';
import axios from 'axios';

const baseURI = process.env.REACT_APP_API_URL|| '';

export interface TableState extends Record<string, unknown> {
  data: Array<{}>,
  status: 'idle' | 'loading' | 'failed';
  filteredInfo?: Record<string,string[] | unknown>,
  sortedInfo?: Record<string, string>
}
/**
 * Control filters and sorters by filteredValue and sortOrder.
 * Defining filteredValue or sortOrder means that it is in the controlled mode.
 * Make sure sortOrder is assigned for only one column.
 * column.key is required.
 */
const initialState: TableState = {
  data: [],
  filteredInfo: {
    username: [''],
    gender: ['']
  },
  sortedInfo: {
    order: '',
    columnKey: '',
  },
  status: 'idle'
};

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(fetchAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.
export const fetchAsync = createAsyncThunk(
  'table/fetchData',
  async (page: number) => {
    console.log('async trigger', baseURI)
    const response = await axios.get(baseURI, {
      params: {
        page: page,
        results: 10
      }
    });
    console.log('async done', response)
    // The value we return becomes the `fulfilled` action payload
    const dataTable = response.data.results.map((val, _) => ({
      key: val.login.uuid,
      username: val.login.username,
      name: val.name.first + ' ' + val.name.last,
      email: val.email,
      gender: val.gender,
      registeredDate: val.registered.date.substring(0, 10) + ' ' + val.registered.date.substring(11, 16),
     }))
     console.log('async return data', dataTable)
    return dataTable;
  }
);

export const tableSlice = createSlice({
  name: 'table',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    reset: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.filteredInfo = initialState.filteredInfo
      state.sortedInfo = initialState.sortedInfo
    },
    sort: (state, action) => {
      state.sortedInfo = action.payload;
    },
    // Use the PayloadAction type to declare the contents of `action.payload`
    search: (state, action) => {
      if (action.payload.gender) {
      state.filteredInfo = {
        gender: action.payload.gender,
        username:  state.filteredInfo?.username
      }
    } else {
      state.filteredInfo = {
        gender: state.filteredInfo?.gender,
        username:  action.payload.username
      }
    }
      console.log(action)
    },
  },
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  extraReducers: (builder) => {
    builder
      .addCase(fetchAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        // @ts-ignore
        state.data = action.payload
      });
  },
});

export const { reset, sort, search } = tableSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.table.value)`
export const selectTable = (state: RootState) => state.table;

// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.
export const searchData = (query: string): AppThunk => (
  dispatch,
  // getState
) => {
  // const currentValue = selectTable(getState());
  if (query !== '') {
    dispatch(search(query));
  }
};

export default tableSlice.reducer;
