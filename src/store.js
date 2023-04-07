import {configureStore} from "@reduxjs/toolkit";
import newsSlice from './features/news/newsSlice';

const store = configureStore({
    reducer: {
        news: newsSlice
    }
});

export default store;