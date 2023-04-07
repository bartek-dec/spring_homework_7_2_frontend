import axios from "axios";
import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";

const url = 'http://localhost:8080/news';

const initialState = {
    isLoading: false,
    news: [],
    msg: '',
    isFormVisible: false,
    newsId: '',
    title: '',
    url: '',
    summary: ''
}

export const getNews = createAsyncThunk('getNews', async (_, thunkApi) => {
    try {
        const {data} = await axios.get(url);
        return data;
    } catch (error) {
        return thunkApi.rejectWithValue('Not found')
    }
});

export const updateNews = createAsyncThunk('updateNews', async (payload, thunkApi) => {
    try {
        await axios.put(url, payload);
        thunkApi.dispatch(getNews());
    } catch (error) {
        return thunkApi.rejectWithValue(error.msg);
    }
});

export const deleteNews = createAsyncThunk('deleteNews', async (id, thunkApi) => {
    try {
        await axios.delete(`${url}/${id}`);
        thunkApi.dispatch(getNews());
    } catch (error) {
        return thunkApi.rejectWithValue(error.msg);
    }
});

const newsSlice = createSlice({
    name: 'newsSlice',
    initialState,
    reducers: {
        handleNewsChange: (state, action) => {
            const {name, value} = action.payload;
            state[name] = value;
        },
        editNews: (state, action) => {
            const {newsId, title, url, summary} = action.payload;
            state.newsId = newsId;
            state.title = title;
            state.url = url;
            state.summary = summary;
        },
        openModal: (state) => {
            state.isFormVisible = true;
        },
        closeModal: (state) => {
            state.newsId = '';
            state.title = '';
            state.url = '';
            state.summary = '';
            state.isFormVisible = false;
        }
    },
    extraReducers: builder => {
        builder.addCase(getNews.pending, (state) => {
            state.isLoading = true;
            state.msg = '';
        }).addCase(getNews.fulfilled, (state, action) => {
            state.isLoading = false;
            state.news = action.payload;
        }).addCase(getNews.rejected, (state, action) => {
            state.isLoading = false;
            state.msg = action.payload;
        }).addCase(deleteNews.pending, (state) => {
            state.isLoading = true;
            state.msg = '';
        }).addCase(deleteNews.fulfilled, (state) => {
            state.isLoading = false;
        }).addCase(deleteNews.rejected, (state, action) => {
            state.isLoading = false;
            state.msg = action.payload;
        }).addCase(updateNews.pending, (state) => {
            state.isLoading = true;
            state.msg = '';
        }).addCase(updateNews.fulfilled, (state) => {
            state.isLoading = true;
            state.newsId = '';
            state.title = '';
            state.url = '';
            state.summary = '';
            state.isFormVisible = false;
        }).addCase(updateNews.rejected, (state, action) => {
            state.isLoading = true;
            state.newsId = '';
            state.title = '';
            state.url = '';
            state.summary = '';
            state.isFormVisible = false;
            state.msg = action.payload;
        })
    }
});

export default newsSlice.reducer;

export const {handleNewsChange, editNews, openModal, closeModal} = newsSlice.actions;