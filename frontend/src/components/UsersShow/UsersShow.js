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
                            <h2>
                                {shownUser?.firstName} {shownUser?.lastName} 
                            </h2>
                            <h3>Gender: {shownUser?.gender}</h3>
                        </span>
                    <br/>
                        <span className="blur-header">
                            <h2>
                                Favorite Sport: 
                            </h2>
                            <h3>
                                {shownUser?.primarySport?.Sport}
                            </h3>                       
                        </span>
                        <br/>
                    <span className="blur-header">
                        <h2>
                            Experience Level: 
                        </h2>
                        <h3>
                            {shownUser?.primarySport?.Experience}
                        </h3>
                    </span>
                    <br/>
                    <span className="blur-header">
                        <h2>Secondary Sports</h2>
                        <h3>
                            {secondarySports}
                        </h3>
                    </span>
                </section>
                <section id="health-metrics">
                    <span className="blur-header">
                        <h2>Height: </h2>
                    <h3>{shownUser?.height}</h3>
                    </span>
                    <span className="blur-header">
                        <h2>Weight: </h2>
                    <h3>{shownUser?.weight}</h3>
                    </span>
                </section>


                <section id="social-metrics">
                    <span className="blur-header">
                        <h2>Social Metrics</h2>
                    </span>
                        <section id="friends">
                            <span className="blur-header">
                                <h2>friends</h2>

                            </span>
                        </section>
                        <section id="events-attended">
                            <span className="blur-header">
                                <h2>Events Attended</h2>
                            </span>
                        </section>
                </section>
            </section>
        </>
    )
}
