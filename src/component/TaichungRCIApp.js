import React, { useState, useEffect, useCallback, useMemo } from 'react';
import Map from './Map'
import InfoButton from './InfoButton';
import InfoBlock from './InfoBlock';

const TaichungRCIApp = ()=>{
    console.log('TaichungRCIApp : start');
    const [constructionsData, setConstructionsData] = useState('loading');
    const [condition, setCondition] = useState({workingState:'是', distriction:0, date:{start:null,end:null}, stack:['workingState']});
    const [showInfoBlock, setShowInfoBlock] = useState(null);
    const [mapParameters, setMapParameters] = useState({
        center:{lat : 24.1512535, lng : 120.6617366},
        polygon: null,
        zoom: 12,
        selectMarker: null,
        closeInfoWindow: null
    });
    // const findUserLocation = ()=>{
    //     if('geolocation' in navigator){
    //         navigator.geolocation.getCurrentPosition((position)=>{
    //             console.log(position.coords.latitude, position.coords.longitude);
    //             setConstructionLocation({lat: position.coords.latitude, lng: position.coords.longitude});
    //         });
    //     }else{
    //         console.log('geolocation is not available');
    //     }
    // }

    const convertDate2Num = (date)=>{
        let [year,month,day] = Object.values(date)
        year = year.toString();
        month = month.toString();
        day = day.toString();

        if(month.length === 1) month = '0' + month;
        if(day.length === 1) day = '0' + day;

        return parseInt((year + month + day), 10);
    }

    const sliceData = (data)=>{
        let _data = data;
        let newData = [];
        for(let i = 0; i < _data.length; i+=10){
            newData.push(_data.slice(i,i+10));
        }
        return newData;
    }

    const fetchData = useCallback(()=>{
        
        const reconstructData = (data)=>{

            function convertData(data){

                const convertStringCoor2Num = (lat, lng)=>{
                    let locationObject = {lat : 0, lng : 0};
                    locationObject.lat = Number(lat);
                    locationObject.lng = Number(lng);
            
                    return locationObject;
                }
            
                const splitPolygonData = (polygon)=>{
                    let coordArray = polygon.slice(12,polygon.length-2);
                    if(polygon === ''){
                        return null;
                    }

                    coordArray = coordArray.split(', ');
                    coordArray = coordArray.map((i) => i.split(' '));
                    coordArray = coordArray.map((i) => convertStringCoor2Num(i[1],i[0]));
            
                    return coordArray;
                }

                let convertPart = {
                    date : {
                        start : {
                            year : Number(data['核准起日'].substring(0,3)) + 1911,
                            month : Number(data['核准起日'].substring(3,5)),
                            day : Number(data['核准起日'].substring(5))
                        },
                        end : {
                            year : Number(data['核准迄日'].substring(0,3)) + 1911,
                            month : Number(data['核准迄日'].substring(3,5)),
                            day : Number(data['核准迄日'].substring(5))
                        }
                    },
                    personInCharge : {
                        name : data['承辦人'].substring(0,1) + '◯◯'
                    },
                    coordinate : {
                        lat : convertStringCoor2Num(data['中心點Y坐標'],data['中心點X坐標']).lat,
                        lng : convertStringCoor2Num(data['中心點Y坐標'],data['中心點X坐標']).lng,
                        polygon : splitPolygonData(data['施工範圍坐標'])
                    }
                }

                return convertPart;
            }

            let convertedPart = convertData(data);

            let newData = {
                title : data['工程名稱'],
                distriction : data['區域名稱'],
                address : data['地點'],
                pipeType : data['管線工程類別'],
                constructionType : data['案件類別'],
                workingState: data['是否開工'],
                date : {
                    start : {
                        year : convertedPart.date.start.year,
                        month : convertedPart.date.start.month,
                        day : convertedPart.date.start.day
                    },
                    end : {
                        year : convertedPart.date.end.year,
                        month :  convertedPart.date.end.month,
                        day :  convertedPart.date.end.day
                    }
                },
                applicationNumber : data['申請書編號'],
                licenseNumber : data['許可證編號'],
                applicant : data['申請單位'],
                contractor : {
                    name : data['廠商名稱'],
                    phone : data['廠商電話']
                },
                personInCharge : {
                    name : convertedPart.personInCharge.name,
                    phone : data['承辦人電話']
                },
                coordinate : {
                    lat : convertedPart.coordinate.lat,
                    lng : convertedPart.coordinate.lng,
                    polygon : convertedPart.coordinate.polygon
                }
            };

            return newData;
        }

        const handleData = (data)=>{
            let _data = data;
            let newData = [];
            for(let i = 0; i < _data.length; i++){
                newData.push(reconstructData(_data[i]));
            }
            return(newData);
        }

        const fetchingData = ()=>{
            let url = 'https://datacenter.taichung.gov.tw/swagger/OpenData/863064b3-7678-437e-9161-8dcda3d95ab7';
            //local testing
            let local = 'testing_Data.json';
            let error = 'testing_server-error.json';

            fetch(local)
            .then((response) => {
                if(response.status === 200){
                    return(response.text());
                }
                throw new Error('Network response was not ok.');
            })
            .then((data)=>{
                //等API資料庫又500時，在做response.status和response.ok的測試
                //這個辨識方法很白癡但很直接，500 internal server error會回傳使用html tag語法的字串
                //所以只要看第一個字是否為<，就能確定是否為500。
                if(data[0] === '<'){
                    console.error('fetch error : API Internal Server Error');
                    setConstructionsData(null);
                }else{
                    let newData = handleData(JSON.parse(data));
                    setConstructionsData(newData);
                }
            }).catch((error)=>{
                console.error('fetch error : ', error.message);
                setConstructionsData(null);
            });
            
        }

        fetchingData();
    },[]);

    useEffect(()=>{
        fetchData();
    },[fetchData]);

    const filteredData = useMemo(()=>{

        const filteringData = (condition)=>{
            console.log('filteringData() : ');
            console.log(condition);

            let data = constructionsData;
            let newData = [];
            if(data === null || data === 'loading'){
                newData = data;
            }else if(condition.stack.length === 3){
                console.log('search all');
                newData = data.filter((object) => (
                    ((convertDate2Num(condition.date.start) >= convertDate2Num(object.date.start)
                    && convertDate2Num(condition.date.start) <= convertDate2Num(object.date.end))
                    || (convertDate2Num(condition.date.end) >= convertDate2Num(object.date.start)
                    && convertDate2Num(condition.date.end) <= convertDate2Num(object.date.end)))
                    && object.workingState === condition.workingState && object.distriction === condition.distriction
                ));
            }else if(condition.stack.length === 2){
                if(condition.stack.indexOf('date') !== -1){
                    let anotherCondition = condition.stack[1 - condition.stack.indexOf('date')];
                    console.log('search date & '+anotherCondition);
                    newData = data.filter((object) => (
                        ((convertDate2Num(condition.date.start) >= convertDate2Num(object.date.start)
                        && convertDate2Num(condition.date.start) <= convertDate2Num(object.date.end))
                        || (convertDate2Num(condition.date.end) >= convertDate2Num(object.date.start)
                        && convertDate2Num(condition.date.end) <= convertDate2Num(object.date.end))) &&
                        object[anotherCondition] === condition[anotherCondition]
                    ));
                }else{
                    console.log('search workingState & distriction');
                    newData = data.filter((object) => (
                        object.workingState === condition.workingState && object.distriction === condition.distriction
                    ));
                }
            }else if(condition.stack.length === 1){
                if(condition.distriction !== 0 ){
                    console.log('search distriction');
                    newData = data.filter((object) => object.distriction === condition.distriction);
                }else if(condition.date.start !== null && condition.date.end !== null){
                    console.log('search date');
                    newData = data.filter((object) => (
                        (convertDate2Num(condition.date.start) >= convertDate2Num(object.date.start)
                           && convertDate2Num(condition.date.start) <= convertDate2Num(object.date.end))
                           || (convertDate2Num(condition.date.end) >= convertDate2Num(object.date.start)
                           && convertDate2Num(condition.date.end) <= convertDate2Num(object.date.end))
                    ));
                }else if(condition.workingState !== 0){
                    console.log('search workingState');
                    newData = data.filter((object) => object.workingState === condition.workingState);
                }
            }

            return newData;
        };

        let newData = filteringData(condition);
        console.log(newData);
        return(newData);
    },[condition, constructionsData]);

    const selectorsOptions = useMemo(()=>{
        let _stack = condition.stack;
        let _options = {workingState:[], distriction:[], date:{start:{},end:{}}};
        if(_stack.length >= 0 && constructionsData !== 'loading'){
            console.log('condition stack '+_stack.length);
            console.log(constructionsData);
            _options.date.start = {...constructionsData[0].date.start};
            _options.date.end = {...constructionsData[0].date.end};
            for(let object of constructionsData){
                if(_options.workingState.indexOf(object.workingState) === -1) _options.workingState.push(object.workingState);
                if(_options.distriction.indexOf(object.distriction) === -1)  _options.distriction.push(object.distriction);
                if(convertDate2Num(object.date.start) <= convertDate2Num(_options.date.start)) _options.date.start = {...object.date.start};
                if(convertDate2Num(object.date.end) >= convertDate2Num(_options.date.end)) _options.date.end = {...object.date.end};
            }
        }
        console.log(_options);
        return _options;
    },[condition.stack, constructionsData]);

    const pickOptions = ()=>{
        let _stack = condition.stack;
        let _options = {workingState:[], distriction:[], date:{start:{},end:{}}};
        if(_stack.length === 3){
            console.log('condition stack = '+_stack.length);
            _options.date.start = {...filteredData[0].date.start};
            _options.date.end = {...filteredData[0].date.end};
            for(let object of filteredData){
                if(_options.workingState.indexOf(object.workingState) === -1) _options.workingState.push(object.workingState);
                if(_options.distriction.indexOf(object.distriction) === -1)  _options.distriction.push(object.distriction);
                if(convertDate2Num(object.date.start) <= convertDate2Num(_options.date.start)) _options.date.start = {...object.date.start};
                if(convertDate2Num(object.date.end) >= convertDate2Num(_options.date.end)) _options.date.end = {...object.date.end};
            }
        }
        else if(_stack.length === 2){
            console.log('condition stack = 2');
            let firstCondition = condition.stack[0];
            let secondCondition = condition.stack[1];
            let lastCondition = null;
            for(let key of Object.keys(condition)){
                if(key !== firstCondition && key !== secondCondition && key !== 'stack'){
                    lastCondition = key;
                    break;
                }
            }
            if(firstCondition === 'date'){
                _options.date.start = {...constructionsData[0].date.start};
                _options.date.end = {...constructionsData[0].date.end};
                for(let object of constructionsData){
                    if(convertDate2Num(object.date.start) <= convertDate2Num(_options.date.start)) _options.date.start = {...object.date.start};
                    if(convertDate2Num(object.date.end) >= convertDate2Num(_options.date.end)) _options.date.end = {...object.date.end};
                }
                for(let object of filteredData){
                    if(_options[secondCondition].indexOf(object[secondCondition]) === -1) _options[secondCondition].push(object[secondCondition]);
                    if(_options[lastCondition].indexOf(object[lastCondition]) === -1)  _options[lastCondition].push(object[lastCondition]);
                }
            }else{
                for(let object of constructionsData){
                    if(_options[firstCondition].indexOf(object[firstCondition]) === -1) _options[firstCondition].push(object[firstCondition]);
                }
                if(secondCondition === 'date'){

                }else{
                    let list = constructionsData.map((object)=>(object[secondCondition]));
                    // let conditionedList = list.filter((object)=>())
                }
            }
        }
        else if(_stack.length === 1){
            console.log('condition stack = '+_stack.length);
            let firstCondition = condition.stack[0];
            if(firstCondition === 'date'){
                _options.date.start = {...constructionsData[0].date.start};
                _options.date.end = {...constructionsData[0].date.end};
                for(let object of constructionsData){
                    if(convertDate2Num(object.date.start) <= convertDate2Num(_options.date.start)) _options.date.start = {...object.date.start};
                    if(convertDate2Num(object.date.end) >= convertDate2Num(_options.date.end)) _options.date.end = {...object.date.end};
                }
                for(let object of filteredData){
                    if(_options.workingState.indexOf(object.workingState) === -1) _options.workingState.push(object.workingState);
                    if(_options.distriction.indexOf(object.distriction) === -1)  _options.distriction.push(object.distriction);
                }
            }else{
                let anotherCondition = firstCondition === 'distriction' ? 'workingState' :　'distriction';
                console.log(firstCondition, anotherCondition);
                for(let object of constructionsData){
                    if(_options[firstCondition].indexOf(object[firstCondition]) === -1) _options[firstCondition].push(object[firstCondition]);
                }
                _options.date.start = {...filteredData[0].date.start};
                _options.date.end = {...filteredData[0].date.end};
                for(let object of filteredData){
                    if(_options[anotherCondition].indexOf(object[anotherCondition]) === -1)  _options[anotherCondition].push(object[anotherCondition]);
                    if(convertDate2Num(object.date.start) <= convertDate2Num(_options.date.start)) _options.date.start = {...object.date.start};
                    if(convertDate2Num(object.date.end) >= convertDate2Num(_options.date.end)) _options.date.end = {...object.date.end};
                }
            }
        }else if(_stack.length >= 0){
            console.log('condition stack = 0');
            _options.date.start = {...constructionsData[0].date.start};
            _options.date.end = {...constructionsData[0].date.end};
            for(let object of constructionsData){
                if(_options.workingState.indexOf(object.workingState) === -1) _options.workingState.push(object.workingState);
                if(_options.distriction.indexOf(object.distriction) === -1)  _options.distriction.push(object.distriction);
                if(convertDate2Num(object.date.start) <= convertDate2Num(_options.date.start)) _options.date.start = {...object.date.start};
                if(convertDate2Num(object.date.end) >= convertDate2Num(_options.date.end)) _options.date.end = {...object.date.end};
            }
        }
        console.log(_options);
        return _options;
    }

    console.log('TaichungRCIApp : rendering start');
    if(constructionsData === 'loading'){
        return(
            <div>
                {console.log('TaichungRCIApp : loading layout')}
                <Map constructionsData={null} 
                    mapParameters={mapParameters}
                    setMapParameters={setMapParameters}
                />
                <InfoButton/>
                <InfoBlock value={constructionsData}>
                </InfoBlock>
            </div>
        );
    }else if(constructionsData === null){
        return(
            <div className='serverError'>
                {console.log('TaichungRCIApp : error layout')}
                {'資料庫狀態異常，請稍後再試'}
            </div>
        );
    }else{
        let data = null;
        if(condition.distriction === 0 && condition.date.start === null && condition.date.end === null && condition.workingState === 0){
            data = constructionsData;
        }else{
            data = filteredData;
        }
        return(
            <div className='container'>
                {console.log('TaichungRCIApp : default layout')}
                <Map constructionsData={sliceData(data)}
                    mapParameters={mapParameters}
                    setMapParameters={setMapParameters}
                />
                <InfoButton setShowInfoBlock={setShowInfoBlock}/>
                <InfoBlock value={sliceData(data)}
                          length={data.length}
                          showInfoBlock={showInfoBlock}
                          option={selectorsOptions}
                          condition={condition}
                          setCondition={setCondition}
                          mapParameters={mapParameters}
                          setMapParameters={setMapParameters}
                />
            </div>
        );
    }
}

export default TaichungRCIApp;