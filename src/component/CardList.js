import React, { useMemo, useState } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

const Card = (props)=>{
    let data = props.value;
    //let index = props.index;

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
                    <p>{data.distriction + data.address}</p>
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

const Pagination = (props)=>{
    //必須變數from Card list，依賴Card list
    //不能用[]
    const {margin ,pageBtns, pageIndex} = props;
    //PageButtons有自己的handleClick，變數名稱有衝突
    //另外用一個變數儲存從CardList傳來的handleClick，而不解構賦值
    const handleBtnClick = props.handleClick;
    let returnElement;
    let minPageIndex = 0, maxPageIndex = pageBtns.length - 1;

    if(pageBtns.length > 7){
        if(pageIndex - minPageIndex > 3 && maxPageIndex - pageIndex > 3){
            let pages = Array.from({length:3},(_,index)=>index+pageIndex-1);
            returnElement = 
            <div className={`pagination ${margin}`}>
                <a  className='pageBtn' key={`prePage`} href={'#listTop'}
                    onClick={()=>{handleBtnClick(pageIndex-1)}}>
                    <i className="fas fa-chevron-left"/>
                </a>
                <a  key={'page-'+minPageIndex+1} href={'#listTop'}
                    onClick={()=>{handleBtnClick(minPageIndex)}}
                    className={`pageBtn ${minPageIndex===pageIndex ? 'bgColor_orange' : ''}`}>
                    {minPageIndex+1}
                </a>
                <div className='pageBtn'></div>
                {
                    pages.map((i)=>(
                        <a key={'page'+(i+1)} href={'#listTop'}
                            onClick={()=>{handleBtnClick(i)}}
                            className={`pageBtn ${i===pageIndex ? 'bgColor_orange' : ''}`}>
                            {i+1}
                        </a>
                    ))
                }
                <div className='pageBtn'></div>
                <a key={'page-'+maxPageIndex+1} href={'#listTop'}
                    onClick={()=>{handleBtnClick(maxPageIndex)}}
                    className={`pageBtn ${maxPageIndex===pageIndex ? 'bgColor_orange' : ''}`}>
                    {maxPageIndex+1}
                </a>
                <a  className='pageBtn' key={`nextPage`} href={'#listTop'}
                    onClick={()=>{handleBtnClick(pageIndex+1)}}>
                    <i className="fas fa-chevron-right"/>
                </a>
            </div>
        }else if(pageIndex - minPageIndex <= 3){
            let pages = Array.from({length:5},(_,index)=>index);
            returnElement = 
            <div className={`pagination ${margin}`}>
                <a  className='pageBtn' key={`prePage`} href={'#listTop'}
                    style={pageIndex===minPageIndex ? {visibility: 'hidden'} : {}}
                    onClick={()=>{handleBtnClick(pageIndex-1)}}>
                    <i className="fas fa-chevron-left"/>
                </a>
                {
                    pages.map((i)=>(
                        <a key={'page-'+(i+1)} href={'#listTop'}
                            onClick={()=>{handleBtnClick(i)}}
                            className={`pageBtn ${i===pageIndex ? 'bgColor_orange' : ''}`}>
                            {i+1}
                        </a>
                    ))
                }
                <div className='pageBtn'></div>
                <a key={'page-'+maxPageIndex+1} href={'#listTop'}
                    onClick={()=>{handleBtnClick(maxPageIndex)}}
                    className={`pageBtn ${maxPageIndex===pageIndex ? 'bgColor_orange' : ''}`}>
                    {maxPageIndex+1}
                </a>
                <a  className='pageBtn' key={`nextPage`} href={'#listTop'}
                    onClick={()=>{handleBtnClick(pageIndex+1)}}>
                    <i className="fas fa-chevron-right"/>
                </a>
            </div>
        }else if(maxPageIndex - pageIndex <= 3){
            let pages = Array.from({length:5},(_,index)=>index+maxPageIndex-4);
            returnElement = 
            <div className={`pagination ${margin}`}>
                <a  className='pageBtn' key={`prePage`} href={'#listTop'}
                    onClick={()=>{handleBtnClick(pageIndex-1)}}>
                    <i className="fas fa-chevron-left"/>
                </a>
                <a key={'page-'+minPageIndex+1} href={'#listTop'}
                    onClick={()=>{handleBtnClick(minPageIndex)}}
                    className={`pageBtn ${minPageIndex===pageIndex ? 'bgColor_orange' : ''}`}>
                    {minPageIndex+1}
                </a>
                <div className='pageBtn'></div>
                {
                    pages.map((i)=>(
                        <a key={'page-'+(i+1)} href={'#listTop'}
                            onClick={()=>{handleBtnClick(i)}}
                            className={`pageBtn ${i===pageIndex ? 'bgColor_orange' : ''}`}>
                            {i+1}
                        </a>
                    ))
                }
                <a  className='pageBtn' key={`nextPage`} href={'#listTop'}
                    style={pageIndex===maxPageIndex ? {visibility: 'hidden'} : {}}
                    onClick={()=>{handleBtnClick(pageIndex+1)}}>
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
                        className={`pageBtn ${i===pageIndex ? 'bgColor_orange' : ''}`}>
                        {i+1}
                    </a>
                ))
            }
        </div>
    }
    return(returnElement);
}

