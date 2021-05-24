import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import '../node_modules/@fortawesome/fontawesome-free/css/all.css';

const Card = (props)=>{
    let data = props.value;
    let fromDate, toDate;

    if(data === undefined){
        return(
            <div className='card loading'>
                <div>Loading...</div>
            </div>);
    }

    fromDate = data['核准起日'];
    fromDate = fromDate.substring(3);
    toDate = data['核准迄日'];
    toDate = toDate.substring(3);

    return(
        <div className='card' onClick={()=>{window.open(`https://www.google.com/maps/@${data['中心點Y坐標']},${data['中心點X坐標']},19z`,'_blank')}}>
            <div className='card-title'>
                <div className='card-type color_orange'>{data['管線工程類別']}</div><div className='card-location color_orange-light'>{data['案件類別']}</div>
            </div>
            <div className='card-body'>
                <div className='card-body-basicInfo'>
                    <div>
                        <span>{fromDate}}</span><i className="fas fa-caret-right fa-2x"></i><span>{toDate}</span>
                    </div>
                    <p>{data['區域名稱']+data['地點']}</p>
                    <p>{data['工程名稱']}</p>
                </div>
                <div className='horiLine'/>
                <table className='card-body-detailInfo'>
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
                        <td className='heading' rowSpan={2} valign={'top'}>承辦人</td><td>{data['承辦人']}</td>
                    </tr>
                    <tr className='clear-gap'>
                        <td>{data['承辦人電話']}</td>
                    </tr>
                </table>
            </div>
        </div>
    );
}

const CardList = (props)=>{
    return(
        <div className='cardList'>
            <Card value={props.value[0]}/>
            <Card value={props.value[1]}/>
            <Card value={props.value[2]}/>
            <Card value={props.value[3]}/>
            <Card value={props.value[4]}/>
            <Card value={props.value[5]}/>
            <Card value={props.value[6]}/>
            <Card value={props.value[7]}/>
            <Card value={props.value[8]}/>
            <Card value={props.value[9]}/>
        </div>
    );
}

const App = ()=>{
    const [locationDatas,setLocationDatas] = useState([]);

    const fetchData = ()=>{
        let url = 'https://datacenter.taichung.gov.tw/swagger/OpenData/863064b3-7678-437e-9161-8dcda3d95ab7';

        fetch(url)
        .then((response) => response.json())
        .then((data)=>{
            console.log('Fetch data');
            setLocationDatas(data);
        });
    }

    useEffect(()=>{
        fetchData();
    },[]);

    return(
        <div>
            <CardList value={locationDatas}/>
        </div>
    );
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
);