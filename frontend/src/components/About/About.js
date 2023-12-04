import React from "react";
import './About.css'

import { ReactComponent as GithubIcon } from '../../icons/github.svg'
import { ReactComponent as LinkedinIcon } from '../../icons/linkedin.svg'
import { ReactComponent as EmailIcon } from '../../icons/email.svg'
import { ReactComponent as ResumeIcon } from '../../icons/resume.svg'

export default function About(){
    return (
        <div className="about-team-parent-container">
            <div className="about-team-content">
                <div className="about-team-header">

                    <h1>👋🏼 About Us</h1>
                    <p>
                        Welcome to Pacer, your go-to social hub for fitness enthusiasts! At Pacer, we believe that exercising is not just about breaking a sweat but also about building connections and having fun. Whether you're a seasoned fitness guru or just starting your wellness journey, Pacer is the perfect platform to find like-minded individuals eager to share their passion for health and fitness.
                    </p>
                    <span>- Jason, Rob, Francis, Gary, garysbot</span>
                </div>

                <div className="about-team-section">
                    {/* // ! Gary */ }
                    <div className="person-container">
                        <img src='/static/gary.jpeg' alt='' className="about-img"/>
                        <h2>Gary Jiang</h2>
                        <h3>Team & Frontend Lead</h3>
                        <p>
                            Formerly a director in corporate paid media, Gary is a full-stack developer with a passion for building products that make a difference. He is a graduate of Babson College with a BA in Business, Marketing, and Entrepreneurship.
                        </p>
                        <div className="team-link-icons">
                            <a href='https://github.com/garysbot' target="_blank" rel="noopener noreferrer" className="external-link">
                                <GithubIcon className="about-team-url-icon"/>
                            </a>
                            <a href='https://google.com' target="_blank" rel="noopener noreferrer" className="external-link">
                                <LinkedinIcon className="about-team-url-icon"/>
                            </a>
                            <a href='https://google.com' target="_blank" rel="noopener noreferrer" className="external-link">
                                <ResumeIcon className="about-team-url-icon"/>
                            </a>
                            <a href='https://google.com' target="_blank" rel="noopener noreferrer" className="external-link">
                                <EmailIcon className="about-team-url-icon"/>
                            </a>
                        </div>
                    </div>

                    {/* // ! Jason */ }
                    <div className="person-container">
                        <img src='/static/jason.jpeg' alt='' className="about-img"/>
                        <h2>Jason Jun</h2>
                        <h3>Frontend & Backend</h3>
                        <p>
                            Attended the University of Michigan, studying Computer Science Engineering. Worked two summers for a tech consulting company responsible for two different projects for maintaining and growing client base. Previous experience as a freelance frontend engineer before attending App Academy.
                        </p>
                        <div className="team-link-icons">
                            <a href='https://github.com/junjason' target="_blank" rel="noopener noreferrer" className="external-link">
                                <GithubIcon className="about-team-url-icon"/>
                            </a>
                            <a href='https://google.com' target="_blank" rel="noopener noreferrer" className="external-link">
                                <LinkedinIcon className="about-team-url-icon"/>
                            </a>
                            <a href='https://google.com' target="_blank" rel="noopener noreferrer" className="external-link">
                                <ResumeIcon className="about-team-url-icon"/>
                            </a>
                            <a href='https://google.com' target="_blank" rel="noopener noreferrer" className="external-link">
                                <EmailIcon className="about-team-url-icon"/>
                            </a>
                        </div>
                    </div>

                    {/* // ! Francis */ }
                    <div className="person-container">
                        <img src='/static/francis.jpg' alt='' className="about-img"/>
                        <h2>Francis Cawog</h2>
                        <h3>Backend Lead</h3>
                        <p>
                            Francis is a full-stack developer with a background in retail sales and photography. He is a graduate of City University of New York - Hunter College with a degree in Human Biology and is currently pursuing a career as a Full-Stack Web Developer. In his spare time, Francis enjoys traveling, football, and playing video games.
                        </p>
                        <div className="team-link-icons">
                            <a href='https://github.com/FrancisCawog' target="_blank" rel="noopener noreferrer" className="external-link">
                                <GithubIcon className="about-team-url-icon"/>
                            </a>
                            <a href='https://google.com' target="_blank" rel="noopener noreferrer" className="external-link">
                                <LinkedinIcon className="about-team-url-icon"/>
                            </a>
                            <a href='https://google.com' target="_blank" rel="noopener noreferrer" className="external-link">
                                <ResumeIcon className="about-team-url-icon"/>
                            </a>
                            <a href='https://google.com' target="_blank" rel="noopener noreferrer" className="external-link">
                                <EmailIcon className="about-team-url-icon"/>
                            </a>
                        </div>
                    </div>

                    {/* // ! Rob */ }
                    <div className="person-container">
                        <img src='/static/rob.jpg' alt='' className="about-img"/>
                        <h2>Rob Lee</h2>
                        <h3>Frontend & Backend</h3>
                        <p>
                            A seasoned developer with artistic sensibilities, Robert is ready to bring his diverse array of talents to the next project he works on.
                        </p>
                        <div className="team-link-icons">
                            <a href='https://github.com/DispicableLee' target="_blank" rel="noopener noreferrer" className="external-link">
                                <GithubIcon className="about-team-url-icon"/>
                            </a>
                            <a href='https://google.com' target="_blank" rel="noopener noreferrer" className="external-link">
                                <LinkedinIcon className="about-team-url-icon"/>
                            </a>
                            <a href='https://google.com' target="_blank" rel="noopener noreferrer" className="external-link">
                                <ResumeIcon className="about-team-url-icon"/>
                            </a>
                            <a href='https://google.com' target="_blank" rel="noopener noreferrer" className="external-link">
                                <EmailIcon className="about-team-url-icon"/>
                            </a>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    )
}