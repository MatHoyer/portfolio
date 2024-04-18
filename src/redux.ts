import { configureStore, createSlice } from '@reduxjs/toolkit';

// Repos save
const initialStateRepos: { repos: Repository[] } = {
  repos: [],
};

const ReposSlice = createSlice({
  name: 'repos',
  initialState: initialStateRepos,
  reducers: {
    setRepos: (state, action: { type: string; payload: Repository[] }) => {
      state.repos = action.payload;
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
