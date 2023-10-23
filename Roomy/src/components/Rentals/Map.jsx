import React, {useState, useCallback} from 'react';
import styled from 'styled-components';
import {GoogleMap, Marker, InfoWindow} from '@react-google-maps/api';
import SearchBar from './SearchBar';

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
    const [city, setCity] = useState('Santa Cruz');
    
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
    };

    const onMapUnmount = useCallback(function callback(map) {
        setMapObject(null);
    }, []);

    function panMapToCity(city) {
        if(mapObject) {
            let service = new window.google.maps.places.PlacesService(mapObject);
            setCity(city);
            const request = {
                query: city,
                fields: ['id', 'location'],
                includedType: 'locality',
                locationBias: center,
            };
            service.textSearch(request, function(results, status) {
                if (status === window.google.maps.places.PlacesServiceStatus.OK) {
                    mapObject.setCenter(results[0].geometry.location);
                }
            });
        } else {
            console.log('Map not loaded in!');
        }
    }
    
    return <>
        <SearchBar handleCityChange={panMapToCity} />
        <h1>{city}</h1>
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

export default Map;
