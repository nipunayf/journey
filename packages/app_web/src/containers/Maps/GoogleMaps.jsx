import React, {Component} from 'react';
import GoogleMapReact from 'google-map-react';
import * as configJSON from '../../api/google_maps_config.json';
import MapMarker from '../../components/Maps/CSSMapMarker'

export default function GoogleMaps({markers, defaultMarker}) {
    return (
        <div style={{height: '80vh', width: '100%'}}>
            <GoogleMapReact
                bootstrapURLKeys={{key: `${configJSON.API_KEY}`}}
                defaultCenter={defaultMarker.geometry}
                center={defaultMarker.geometry}
                defaultZoom={16}
            >

                {markers.map(marker => {
                    console.log(defaultMarker)
                    return <MapMarker
                        id={marker.id}
                        lat={marker.geometry.lat}
                        lng={marker.geometry.lng}
                        isSelected={marker.geometry === defaultMarker.geometry}/>
                })}

            </GoogleMapReact>
        </div>
    );
}
