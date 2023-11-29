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
    return (
        <>
            <section id="general-info">
                <h1>{shownUser.firstName} {shownUser.lastName}</h1> 
                <section id="sports">
                    Favorite Sport: {shownUser.primarySport["Sport"]}
                    <br/>
                    Experience Level: {shownUser.primarySport["Experience"]}
                </section>

            </section>
        </>
    )
}
