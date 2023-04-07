import {useSelector, useDispatch} from "react-redux";
import {useState} from "react";
import {handleNewsChange, closeModal, updateNews} from "../features/news/newsSlice";
import {TextInput} from './index';

const Form = () => {
    const [isError, setIsError] = useState(false);
    const {isFormVisible, newsId, url, title, summary} = useSelector((state) => state.news);
    const dispatch = useDispatch();

    const handleModalClick = (e) => {
        if (e.target.classList.contains('modal')) {
            dispatch(closeModal());
        }
    }

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        dispatch(handleNewsChange({name, value}));
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (title.length < 1 || summary.length < 1) {
            setIsError(true);
            return;
        }

        setIsError(false);
        dispatch(updateNews({newsId, title, url, summary}));
    }

    return (
        <div className={isFormVisible ? 'modal show-modal' : 'modal'} onClick={handleModalClick}>
            <form className='form'>
                <h2>Edit News</h2>
                {isError && <h3 className='error'>Please fill in all fields</h3>}

                <TextInput name='title' value={title} handleChange={handleChange}/>
                <TextInput name='summary' value={summary} handleChange={handleChange}/>

                <button type='submit' className='btn-submit' onClick={handleSubmit}>Submit</button>
            </form>
        </div>
    );
};

export default Form;