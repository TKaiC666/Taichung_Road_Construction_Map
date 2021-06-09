import React from 'react';
import {GoogleMap, LoadScript, Marker, Polygon} from '@react-google-maps/api';

const MapContainer = (props)=>{
    const constructionsData = props.constructionsData;

    const mapContainerStyle = {
        height: '100vh',
        width: 'calc(100% - 410px - 6em)'
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

    const defaultCenter = {
        lat : 24.1512535,
        lng : 120.6617366
    }
    
    const APIKey = 'AIzaSyAD3EMZ4E3XEei4WDxlpEaUpiPeOCm5cIQ';
    let center = props.center === undefined ? defaultCenter : { lat : props.center.lat, lng : props.center.lng};
    let zoom = 11;

    let path = props.path;

    const options = {
        fillColor: "red",
        fillOpacity: 0.1,
        strokeColor: "red",
        strokeOpacity: 1,
        strokeWeight: 1,
        clickable: false,
        draggable: false,
        editable: false,
        geodesic: false,
        zIndex: 0
    }

    let markersNum;
    let markers;
    let deployMarkers;

    if(constructionsData.length !== 0){
        markersNum = (constructionsData.length-1)*10 + constructionsData[(constructionsData.length-1)].length;
        markers = Array.from({length : markersNum},(_,index)=>index);
        deployMarkers = markers.map((i)=>(
            <Marker key={'marker_'+i} 
                    position={{lat: Number(constructionsData[Math.floor(i/10)][i%10].coordinate.lat), lng: Number(constructionsData[Math.floor(i/10)][i%10].coordinate.lng)}}
                    onClick={()=>{alert('test')}}
            />
        ));
    }
    
    return(
        <LoadScript googleMapsApiKey={APIKey}>
            <GoogleMap
                mapContainerStyle={mapContainerStyle}
                zoom={zoom}
                center={center}
                options={{ 
                    styles : mapStyle,
                    maxZoom : 20,
                    minZoom : 11
                }}
            >
                {
                    constructionsData.length === 0 ? '' : deployMarkers 
                }
                <Polygon path={path} options={options}/>
            </GoogleMap>
        </LoadScript>
    );
}

export default MapContainer;