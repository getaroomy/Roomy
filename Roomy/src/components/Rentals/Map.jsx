import React, {useState, useCallback} from 'react';
import styled from 'styled-components';
import {GoogleMap, Marker, InfoWindow} from '@react-google-maps/api';
import SearchBar from './SearchBar';
import { getRentalsAPI } from '../../action';
import { connect } from 'react-redux';

const containerStyle = {
    width: '100%',
    height: '100%',
};

const center = {
    lat: 36.974117,
    lng: -122.030792,
};

const MyWindow = styled.div`
    img {
        width: 100px;
        height: 100px;
    }
`;

function Map(props) {
    const [selectedPlace, setSelectedPlace] = useState(null);
    const [rentalMap, setRentalMap] = useState({});
    const [zoom, setZoom] = useState(14);
    const [infoOpen, setInfoOpen] = useState(false);
    const [mapObject, setMapObject] = useState(null);
    const [city, setCity] = useState('Santa Cruz, CA, US');
    const googleMapsToken = process.env.REACT_APP_GOOGLE_MAPS_TOKEN;
    
    const markerOnLoadHandler = (rental, key) => {
        rental.setIcon('/images/rental-marker.png');
        return setRentalMap((prevState) => ({ ...prevState, [key]: rental }));
    };

    const markerOnClickHandler = (rental, key) => {
        // This works because selectedPlace will only be set when infoOpen is true
        // And checks infoOpen to make sure we can reopen it after closing.
        // Goal: close on double click
        if (infoOpen && selectedPlace[1] === key) {
            setInfoOpen(false);
            return;
        }

        setSelectedPlace([rental, key]);
        if (infoOpen) {
            setInfoOpen(false);
        }

        setInfoOpen(true);
        props.handleClickScroll(key);
    };

    const onMapLoad = (map) => {
        setMapObject(map);
        props.onMapElementChange(map);
    };

    const onMapUnmount = useCallback(function callback(map) {
        setMapObject(null);
        props.onMapElementChange(null);
    }, []);

    async function panMapToCity(city) {
        if(mapObject) {
            city = city.description;
            const headers = {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    address: {
                        addressLines: [city]
                    }
                })
            };
            const addressValidationUrl = `https://addressvalidation.googleapis.com/v1:validateAddress?key=${googleMapsToken}`;
            const addrFetch = await fetch(addressValidationUrl, headers);
            const addrFetchResp = await addrFetch.json();

            const postalAddress = addrFetchResp.result.address.postalAddress;
            const coordsObject = addrFetchResp.result.geocode.location;
            const formattedCity = `${postalAddress.locality}, ${postalAddress.administrativeArea}, ${postalAddress.regionCode}`;

            mapObject.setCenter({lat: coordsObject.latitude, lng: coordsObject.longitude});
            setCity(formattedCity);
            props.getRentals(null,null,null,formattedCity);
        } else {
            console.log('Map not loaded in!');
        }
    }
    
    return <>
        <SearchBar handleCityChange={panMapToCity} locationType='city' />
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={zoom}
            onLoad={onMapLoad}
            onUnmount={onMapUnmount}
        >
            {props.rentals && props.rentals.map((rental, key) => (
                <Marker
                    key={key}
                    position={{ lat: rental.coords.latitude, lng: rental.coords.longitude }}
                    onLoad={(event) => markerOnLoadHandler(event, key)}
                    onClick={() => markerOnClickHandler(rental, key)}
                    onMouseOver={() => { rentalMap[key].setIcon('/images/rental-marker-highlight.png'); }}
                    onMouseOut={() => { rentalMap[key].setIcon('/images/rental-marker.png'); }}
                />
            ))}
            {infoOpen && selectedPlace && (
                <InfoWindow anchor={rentalMap[selectedPlace[1]]} onCloseClick={() => setInfoOpen(false)}>
                    <MyWindow>
                        {selectedPlace[0].photos.length > 0 && <img src={selectedPlace[0].photos[0]} alt="" />}
                        <h1>{selectedPlace[0].title}</h1>
                        <div>{selectedPlace[0].description}</div>
                    </MyWindow>
                </InfoWindow>
            )}
        </GoogleMap>
    </>;
}

const mapStateToProps = (state) => ({
});

const mapDispatchToProps = (dispatch) => ({
    getRentals: (first,last,direction,city) => dispatch(getRentalsAPI(first,last,direction,city)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Map);
