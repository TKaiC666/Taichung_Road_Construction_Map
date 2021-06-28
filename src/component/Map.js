import React, { useRef, useState } from 'react';
import {GoogleMap, LoadScript, InfoWindow, MarkerClusterer, Marker, Polygon} from '@react-google-maps/api';
import CardMini from './CardMini';

const Map = (props)=>{
    const [gridSize, setGridSize] = useState(60);
    const {constructionsData, mapParameters, setMapParameters} = props;
    const mapRef = useRef(null);
    const dataRef = useRef(null);
    const APIKey = 'AIzaSyAD3EMZ4E3XEei4WDxlpEaUpiPeOCm5cIQ';
    let isClusterWork = (constructionsData !== null) && (constructionsData.length !== 0) ? true : false;

    const changeGridSize = ()=>{
        let size = 60;
        if(!mapRef.current) return;
        if(mapRef.current.zoom >= 18) size = 1;
        else size = 60;
        setGridSize(size);
    }

    const handleMapOnLoad = (map)=>{
        mapRef.current = map;
    }

    const handleMarkerClick = (i)=>{
        // center = mapRef.current.center;
        let data = constructionsData[Math.floor(i/10)][i%10];
        let newCenter = mapRef.current.getCenter().toJSON();
        
        setMapParameters({
            center: newCenter,
            polygon: data.coordinate.polygon,
            zoom: mapParameters.zoom,
            selectMarker: data,
            closeInfoWindow: false
        });
    }

    const handleInfoWindowOnCloseClick = ()=>{
        setMapParameters({
            center: mapParameters.center,
            polygon: mapParameters.polygon,
            zoom: mapParameters.zoom,
            selectMarker: null,
            closeInfoWindow: true
        });
    }

    const isInfoWindowShow = ()=>{
        let bool = false;
        if(mapParameters.closeInfoWindow === true) bool = false;
        else if(mapParameters.selectMarker !== null) bool = true;
        console.log('selectMarker = '+mapParameters.selectMarker+', closeInfoWindow : '+mapParameters.closeInfoWindow);
        return bool;
    }
    
    const renderMarker = (cluster)=>{
        let markersNum = (constructionsData.length-1)*10 + constructionsData[(constructionsData.length-1)].length;
        let markers = Array.from({length : markersNum},(_,index)=>index);
        
        return(
            markers.map((i)=>(
                (constructionsData[Math.floor(i/10)][i%10].coordinate.lat !== 0 && constructionsData[Math.floor(i/10)][i%10].coordinate.lng !== 0) &&
                    <Marker key={'marker_'+i} 
                            position={{lat: Number(constructionsData[Math.floor(i/10)][i%10].coordinate.lat), lng: Number(constructionsData[Math.floor(i/10)][i%10].coordinate.lng)}}
                            onClick={()=>handleMarkerClick(i)}
                            clusterer={cluster}
                            noClustererRedraw={true}
                    />
            ))
        );
    }

    return(
        <div className='mapContainer'>
        {console.log('map render : '+dataRef.current)}
        <LoadScript googleMapsApiKey={APIKey}>
            <GoogleMap
                mapContainerStyle={{
                    height: '100vh',
                    width: 'calc(100% - 546px)'
                }}
                zoom={mapParameters.zoom}
                center={mapParameters.center}
                options={{ 
                    styles : mapStyle,
                    minZoom : 11,
                    maxZoom : 20,
                    disableDefaultUI : true
                }}
                onLoad={(map)=>{handleMapOnLoad(map)}}
                onZoomChanged={changeGridSize}
            >
                {/* { isClusterWork && 
                    <MarkerClusterer 
                        averageCenter={true}
                        options={clustersOptions} 
                        gridSize={gridSize}
                    >
                    {(cluster)=>{
                        
                        let markersNum = (constructionsData.length-1)*10 + constructionsData[(constructionsData.length-1)].length;
                        let markers = Array.from({length : markersNum},(_,index)=>index);
                        return(markers.map((i)=>(
                        (constructionsData[Math.floor(i/10)][i%10].coordinate.lat !== 0 && constructionsData[Math.floor(i/10)][i%10].coordinate.lng !== 0) &&
                        <Marker key={'marker_'+i} 
                                position={{lat: Number(constructionsData[Math.floor(i/10)][i%10].coordinate.lat), lng: Number(constructionsData[Math.floor(i/10)][i%10].coordinate.lng)}}
                                clusterer={cluster}
                                // icon={{
                                //     url:'img/cones.png',
                                //     scaledSize : {width:37, height:37}
                                // }}
                                onClick={()=>handleMarkerClick(i)}
                        />)));
                    }}
                    </MarkerClusterer>
                } */}
                {/* {
                    isClusterWork && 
                    <MarkerClusterer
                    averageCenter={true}
                    options={clustersOptions} 
                    gridSize={gridSize}
                    >
                    {
                        cluster => renderMarker(cluster)
                    }
                    </MarkerClusterer>
                } */}
                {
                   constructionsData && renderMarker()
                }
                { isInfoWindowShow() && (
                    <InfoWindow
                        position={{lat: mapParameters.selectMarker.coordinate.lat, lng: mapParameters.selectMarker.coordinate.lng}}
                        options={{
                            pixelOffset : new window.google.maps.Size(0,-45)
                        }}
                        onCloseClick={handleInfoWindowOnCloseClick}
                    >
                        <CardMini value={mapParameters.selectMarker}/>
                    </InfoWindow>
                )}
                {
                    mapParameters.polygon && (
                        <Polygon path={mapParameters.polygon} options={polygonOptions}/>
                    )
                }
            </GoogleMap>
        </LoadScript>
        </div>
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