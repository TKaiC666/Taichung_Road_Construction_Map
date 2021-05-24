import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import '../node_modules/@fortawesome/fontawesome-free/css/all.css';

//step 1 : 取出useState from React
const {useState} = React;

const UnitControl = ()=>{
    const s_unitMbit = 'Mbps';
    const s_unitMByte = 'MB/s';

    return(
        <div className='unit-control'>
            <div className='unit'>{s_unitMbit}</div>
            <span className='exchange-icon fa-fw fa-stack'>
                <i className='far fa-circle fa-stack-2x'/>
                <i className='fas fa-exchange-alt fa-stack-1x'/>
            </span>
            <div className='unit'>{s_unitMByte}</div>
        </div>
    );
}

const CardFooter = (props)=>{
    let { inputValue } = props;
    let criteria;

    if(!inputValue){
        criteria = {
            title : '---',
            backgroundColor : '#d3d8e2',
        };
    }else if(inputValue < 15){
        criteria = {
            title : 'SLOW',
            backgroundColor : '#ee362d',
        };
    }else if(inputValue < 40){
        criteria = {
            title : 'GOOD',
            backgroundColor : '#1b82f1',
        };
    }else if(inputValue >= 40){
        criteria = {
            title : 'FAST',
            backgroundColor : '#13d569',
        };
    }

    return(
        <div className='card-footer'
        style={{backgroundColor: criteria.backgroundColor}}>
            {criteria.title}
        </div>
    );
}

const SpeedConverter = ()=>{
    //step 2 : 定義state以及取出修改state的function
    //state命名為inputValue並設初值為0，function命名為setInputValue
    const [inputValue, setInputValue] = useState(0);

    const hanldeInputChange = (e)=>{
        const {value} = e.target;
        setInputValue(value);
    }

    const s_headerString = 'Network Speed Converter';

    return(
        <div className='container'>
            <div className='card-header'>{s_headerString}</div>
            <div className='card-body'>
                <UnitControl/>
                <div className='converter'>
                    <div className='flex-1'>
                        <div className='converter-title'>Set</div>
                        {/*⚠取得使用者輸入的內容*/ }
                        <input type='number' className='input-number' min='0' max='99999' value={inputValue} onChange={hanldeInputChange}/>
                    </div>
                    <span className='angle-icon fa-2x' style={{marginTop:'30px'}}>
                        <i className='fas fa-angle-right'/>
                    </span>
                    <div className='text-right flex-1'>
                        <div className='converter-title'>Show</div>
                        <input type='text' className='input-number text-right' disabled value={inputValue/8}/>
                    </div>
                </div>
            </div>
            <CardFooter inputValue={inputValue}/>
        </div>
    );
}

ReactDOM.render(
    <SpeedConverter/>,
    document.getElementById('root')
);