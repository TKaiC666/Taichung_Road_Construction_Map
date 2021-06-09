import React, { useState } from 'react';

const Card = (props)=>{
    let data = props.value;
    let personInCharge = '';

    const [showLess, setShowLess] = useState(true);
    const handleClick = ()=>{
        setShowLess(!showLess);
    }

    const handleLocationData = (lat, lng, polygon)=>{
        props.setConstructionLocation({lat : lat, lng : lng});
        props.setConstructionPolygon(polygon);
    }

    if(data === 'loading'){
        return(
            <div className='card loading'>
                <div>Loading...</div>
            </div>);
    }

    return(
        <div className='card' title='Card'>
            <div className='card-title'>
                <div className='card-type bgColor_orange'>{data.pipeType}</div><div className='card-location bgColor_orange-light'>{data.constructionType}</div>
            </div>
            <div className='card-body'>
                <div className='card-body-basicInfo'>
                    <div className='date'>
                        <span className='slash'>{data.date.start.year}</span><span className='slash'>{data.date.start.month}</span><span>{data.date.start.day}</span><i className="fas fa-caret-right fa-lg"></i><span className='slash'>{data.date.end.year}</span><span className='slash'>{data.date.end.month}</span><span>{data.date.end.day}</span>
                    </div>
                    <p>{data.location.distriction + data.location.address}</p>
                    <p>{data.title}</p>
                </div>
                <div className='showInfoOnMap' onClick={()=>{handleLocationData(data.coordinate.lat, data.coordinate.lng, data.coordinate.polygon)}}>
                    <span>在地圖上顯示</span>
                </div>
                <div className='scrollDetailInfo' onClick={()=>{handleClick()}}>
                    <i className={`fas ${showLess ? 'fa-angle-double-down' : 'fa-angle-double-up'}`}/><span>{showLess ? '更多資訊' : '收合資訊'}</span>
                </div>
                <div className={`${showLess && 'noneDisplay'} horiLine`}/>
                <table className={`${showLess && 'noneDisplay'} card-body-detailInfo`}>
                    <tbody>
                    <tr>
                        <td className='heading'>申請書編號</td><td>{data.applicationNumber}</td>
                    </tr>
                    <tr>
                        <td className='heading'>許可證編號</td><td>{data.licenseNumber}</td>
                    </tr>
                    <tr>
                        <td className='heading'>申請單位</td><td>{data.applicant}</td>
                    </tr>
                    <tr>
                        <td className='heading' rowSpan={2} valign={'top'}>廠商</td><td>{data.contractor.name}</td>
                    </tr>
                    <tr className='clear-gap'>
                        <td>{data.contractor.phone}</td>
                    </tr>
                    <tr>
                        <td className='heading' rowSpan={2} valign={'top'}>承辦人</td><td>{data.personInCharge.name}</td>
                    </tr>
                    <tr className='clear-gap'>
                        <td>{data.personInCharge.phone}</td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}

const PageButtons = (props)=>{
    //必須變數from Card list，依賴Card list
    //不能用[]
    const {margin ,pageBtns, currentPageIndex} = props;
    //PageButtons有自己的handleClick，變數名稱有衝突
    //另外用一個變數儲存從CardList傳來的handleClick，而不解構賦值
    const handleBtnClick = props.handleClick;
    let returnElement;
    let minPageIndex = 0, maxPageIndex = pageBtns.length - 1;

    if(pageBtns.length > 7){
        if(currentPageIndex - minPageIndex > 3 && maxPageIndex - currentPageIndex > 3){
            let pages = Array.from({length:3},(_,index)=>index+currentPageIndex-1);
            returnElement = 
            <div className={`pagination ${margin}`}>
                <a  className='pageBtn' key={`prePage`} href={'#listTop'}
                    onClick={()=>{handleBtnClick(currentPageIndex-1)}}>
                    <i className="fas fa-chevron-left"/>
                </a>
                <a  key={'page-'+minPageIndex+1} href={'#listTop'}
                    onClick={()=>{handleBtnClick(minPageIndex)}}
                    className={`pageBtn ${minPageIndex===currentPageIndex ? 'bgColor_orange' : ''}`}>
                    {minPageIndex+1}
                </a>
                <div className='pageBtn'></div>
                {
                    pages.map((i)=>(
                        <a key={'page'+(i+1)} href={'#listTop'}
                            onClick={()=>{handleBtnClick(i)}}
                            className={`pageBtn ${i===currentPageIndex ? 'bgColor_orange' : ''}`}>
                            {i+1}
                        </a>
                    ))
                }
                <div className='pageBtn'></div>
                <a key={'page-'+maxPageIndex+1} href={'#listTop'}
                    onClick={()=>{handleBtnClick(maxPageIndex)}}
                    className={`pageBtn ${maxPageIndex===currentPageIndex ? 'bgColor_orange' : ''}`}>
                    {maxPageIndex+1}
                </a>
                <a  className='pageBtn' key={`nextPage`} href={'#listTop'}
                    onClick={()=>{handleBtnClick(currentPageIndex+1)}}>
                    <i className="fas fa-chevron-right"/>
                </a>
            </div>
        }else if(currentPageIndex - minPageIndex <= 3){
            let pages = Array.from({length:5},(_,index)=>index);
            returnElement = 
            <div className={`pagination ${margin}`}>
                <a  className='pageBtn' key={`prePage`} href={'#listTop'}
                    style={currentPageIndex===minPageIndex ? {visibility: 'hidden'} : {}}
                    onClick={()=>{handleBtnClick(currentPageIndex-1)}}>
                    <i className="fas fa-chevron-left"/>
                </a>
                {
                    pages.map((i)=>(
                        <a key={'page-'+(i+1)} href={'#listTop'}
                            onClick={()=>{handleBtnClick(i)}}
                            className={`pageBtn ${i===currentPageIndex ? 'bgColor_orange' : ''}`}>
                            {i+1}
                        </a>
                    ))
                }
                <div className='pageBtn'></div>
                <a key={'page-'+maxPageIndex+1} href={'#listTop'}
                    onClick={()=>{handleBtnClick(maxPageIndex)}}
                    className={`pageBtn ${maxPageIndex===currentPageIndex ? 'bgColor_orange' : ''}`}>
                    {maxPageIndex+1}
                </a>
                <a  className='pageBtn' key={`nextPage`} href={'#listTop'}
                    onClick={()=>{handleBtnClick(currentPageIndex+1)}}>
                    <i className="fas fa-chevron-right"/>
                </a>
            </div>
        }else if(maxPageIndex - currentPageIndex <= 3){
            let pages = Array.from({length:5},(_,index)=>index+maxPageIndex-4);
            returnElement = 
            <div className={`pagination ${margin}`}>
                <a  className='pageBtn' key={`prePage`} href={'#listTop'}
                    onClick={()=>{handleBtnClick(currentPageIndex-1)}}>
                    <i className="fas fa-chevron-left"/>
                </a>
                <a key={'page-'+minPageIndex+1} href={'#listTop'}
                    onClick={()=>{handleBtnClick(minPageIndex)}}
                    className={`pageBtn ${minPageIndex===currentPageIndex ? 'bgColor_orange' : ''}`}>
                    {minPageIndex+1}
                </a>
                <div className='pageBtn'></div>
                {
                    pages.map((i)=>(
                        <a key={'page-'+(i+1)} href={'#listTop'}
                            onClick={()=>{handleBtnClick(i)}}
                            className={`pageBtn ${i===currentPageIndex ? 'bgColor_orange' : ''}`}>
                            {i+1}
                        </a>
                    ))
                }
                <a  className='pageBtn' key={`nextPage`} href={'#listTop'}
                    style={currentPageIndex===maxPageIndex ? {visibility: 'hidden'} : {}}
                    onClick={()=>{handleBtnClick(currentPageIndex+1)}}>
                    <i className="fas fa-chevron-right"/>
                </a>
            </div>
        }
    }
    else{
        returnElement = 
        <div className={`pagination ${margin}`}>
            {
                pageBtns.map((i)=>(
                    <a key={'page-'+(i+1)} href={'#listTop'}
                        onClick={()=>{handleBtnClick(i)}}
                        className={`pageBtn ${i===currentPageIndex ? 'bgColor_orange' : ''}`}>
                        {i+1}
                    </a>
                ))
            }
        </div>
    }
    return(returnElement);
}

const CardList = (props)=>{

    const [pageNum, setPageNum] = useState(0);
    const [currentPageIndex, setCurrentPageIndex] = useState(0);
    const [cardsNum, setCardsNum] = useState([0,1,2,3,4,5,6,7,8,9]);

    const handleClick = (x)=>{
        if(x > props.value.length-1 || x < 0) return;
        setPageNum(x);
        setCurrentPageIndex(x);
        setCardsNum(Array.from({length: props.value[x].length},(_,index) => index));
    }

    //CardList有三種狀態:
    //Loading, Success, Fail
    if(props.value.length === 0){
        //Loading
        return(
            <div className='cardList'>
                <p id='listTop'  className='marginBottom-3'/>
                <Card value={'loading'}/>
                <Card value={'loading'}/>
                <Card value={'loading'}/>
            </div>
        );
    }
    else{
        //Success
        let pageBtns = Array.from({length: props.value.length},(_,index)=>index);
        return(
            <div className='cardList'>
                <p id='listTop' className='marginBottom-3'/>
                <PageButtons
                    margin={'marginBottom-2'}
                    pageBtns={pageBtns}
                    currentPageIndex={currentPageIndex}
                    handleClick={handleClick}
                />
                {
                    cardsNum.map((i)=>(
                        <Card key={'card'+(pageNum*10+i+1)}
                            value={props.value[pageNum][i]}
                            setConstructionLocation={props.setConstructionLocation}
                            setConstructionPolygon = {props.setConstructionPolygon}/>
                    ))
                }
                <PageButtons
                    margin={'marginTop-3'}
                    pageBtns={pageBtns}
                    currentPageIndex={currentPageIndex}
                    handleClick={handleClick}
                />
            </div>
        );
    }
}

export default CardList;