const Selectors = (props)=>{

    const [dateRange, setDateRange] = useState([null, null]);
    const [startDate, endDate] = dateRange;
    const {options, condition, setCondition, setPageIndex}= props;

    console.log('Selectors : '+condition.distriction+'  '+condition.pipeType);
    //e.target.value的資料型別是string，testApp的searchData是用型別做判斷式。
    //判斷方式有變再改寫。
    const handleDistChange = (e)=>{
        let dist = Number(e.target.value) === 0 ? 0 : e.target.value;
        let pipe = condition.pipeType;
        let stack = condition.stack;
        if(stack.indexOf('distriction') === -1) stack.push('distriction');
        else if(dist === 0){
            while(stack.indexOf('distriction') !== -1){
                let popedConditioned = stack.pop();
                if(popedConditioned === 'pipeType'){
                    document.getElementById('pipeTypeSelects').selectedIndex = 0;
                    pipe = 0;
                }
            }
        }
        
        setPageIndex(0);
        setCondition({distriction:dist, pipeType:pipe, stack:stack});
    }

    const handlePipeChange = (e)=>{
        let dist = condition.distriction;
        let pipe = Number(e.target.value) === 0 ? 0 : e.target.value;
        let stack = condition.stack;
        if(stack.indexOf('pipeType') === -1) stack.push('pipeType');
        else if(pipe === 0){
            while(stack.indexOf('pipeType') !== -1){
                let popedConditioned = stack.pop();
                if(popedConditioned === 'distriction'){
                    document.getElementById('districtionSelects').selectedIndex = 0;
                    dist = 0;
                }
            }
        }

        setPageIndex(0);
        setCondition({distriction:dist, pipeType:pipe, stack:stack});
    }
             
    //待更新
    // if(options===null){
    //     return(
    //         <div className='selectors'>
    //             <select name='distriction'>
    //                 <option value={0}>全地區</option>
    //             </select>
    //             <select name='constructionType'>
    //                 <option value={0}>全部管線</option>
    //             </select>
    //             <DatePicker
    //                 dateFormat='yyyy/MM/dd'
    //                 selectsRange={true}
    //                 startDate={startDate}
    //                 endDate={endDate}
    //                 isClearable={true}
    //                 shouldCloseOnSelect={false}
    //                 onChange={(update)=>{
    //                     setDateRange(update);
    //                 }}
    //             />
    //         </div>
    //     );
    // }

    let distArr = Array.from({length: options.distriction.length},(_,index)=>index);
    let pipeArr = Array.from({length: options.pipeType.length},(_,index)=>index);

    return(
        <div className='selectors'>
            <div>
                <select name='distriction'
                        id='districtionSelects'
                        onChange={handleDistChange}
                >
                    <optgroup label='行政區'>
                    <option value={0}>全地區</option>
                    {
                        distArr.map((i)=>(
                            <option value={options.distriction[i]} key={options.distriction[i]}>{options.distriction[i]}</option>
                        ))
                    }
                    </optgroup>
                </select>
                <select name='pipeType'
                        id='pipeTypeSelects'
                        onChange={handlePipeChange}
                >
                    <optgroup label='管線類型'>
                    <option value={0}>全部管線</option>
                    {
                        pipeArr.map((i)=>(
                            <option value={options.pipeType[i]} key={options.pipeType[i]}>{options.pipeType[i]}</option>
                        ))
                    }
                    </optgroup>
                </select>
            </div>
            <div>
                <DatePicker
                    placeholderText='起訖日期'
                    dateFormat='yyyy/MM/dd'
                    selectsRange={true}
                    startDate={startDate}
                    endDate={endDate}
                    isClearable={true}
                    shouldCloseOnSelect={false}
                    onChange={(update)=>{
                        setDateRange(update);
                        console.log(update);
                    }}
                />
            </div>
        </div>
    );
}

const CardList = (props)=>{

    console.log('CardList : start');

    //目前所在頁數
    const [pageIndex, setPageIndex] = useState(0);
    //目前頁數內的卡片數量
    let cardsNum = useMemo(()=>{
        console.log('CardList : start useMemo()')
            let arr = [];
            let length = 0;

            if(props.value===null) return;
            else if(props.value.length>1) length =  props.value[pageIndex].length;
            else length =  props.value[0].length;

            arr = Array.from({length: length},(_,index) => index);
            return(arr);
    },[props.value, pageIndex]);

    const handleClick = (x)=>{
        if(x > props.value.length-1 || x < 0) return;
        setPageIndex(x);
    }

    console.log('CardList : page index : '+pageIndex+', cardsNum : '+cardsNum);

    if(props.value === null){
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
        let pageBtns = Array.from({length: props.value.length},(_,index)=>index);

        return(
            <div className='cardList'>
                <p id='listTop' className='marginBottom-3'/>
                <Selectors
                    options={props.option}
                    condition={props.condition}
                    setCondition={props.setCondition}
                    setPageIndex={setPageIndex}
                />
                <Pagination
                    margin={'marginBottom-2'}
                    pageBtns={pageBtns}
                    pageIndex={pageIndex}
                    handleClick={handleClick}
                />
                {
                    cardsNum.map((i)=>(
                        <Card key={'card'+(pageIndex*10+i+1)}
                            value={props.value[pageIndex][i]}
                            index={pageIndex*10+i}
                            setConstructionLocation={props.setConstructionLocation}
                            setConstructionPolygon = {props.setConstructionPolygon}/>
                    ))
                }
                <Pagination
                    margin={'marginTop-3'}
                    pageBtns={pageBtns}
                    pageIndex={pageIndex}
                    handleClick={handleClick}
                />
            </div>
        );
    }
}

export default CardList;