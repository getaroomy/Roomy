import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import Header from './Misc/Header';
import Sidebar from './Misc/Sidebar';
import { getUserAuth, setActiveTab } from '../action';
import RoommateFeed from './Roommates/RoommateFeed';

function Roommates(props) {
    useEffect(()=>{
        props.setActiveTab('Roommates');
    });

    return (
        <div className="Roommates">
            {(!props.user && !props.loggingIn) && <Redirect to="/" />}
            <Header />
            <Sidebar />
            <RoommateFeed />
        </div>
    );
}

const mapStateToProps = (state) => ({
    user: state.userState.user,
    loggingIn: state.userState.loggingIn,
});

const mapDispatchToProps = (dispatch) => ({
    getUserAuth: () => dispatch(getUserAuth()),
    setActiveTab: (tab) => dispatch(setActiveTab(tab)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Roommates);
