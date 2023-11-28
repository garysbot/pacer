import React, { useEffect } from "react";
import './UsersShow.css';
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchEvents } from "../../store/events";
import { useParams } from "react-router-dom";

export default function UsersShow(){

    const dispatch = useDispatch();
    const { userId } = useParams();
    // const userId = useSelector(state => state.user.id); 

    useEffect(() => {
        if (userId) {
            dispatch(fetch(userId)); 
        }
    }, [dispatch, userId]);

    return (
        <>
            <p>hello</p>
            <p>user.firstName</p>
        </>
    )
}
