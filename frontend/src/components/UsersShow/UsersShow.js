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
    const shownUser = useSelector(state=>state.users?.user)
    // console.log(id)

    useEffect(()=>{
        dispatch(getUser(id))
    },[dispatch])


    const secondarySports = shownUser?.secondarySports?.map((sport)=>(
        <div className="secondary-sport">
            <h3>{sport.Sport}: {sport.Experience}</h3>
        </div>
    ))


    const userFriends = shownUser?.friends?.map((friend, index)=>(
        <span key={index} className="attendee-circle"></span>
    ))




    return (
        <>
            <section id="user-show-main">
                <section id="general-info">
                        <span className="blur-header">
                            <h1>
                                {shownUser?.firstName} {shownUser?.lastName} 
                            </h1>
                        </span>
                    <p>Gender: {shownUser?.gender}</p>
                    <br/>
                        <span className="blur-header">
                            <h2>
                                Favorite Sport: 
                            </h2>
                        </span>
                                <h3>
                                    {shownUser?.primarySport?.Sport}
                                </h3>                       
                        <br/>
                    <h2>Experience Level: {shownUser?.primarySport?.Experience}</h2>
                    <br/>
                    <h2>Secondary Sports</h2>
                        {secondarySports}
                </section>
                <section id="health-metrics">
                    <h3>Height: </h3>
                </section>
            </section>
        </>
    )
}
