import { createSlice } from '@reduxjs/toolkit'

export interface NavbarState {
  isExpanded: boolean
  activeTab?: string
  videos: []
  search: string
  query: string
  error?: string
}

const initialState: NavbarState = {
  isExpanded: false,
  activeTab: '',
  videos: [],
  search: '',
  query: '',
  error: '',
}

interface IPayload {
  payload: { isExpanded: boolean; activeTab: string }
}

interface IErrorPayload {
  payload: { error: string }
}

interface ISearchPayload {
  payload: { search: string }
}

interface IQueryPayload {
  payload: { query: string }
}

const navbarSlice = createSlice({
  name: 'navbar',
  initialState,
  reducers: {
    extended(state: NavbarState, action: IPayload) {
      state.isExpanded = action.payload.isExpanded
      state.activeTab = action.payload.activeTab
    },
    setError(state: NavbarState, action: IErrorPayload) {
      state.error = action.payload.error
    },
    searchString(state: NavbarState, action: ISearchPayload) {
      state.search = action.payload.search
    },
    queryString(state: NavbarState, action: IQueryPayload) {
      state.query = action.payload.query
    },
  },
})

// Export the actions generated by the Slice
export const { extended, setError, searchString, queryString } =
  navbarSlice.actions

// Export the reducer
export default navbarSlice.reducer
