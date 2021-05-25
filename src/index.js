import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import '../node_modules/@fortawesome/fontawesome-free/css/all.css';

const Card = (props)=>{
    let data = props.value;
    let constructDate = {
        beginYear: '',
        beginMonth : '',
        beginDay : '',
        endYear : '',
        endMonth : '',
        endDay : ''      
    };
    let personInCharge = '';

    const [showLess, setShowLess] = useState(true);
    const handleClick = ()=>{
        setShowLess(!showLess);
    }

    function preProcessData(){
        constructDate.beginYear = data['核准起日'].substring(0,3);
        constructDate.beginMonth = data['核准起日'].substring(3,5);
        constructDate.beginDay = data['核准起日'].substring(5);
        constructDate.endYear = data['核准迄日'].substring(0,3);
        constructDate.endMonth = data['核准迄日'].substring(3,5);
        constructDate.endDay = data['核准迄日'].substring(5);
        personInCharge = data['承辦人'].substring(0,1);
        personInCharge += '◯◯';
    }

    if(data === 'loading'){
        return(
            <div className='card loading'>
                <div>Loading...</div>
            </div>);
    }else{
        preProcessData();
    }

    return(
        <div className='card'>
            <div className='card-title'>
                <div className='card-type color_orange'>{data['管線工程類別']}</div><div className='card-location color_orange-light'>{data['案件類別']}</div>
            </div>
            <div className='card-body'>
                <div className='card-body-basicInfo'>
                    <div>
                        <span className='slash'>{constructDate.beginYear}</span><span className='slash'>{constructDate.beginMonth}</span><span>{constructDate.endMonth}</span><i className="fas fa-caret-right fa-2x"></i><span className='slash'>{constructDate.endYear}</span><span className='slash'>{constructDate.endMonth}</span><span>{constructDate.endDay}</span>
                    </div>
                    <p>{data['區域名稱']+data['地點']}</p>
                    <p>{data['工程名稱']}</p>
                </div>
                <div className={`${showLess && 'noneDisplay'} horiLine`}/>
                <table className={`${showLess && 'noneDisplay'} card-body-detailInfo`}>
                    <tr>
                        <td className='heading'>申請書編號</td><td>{data['申請書編號']}</td>
                    </tr>
                    <tr>
                        <td className='heading'>許可證編號</td><td>{data['許可證編號']}</td>
                    </tr>
                    <tr>
                        <td className='heading'>申請單位</td><td>{data['申請單位']}</td>
                    </tr>
                    <tr>
                        <td className='heading' rowSpan={2} valign={'top'}>廠商</td><td>{data['廠商名稱']}</td>
                    </tr>
                    <tr className='clear-gap'>
                        <td>{data['廠商電話']}</td>
                    </tr>
                    <tr>
                        <td className='heading' rowSpan={2} valign={'top'}>承辦人</td><td>{personInCharge}</td>
                    </tr>
                    <tr className='clear-gap'>
                        <td>{data['承辦人電話']}</td>
                    </tr>
                </table>
                <i className={`fas ${showLess ? 'fa-chevron-circle-down' : 'fa-chevron-circle-up'} scrollDetailInfo`} onClick={()=>{handleClick()}}></i>
            </div>
        </div>
    );
}

const CardList = (props)=>{
    //CardList有三種狀態:
    //Loading, Success, Fail
    if(props.value.length === 0){
        //Loading
        return(
            <div className='cardList'>
                <Card value={'loading'}/>
                <Card value={'loading'}/>
                <Card value={'loading'}/>
            </div>
        );
    }
    else{
        //Success
        const cards =  Array.from({length: props.value.length},(_,index) => index);
        return(
            <div className='cardList'>
                {
                    cards.map((index)=>(
                        <Card key={index} value={props.value[index]}/>
                    ))
                }
                <div className='pageBtns'>
                    <div>1</div>
                    <div>2</div>
                    <div>3</div>
                    <div>...</div>
                    <div>{Math.ceil(props.value.length / 10)}</div>
                </div>
            </div>
        );
    }
}

const App = ()=>{
    const [data,setLocationDatas] = useState([]);

    const pickWorkingProject = (data)=>{
        let _data = data;
        let newData = [];
        console.log('pick working project ' + _data.length);
        for(let i = 0; i < _data.length; i++){
            if(_data[i]['是否開工'] === '是'){
                newData.push(_data[i]);
            }
        }
        setLocationDatas(newData);
        
        sliceData(newData);
    }

    const sliceData = (data)=>{
        let _data = data;
        let newData = [];
        console.log('slice data');
        for(let i = 0; i < _data.length; i+=10){
            newData.push(_data.slice(i,i+10));
        }
        console.log(newData);
    }

    const fetchData = ()=>{
        let url = 'https://datacenter.taichung.gov.tw/swagger/OpenData/863064b3-7678-437e-9161-8dcda3d95ab7';

        fetch(url)
        .then((response) => response.json())
        .then((data)=>{
            console.log('Fetch data');
            setLocationDatas(data);
            pickWorkingProject(data);
        });
    }

    useEffect(()=>{
        fetchData();
    },[]);

    return(
        <CardList value={data}/>
    );
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
);