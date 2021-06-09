import React, { useState, useEffect, useCallback } from 'react';
import MapContainer from './MapCotainer'
import CardList from './CardList';

const TestApp = ()=>{
    const [constructionsData,setConstructionsData] = useState([]);
    const [constructionPolygon, setConstructionPolygon] = useState([]);
    const [constructionLocation, setConstructionLocation] = useState();

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
                location : {
                    distriction : data['區域名稱'],
                    address : data['地點']
                },
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
            let newData = [];
            console.log('pick working projects from ' + data.length);
            for(let i = 0; i < _data.length; i++){
                if(_data[i]['是否開工'] === '是'){
                    newData.push(reconstructData(_data[i]));
                }
            }
            console.log(newData.length+' working projects');
            newData = sliceData(newData);
            return newData;
        }

        const sliceData = (data)=>{
            let _data = data;
            let newData = [];
            console.log('slice data');
            for(let i = 0; i < _data.length; i+=10){
                newData.push(_data.slice(i,i+10));
            }
            return newData;
        }

        const fetchingData = ()=>{
            let url = 'https://datacenter.taichung.gov.tw/swagger/OpenData/863064b3-7678-437e-9161-8dcda3d95ab7';
    
            fetch(url)
            .then((response) => response.json())
            .then((data)=>{
                console.log('Fetch data');
                setConstructionsData(pickWorkingProject(data));
            });
        }

        fetchingData();
    },[]);

    useEffect(()=>{
        fetchData();
    },[fetchData]);

    return(
        <div>
            <MapContainer constructionsData={constructionsData} center={constructionLocation} path={constructionPolygon}/>
            <CardList value = {constructionsData}
                      setConstructionLocation = {setConstructionLocation}
                      setConstructionPolygon = {setConstructionPolygon}>
            </CardList>
        </div>
    );
}

export default TestApp;