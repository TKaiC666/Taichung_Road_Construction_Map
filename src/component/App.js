import React, { useState, useEffect, useCallback } from 'react';
import MapContainer from './MapCotainer'
import CardList from './CardList';

const App = ()=>{
    const [constructionsData,setConstructionsData] = useState([]);
    const [constructionPolygon, setConstructionPolygon] = useState([]);
    const [constructionLocation, setConstructionLocation] = useState();

    const fetchData = useCallback(()=>{
        
        const pickWorkingProject = (data)=>{
            let _data = data;
            let newData = [];
            console.log('pick working projects from ' + data.length);
            for(let i = 0; i < _data.length; i++){
                if(_data[i]['是否開工'] === '是'){
                    newData.push(_data[i]);
                }
            }
            console.log(newData.length+' working projects');
            // setConstructionData(newData);
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

export default App;