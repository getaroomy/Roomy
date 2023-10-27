import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Redirect } from 'react-router';
import { RemoveScrollBar } from 'react-remove-scroll-bar';
import { getUserAuth, getRentalsAPI, setActiveTab } from '../action';
import Header from './Misc/Header';
import Sidebar from './Misc/Sidebar';
import Feed from './Rentals/Feed';
import Map from './Rentals/Map';

const Container = styled.div`
    height: 100vh;
    width: 100vw;
`;

const HeaderWrapper = styled.section`
    height: 60px;
    width: 100vw;
`;

const SidebarWrapper = styled.div`
    height: calc(100vh - 60px);
    width: 235px;
    position: fixed;
    left: 0;
`;

const MapWrapper = styled.div`
    height: calc(100vh - 60px);
    width: calc(100vw - 235px - 400px);
    position: fixed;
    left: 235px;
`;

const FeedWrapper = styled.div`
    height: calc(100vh - 60px);
    width: 400px;
    position: fixed;
    right: 0;
    overflow-x: hidden; // Somehow enables vertical scrolling??? idk but its lit
`;

function Rentals(props) {
    const [scrollKey, setScrollKey] = useState(0);
    const [map, setMapElement] = useState();

    useEffect(() => {
        props.getRentals();
        props.setActiveTab('Rentals');
    }, []);

    function handleClickScroll(key) {
        setScrollKey(key);
    }

    function setGlobalMap(mapElement){
        setMapElement(mapElement);
    }

    return (
        <div className="Rentals">
            {(!props.user && !props.loggingIn) && <Redirect to="/" />}
            <RemoveScrollBar />
            <Container>

                <HeaderWrapper>
                    <Header />
                </HeaderWrapper>

                <SidebarWrapper>
                    <Sidebar />
                </SidebarWrapper>

                <MapWrapper>
                    <Map rentals={props.rentals} handleClickScroll={handleClickScroll} onMapElementChange={setGlobalMap} />
                </MapWrapper>

                <FeedWrapper>
                    <Feed
                        user={props.user}
                        rentals={props.rentals}
                        loading={props.loading}
                        ids={props.ids}
                        scrollKey={scrollKey}
                        allowposting
                        mapElement={map}
                    />
                </FeedWrapper>

            </Container>
        </div>
    );
}

const mapStateToProps = (state) => ({
    user: state.userState.user,
    loggingIn: state.userState.loggingIn,
    rentals: state.rentalState.rentals,
    loading: state.rentalState.loading,
    ids: state.rentalState.ids,
});

const mapDispatchToProps = (dispatch) => ({
    getUserAuth: () => dispatch(getUserAuth()),
    getRentals: () => dispatch(getRentalsAPI()),
    setActiveTab: (tab) => dispatch(setActiveTab(tab)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Rentals);
