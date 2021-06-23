import React, { useMemo, useRef, useState } from 'react';
import {GoogleMap, LoadScript, InfoWindow, MarkerClusterer, Marker, Polygon} from '@react-google-maps/api';
import Card from './Card';

const Map = (props)=>{
    const [selectMarker, setSelectMarker] = useState(null);
    const [gridSize, setGridSize] = useState(60);
    const mapRef = useRef(null);
    const constructionsData = props.constructionsData;
    const APIKey = 'AIzaSyAD3EMZ4E3XEei4WDxlpEaUpiPeOCm5cIQ';
    let center = props.center === undefined ? {lat : 24.1512535, lng : 120.6617366} : { lat : props.center.lat, lng : props.center.lng};
    let zoom = 11;
    let path = props.path;
    let markers;

    if(constructionsData !== null){
        let markersNum = (constructionsData.length-1)*10 + constructionsData[(constructionsData.length-1)].length;
        markers = Array.from({length : markersNum},(_,index)=>index);
    }

    const changeGridSize = ()=>{
        let size = 60;
        if(!mapRef.current) return;
        if(mapRef.current.zoom >= 18) size = 1;
        else size = 60;
        setGridSize(size);
    }
    
    return(
        <LoadScript googleMapsApiKey={APIKey}>
            <GoogleMap
                mapContainerStyle={{
                    height: '100vh',
                    width: 'calc(100% - 546px)'
                }}
                zoom={zoom}
                center={center}
                options={{ 
                    styles : mapStyle,
                    maxZoom : 20,
                    minZoom : 11,
                    disableDefaultUI : true
                }}
                onLoad={(map)=>{mapRef.current = map;}}
                onZoomChanged={changeGridSize}
                // onCenterChanged={()=>{
                //     if(!mapRef.current) return;
                //     console.log(mapRef.current.getCenter().toJSON());
                // }}
            >
                {console.log('map render')}
                { constructionsData && 
                    <MarkerClusterer 
                        options={clustersOptions} 
                        gridSize={gridSize}
                    >
                    {(cluster)=>
                        markers.map((i)=>(
                        <Marker key={'marker_'+i} 
                                position={{lat: Number(constructionsData[Math.floor(i/10)][i%10].coordinate.lat), lng: Number(constructionsData[Math.floor(i/10)][i%10].coordinate.lng)}}
                                clusterer={cluster}
                                // icon={{
                                //     url:'img/cones.png',
                                //     scaledSize : {width:37, height:37}
                                // }}
                                onClick={()=>{
                                    setSelectMarker(constructionsData[Math.floor(i/10)][i%10]);
                                }}
                        />))
                    }
                    </MarkerClusterer>
                }
                { selectMarker && (
                    <InfoWindow
                        position={{lat:selectMarker.coordinate.lat, lng:selectMarker.coordinate.lng}}
                        onCloseClick={()=>{setSelectMarker(null)}}
                    >
                        <Card key="markerInfo"
                            value={selectMarker}/>
                    </InfoWindow>
                )}
                <Polygon path={path} options={polygonOptions}/>
            </GoogleMap>
        </LoadScript>
    );
}

const mapStyle = [
    {
        "featureType": "landscape.natural",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "color": "#e0efef"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "hue": "#1900ff"
            },
            {
                "color": "#c0e8e8"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "labels",
        "stylers": [
            {
                "visibility": "off"
            },
            {
                "hue": "#1900ff"
            },
            {
                "color": "#c0e8e8"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "color": "#009baf"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "color": "#ffffff"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#d1d1d1"
            }
        ]
    },
    {
        "featureType": "transit.line",
        "elementType": "geometry",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "lightness": 700
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "all",
        "stylers": [
            {
                "color": "#7dcdcd"
            }
        ]
    }
];

const polygonOptions = {
    fillColor: "#FF7777",
    fillOpacity: 0.1,
    strokeColor: "#FF7777",
    strokeOpacity: 1,
    strokeWeight: 1,
    clickable: false,
    draggable: false,
    editable: false,
    geodesic: false,
    zIndex: 0
}

const clustersOptions = {
    imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m', // so you must have m1.png, m2.png, m3.png, m4.png, m5.png and m6.png in that folder
}

export default Map;