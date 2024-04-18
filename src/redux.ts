import { configureStore, createSlice } from '@reduxjs/toolkit';

const ReposSlice = createSlice({
  name: 'repos',
  initialState: {
    email: '',
    company: '',
    location: '',
    contributionsCollection: {
      totalCommitContributions: 0,
    },
    totalRepos: 0,
    repositories: [],
  } as GlobalData,
  reducers: {
    setRepos: (state, action: { type: string; payload: GlobalData }) => {
      Object.assign(state, action.payload);
    },
  },
});

export const { setRepos } = ReposSlice.actions;

// scroll memory
const initialStateScroll: { scroll: number } = {
  scroll: 0,
};

const scrollSlice = createSlice({
  name: 'scroll',
  initialState: initialStateScroll,
  reducers: {
    setScroll: (state, action: { type: string; payload: number }) => {
      state.scroll = action.payload;
    },
  },
});

export const { setScroll } = scrollSlice.actions;

// Store
export const store = configureStore({
  reducer: {
    repos: ReposSlice.reducer,
    scroll: scrollSlice.reducer,
  },
});
