import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const { useState } = React;

const Counter = ()=> {
    const [count, setCount] = useState(5);
    const handleClick = (type) => () => {
        if(type === 'increment'){
            setCount(count + 1);
        }
        if(type === 'decrement'){
            setCount(count - 1);
        }
    };
    return(
        <div className='container'>
            {console.log('render', count)}
            <div className={`chevron chevron-up ${count >= 10 && 'visibility-hidden'}`} onClick={handleClick('increment')}/>
            <div className='number'>{count}</div>
            <div className={`chevron chevron-down ${count <= 0 && 'visibility-hidden'}`} onClick={handleClick('decrement')}/>
        </div>
    );
}

const counters = Array.from({length: 20},(_,index) => index);

ReactDOM.render(
    <div
     style={{
         display: 'flex',
         flexWrap: 'wrap',
     }}>
        {counters.map((item) => (
            <Counter/>
        ))}
    </div>,
    document.getElementById('root')
);