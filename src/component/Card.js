import {useState} from 'react';

const Card = (props)=>{
    let data = props.value;

    const [showLess, setShowLess] = useState(true);
    const handleClick = ()=>{
        setShowLess(!showLess);
    }

    const handleLocationData = (coord, polygon)=>{
        props.setConstructionLocation({lat : coord.lat, lng : coord.lng});
        props.setConstructionPolygon(polygon);
    }

    // const pipeColor = (pipeName)=>{
    //     switch(pipeName){
    //         case '電力': return('#ffee58');
    //         case '電信': return('#ffca58');
    //         case '自來水': return('#95d8ff');
    //         case '污水下水道': return('#b5ffac');
    //         case '瓦斯': return('#ecadff');
    //         case '軍訊': return('#5a8f66');
    //         case '警訊': return('#5975b1');
    //         case '緊急性挖掘': return('#ff8c8c');
    //         default : return('#c7c7c7');
    //     }
    // }

    if(data === 'loading'){
        return(
            <div className='card loading'>
                <div>Loading...</div>
            </div>);
    }

    return(
        <div className='card'>
            <div className='card-meta'>
                <div className='card-meta-title'>
                    <div className='highlighter bgColor_mintGreen-light' style={{width:data.pipeType.length+'em'}}></div>
                    <div className='dist'>{data.distriction}</div>
                    <div className='pipeType' style={{position:'relative'}}>
                        {data.pipeType}
                    </div>
                </div>
                <div className='card-meta-basicInfo'>
                    <div className='date'>
                        <span className='slash'>{data.date.start.year}</span><span className='slash'>{data.date.start.month}</span><span>{data.date.start.day}</span><i className="fas fa-caret-right fa-lg"></i><span className='slash'>{data.date.end.year}</span><span className='slash'>{data.date.end.month}</span><span>{data.date.end.day}</span>
                    </div>
                    <div className='info'>
                        <div className='item'>案件類別</div>
                        <div>{data.constructionType}</div>
                    </div>
                    <div className='info'>
                        <div className='item'>地點</div>
                        <div>{data.distriction + data.address}</div>
                    </div>
                </div>
                <div className='buttons'>
                    <div title='顯示位置' className='buttons-locate' onClick={()=>{handleLocationData(data.coordinate, data.coordinate.polygon)}}>
                        <i className="fas fa-map-marker-alt"/>
                    </div>
                    <div title='更多資訊' className={showLess ? 'buttons-moreInfo' : 'buttons-moreInfoClicked'} onClick={()=>{handleClick()}}>
                        <i className={`fas ${showLess ? 'fa-angle-double-down' : 'fa-angle-double-up'}`}/>
                    </div>
                </div>
            </div>
            <div className={`${showLess && 'noneDisplay'} horiLine`}/>
            <div className={`${showLess && 'noneDisplay'} card-body`}>
                <div className='card-body-detailInfo'>
                    <div className='oneRow'>
                        <div className='item'>工程名稱</div>
                        <div className='constructTitle'>{data.title}</div>
                    </div>
                    <div>
                        <div className='item'>申請書編號</div>
                        <div>{data.applicationNumber}</div>
                    </div>
                    <div>
                        <div className='item'>許可證編號</div>
                        <div>{data.licenseNumber}</div>
                    </div>
                    <div className='oneRow'>
                        <div className='item'>申請單位</div>
                        <div>{data.applicant}</div>
                    </div>
                    <div className='oneRow'>
                        <div className='item'>廠商</div>
                        <div>{data.contractor.name}</div>
                        <div className='phone'>{data.contractor.phone}</div>
                    </div>
                    <div className='oneRow'>
                        <div className='item'>負責人</div>
                        <div>{data.personInCharge.name}</div>
                        <div className='phone'>{data.personInCharge.phone}</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Card;