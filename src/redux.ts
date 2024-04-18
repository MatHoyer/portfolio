import { configureStore, createSlice } from '@reduxjs/toolkit';

const initialState: { repos: Repository[] } = {
    repos: [],
};

const ReposSlice = createSlice({
    name: 'repos',
    initialState,
    reducers: {
        setRepos: (state, action: { type: string; payload: Repository[] }) => {
            state.repos = action.payload;
        },
    },
});

export const { setRepos } = ReposSlice.actions;

export const store = configureStore({
    reducer: {
        repos: ReposSlice.reducer,
    },
});
