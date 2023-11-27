import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { useDispatch } from "react-redux";

export default function EventForm({props}){
    const owner = useSelector(store => store.session.user._id)
    const [eventName, setEventName] = useState('')
    const [description, setDescription] = useState('')
    const [locationName, setLocationName] = useState('')
    const [dateTime, setDateTime] = useState('')
    const [type, setType] = useState('')
    return (
        <div>

        </div>
    )
}