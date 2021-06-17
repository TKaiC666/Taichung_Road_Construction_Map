import React, { useState, useEffect, useCallback, useMemo } from 'react';
import MapContainer from './MapCotainer'
import CardList from './CardList';

const TaichungRCIApp = ()=>{
    console.log('TaichungRCIApp : start');
    const [constructionsData, setConstructionsData] = useState([null,null]);
    const [constructionPolygon, setConstructionPolygon] = useState([]);
    const [constructionLocation, setConstructionLocation] = useState();
    const [condition, setCondition] = useState({distriction:0, pipeType:0, stack:[]});

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

        const pickWorkingProject = (data)=>{
            let _data = data;
            let totalNum = 0;
            let newData = [];
            console.log('pick working projects from ' + data.length);
            for(let i = 0; i < _data.length; i++){
                if(_data[i]['是否開工'] === '是'){
                    newData.push(reconstructData(_data[i]));
                }
            }

            totalNum = newData.length;
            console.log(totalNum+' working projects');
            newData = sliceData(newData);
            return [newData, totalNum];
        }

        const fetchingData = ()=>{
            let url = 'https://datacenter.taichung.gov.tw/swagger/OpenData/863064b3-7678-437e-9161-8dcda3d95ab7';
            let local = 'testing_Data.json';

            fetch(local)
            .then((response) => response.json())
            .then((data)=>{
                let newData = pickWorkingProject(data);
                setConstructionsData([newData[0],newData[1]]);
            });
        }

        fetchingData();
    },[]);

    useEffect(()=>{
        fetchData();
    },[fetchData]);

    // const pickOptions = ()=>{
    //     let data = constructionsData[0];
    //     let length = constructionsData[1];
    //     let optionsStack = condition.stack;
    //     let i = 0;
    //     let options = {distriction:[], pipeType:[]};
    //     options.distriction.push(data[0][0].distriction);
    //     options.pipeType.push(data[0][0].pipeType);
    //     do{
    //         let _dist = data[Math.floor(i/10)][i%10].distriction;
    //         let _pipe = data[Math.floor(i/10)][i%10].pipeType;
    //         if(options.distriction.indexOf(_dist) === -1) options.distriction.push(_dist);
    //         if(options.pipeType.indexOf(_pipe) === -1) options.pipeType.push(_pipe);
    //         i++;
    //     }while(i<length)

    //     return options;
    // }

    const conditionedChange = useMemo(()=>{

        const searchData = (condition)=>{
            console.log('searchData() : ');
            console.log(condition);
            let i = 0;
            let dataLength = constructionsData[1];
            let data = constructionsData[0];;
            let newData = [];
            if(typeof condition.distriction === typeof condition.pipeType){
                console.log('search both');
                while(i < dataLength){
                    if(data[Math.floor(i/10)][i%10].distriction === condition.distriction
                       && data[Math.floor(i/10)][i%10].pipeType === condition.pipeType){
                        newData.push(data[Math.floor(i/10)][i%10]);
                    }
                    i++;
                }
            }else if(condition.distriction !== 0){
                console.log('search distriction');
                while(i < dataLength){
                    if(data[Math.floor(i/10)][i%10].distriction === condition.distriction){
                        newData.push(data[Math.floor(i/10)][i%10]);
                    }
                    i++;
                }
            }else if(condition.pipeType !== 0){
                console.log('search pipe');
                while(i < dataLength){
                    if(data[Math.floor(i/10)][i%10].pipeType === condition.pipeType){
                        newData.push(data[Math.floor(i/10)][i%10]);
                    }
                    i++;
                }
            }
            
            console.log(newData);
            return newData;
        };

        console.log('TaichungRCIApp -> useMemo() : \ncondition been changed\n'+condition.distriction+'  '+condition.pipeType);
        let newData = searchData(condition);
        return [sliceData(newData),newData.length];
    },[condition, constructionsData]);

    const pickOptions = ()=>{
        console.log("pickOptions() : start");
            let data = constructionsData[0];
            let length = constructionsData[1];
            let optionsStack = condition.stack;
            let options = {distriction:[], pipeType:[]};
            if(optionsStack.length === 0){
                let i = 0;
                options.distriction.push(data[0][0].distriction);
                options.pipeType.push(data[0][0].pipeType);
                do{
                    let _dist = data[Math.floor(i/10)][i%10].distriction;
                    let _pipe = data[Math.floor(i/10)][i%10].pipeType;
                    if(options.distriction.indexOf(_dist) === -1) options.distriction.push(_dist);
                    if(options.pipeType.indexOf(_pipe) === -1) options.pipeType.push(_pipe);
                    i++;
                }while(i<length)
            }else if(optionsStack.length >= 1){
                let i = 0;
                let keep = optionsStack[0];
                options[keep].push(data[0][0][keep]);
                while(i<length){
                    let singleData = data[Math.floor(i/10)][i%10];
                    if(options[keep].indexOf(singleData[keep]) === -1){
                        options[keep].push(singleData[keep]);
                    }
                    i++;
                }
                
                //shallow copy with spread syntax(...)
                let changed = {...condition};
                delete changed.stack;
                delete changed[keep];
                changed = Object.keys(changed)[0];

                data = conditionedChange[0];
                length = conditionedChange[1];
                i=0;
                options[changed].push(data[0][0][changed]);
                while(i < length){
                    let singleData = data[Math.floor(i/10)][i%10];
                    if(options[changed].indexOf(singleData[changed]) === -1){
                        options[changed].push(singleData[changed]);
                    }
                    i++;
                }
            }
            console.log("pickOptions() : \n"+options.distriction+'\n'+options.pipeType);
            return options;
    }

    console.log('TaichungRCIApp : rendering start');
    if(constructionsData[0] === null){
        return(
            <div>
                {console.log('TaichungRCIApp : loading layout')}
                <MapContainer constructionsData={constructionsData[0]} center={constructionLocation} path={constructionPolygon}/>
                <CardList value = {constructionsData[0]}>
                </CardList>
            </div>
        );
    }else{
        let data = null;
        if(Number(condition.distriction) === Number(condition.pipeType)) data = constructionsData;
        else data = conditionedChange;
        return(
            <div>
                {console.log('TaichungRCIApp : default layout')}
                <MapContainer constructionsData={data[0]} center={constructionLocation} path={constructionPolygon}/>
                <CardList value = {data[0]}
                          length = {data[1]}
                          condition = {condition}
                          option = {pickOptions()}
                          setCondition = {setCondition}
                          setConstructionLocation = {setConstructionLocation}
                          setConstructionPolygon = {setConstructionPolygon}>
                </CardList>
            </div>
        );
    }
}

export default TaichungRCIApp;