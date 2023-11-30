import React, { useEffect } from "react";
import './UsersShow.css';
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchEvents } from "../../store/events";
import { getUser } from "../../store/users";
import { useParams } from "react-router-dom";

export default function UsersShow(){

    const dispatch = useDispatch()
    const {id} = useParams()
    const shownUser = useSelector(state=>state.users.user)
    console.log(id)

    useEffect(()=>{
        dispatch(getUser(id))
    },[dispatch])


    const secondarySports = shownUser?.secondarySports?.map((sport)=>(
        <div className="secondary-sport">
            <h3>{sport.Sport}: {sport.Experience}</h3>
        </div>
    ))


    const userFriends = shownUser?.friends.map((friend, index)=>(
        <span key={index} className="attendee-circle"></span>
    ))




    return (
        <>
            <section id="user-show-main">
                <section id="general-info">
                    <h1>{shownUser?.firstName} {shownUser?.lastName}</h1> 
                    <br/>
                    <h2>Favorite Sport: {shownUser?.primarySport?.Sport}</h2>
                    <h3>Experience Level: {shownUser?.primarySport?.Experience}</h3>
                    <br/>
                    <h2>Secondary Sports</h2>
                        {secondarySports}
                </section>
                <section id="social-metrics">

                    <div className="friends-list">
                        
                    </div>
                </section>
            </section>
        </>
    )
}
