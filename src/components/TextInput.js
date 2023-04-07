import React from 'react';

const TextInput = ({name, value, handleChange}) => {
    return (
        <div className='input'>
            <label htmlFor={name}>{name}</label>
            <textarea name={name} value={value} onChange={handleChange}/>
        </div>
    );
};

export default TextInput;