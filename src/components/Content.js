import {useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";
import {getNews, deleteNews, editNews, openModal} from "../features/news/newsSlice";
import {Message, SingleNews, Form} from './index';

const Content = () => {
    const {news, msg} = useSelector((state) => state.news);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getNews());
        // eslint-disable-next-line
    }, []);

    const handleRemove = (id) => {
        dispatch(deleteNews(id));
    }

    const handleUpdate = (obj) => {
        dispatch(editNews(obj));
        dispatch(openModal());
    }

    return (
        <section className='content-container'>
            <Form/>
            <div className='content'>
                {msg && <Message msg={msg}/>}

                <div className='news-container'>
                    {news.map((item) => {
                        const {newsId, title, url, summary} = item;
                        return <SingleNews key={newsId} id={newsId} title={title} url={url} summary={summary}
                                           handleRemove={() => handleRemove(newsId)}
                                           handleUpdate={() => handleUpdate({newsId, title, url, summary})}/>
                    })}
                </div>
            </div>
        </section>
    );
};

export default Content;