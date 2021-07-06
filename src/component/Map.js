import React, { useMemo, useRef, useState, useEffect } from 'react';
import {GoogleMap, LoadScript, InfoWindow, MarkerClusterer, Marker, Polygon} from '@react-google-maps/api';
import CardMini from './CardMini';
import m1 from '../img/map/markerclusterer/m1.png';

const Map = (props)=>{
    const [gridSize, setGridSize] = useState(60);
    const {constructionsData, mapParameters, setMapParameters} = props;
    const mapRef = useRef(null);
    const dataRef = useRef(null);
    const APIKey = 'AIzaSyAD3EMZ4E3XEei4WDxlpEaUpiPeOCm5cIQ';
    let isClusterWork = (constructionsData !== null) && (constructionsData.length !== 0) ? true : false;

    useEffect(()=>{
        console.log('Map : component mount');
        return(()=>console.log('Map : component unmount'));
    },[]);

    const changeGridSize = ()=>{
        if(!mapRef.current || mapRef.current.zoom <= 17) return;
        let size = 60;
        if(mapRef.current.zoom > 18) size = 1;
        setGridSize(size);
    }

    const handleMapOnLoad = (map)=>{
        mapRef.current = map;
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

    const renderCluster = useMemo(()=>{

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
                                icon={constructionsData[Math.floor(i/10)][i%10].workingState === '是' ? 
                                {
                                    url:'/img/map/marker/cone.png',
                                    scaledSize : {width:37, height:37}
                                } : 
                                {
                                    url:'/img/map/marker/cone_gray.png',
                                    scaledSize : {width:37, height:37}
                                }}
                        />
                ))
            );
        }

        console.log('update cluster');
        return(
            isClusterWork && 
            <MarkerClusterer
                key='markerClusterer'
                averageCenter={true}
                options={clustersOptions} 
                gridSize={gridSize}
            >
                { cluster => renderMarker(cluster) }
            </MarkerClusterer>);
    },[constructionsData, isClusterWork, gridSize, mapParameters, setMapParameters]);
    

    return(
        <div className='mapContainer'>
        <LoadScript googleMapsApiKey={APIKey}>
            <GoogleMap
                mapContainerStyle={{
                    width: '100%',
                    height: 'inherit'
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
                {
                    renderCluster
                }
                { isInfoWindowShow() && (
                    <InfoWindow
                        position={{lat: mapParameters.selectMarker.coordinate.lat, lng: mapParameters.selectMarker.coordinate.lng}}
                        options={{
                            pixelOffset : new window.google.maps.Size(0,-45),
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
        "featureType": "landscape.man_made",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "landscape.man_made",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "landscape.natural",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "color": "#f0f0f0"
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
            // {
            //     "color": "#88cece"
            // }
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
                "color": "#ec7868"
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
                "color": "#3da7a7"
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
                "color": "#cccccc"
            }
        ]
    },
    {
        "featureType": "road.local",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#f9f9f9"
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#ffffff"
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
                "color": "#5ecde9"
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
    styles: [
        {
            height: 53,
            width: 53,
            url: "/img/map/markerclusterer/m1.png"
        },
        {
            height: 56,
            url: "/img/map/markerclusterer/m2.png",
            width: 56
        },
        {
            height: 66,
            url: "/img/map/markerclusterer/m3.png",
            width: 66
        },
        {
            height: 78,
            url: "/img/map/markerclusterer/m4.png",
            width: 78
        },
        {
            height: 90,
            url: "/img/map/markerclusterer/m5.png",
            width: 90
        }]
    // imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m', // so you must have m1.png, m2.png, m3.png, m4.png, m5.png and m6.png in that folder
}

export default Map;