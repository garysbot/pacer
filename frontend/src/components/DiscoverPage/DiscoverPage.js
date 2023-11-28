import React from "react";
import './DiscoverPage.css'

export default function DiscoverPage(props){
    return (
        <>
            <main>
                <div className="discover-parent-container">
                    <div className="filter-container">
                        <form>                           
                            <h3>Filter</h3>
                            <p>Primary Sport</p>
                        </form>
                    </div>

                    <div className="index-container">
                        <div className="index-header">
                            <h2>Find an event near you</h2>
                        </div>

                        <div className="sport-filter-container">
                            <p className="sport-label">Running 🏃🏻‍♂️</p>
                            <p className="sport-label">Basketball 🏀</p>
                            <p className="sport-label">Weight Lifting 🏋️</p>
                            <p className="sport-label">Tennis 🎾</p>
                        </div>

                        <div className="event-container">
                            <div className="event-content">
                                <div className="event-header">
                                    <h3>Event Name</h3>
                                    <div className="event-icons">
                                        <p className="sport-label">🏃🏻‍♂️</p>
                                    </div>
                                </div>
 
                                <div className="date-time-location">
                                    <p>Tuesday 11/28/23</p>
                                    <p>Prospect Park</p>
                                    <p>Expert</p>
                                    <p>08 / 12 Attendees</p>
                                </div>
                                <div className="event-description">
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                </div>
                            </div>
                            
                            <div className="event-mini-map-container">
                                <img src='/static/temp-map.png' alt='map' />                            
                            </div>
                        </div>



                    </div>
                        

                </div>
            </main>
        </>
    )
}