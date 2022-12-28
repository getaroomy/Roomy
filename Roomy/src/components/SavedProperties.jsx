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

function SavedProperties(props) {
    const [scrollKey, setScrollKey] = useState(0);
    const [rentals, setRentals] = useState([]);
    const [ids, setIds] = useState([]);


    useEffect(() => {
        props.getRentals();
        props.setActiveTab('Saved Properties');
    }, []);

    useEffect(()=>{
        setRentals(getSavedRentals());
        setIds(getSavedIds());
    },[props.rentals]);

    function handleClickScroll(key) {
        setScrollKey(key);
    }

    const savedProperties = props.user ? props.user.userInfo.savedProperties : null;

    function getSavedIds() {
        return savedProperties;
    }

    function getSavedRentals() {
        if (props.rentals && savedProperties) {
            return props.rentals.filter((_, key) => (savedProperties && savedProperties.includes(props.ids[key])));
        } else {
            return [];
        }
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
                    <Map rentals={rentals} handleClickScroll={handleClickScroll} />
                </MapWrapper>

                <FeedWrapper>
                    <Feed
                        user={props.user}
                        rentals={rentals}
                        loading={props.loading}
                        ids={ids}
                        scrollKey={scrollKey}
                        allowposting={false}
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

export default connect(mapStateToProps, mapDispatchToProps)(SavedProperties);
