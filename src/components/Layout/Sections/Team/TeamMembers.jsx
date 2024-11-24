import React, { Component } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import TeamData from"./TeamData";
import "./Team.css";

class TeamMembers extends Component {
    render() {
        const settings = {
            
            infinite: false,
            speed: 300,
            rows: 4,
            slidesToShow: 3,
            slidesToScroll: 3,
            responsive: [
              {
                breakpoint: 1024,
                settings: {
                  slidesToShow: 3,
                  slidesToScroll: 3
                }
              },
              {
                breakpoint: 767,
                settings: {
                  slidesToShow: 2,
                  slidesToScroll: 2
                }
              },
              {
                breakpoint: 480,
                settings: {
                  slidesToShow: 1,
                  slidesToScroll: 1
                }
              }
            ]
        }

        return (
            <div>
                <section id="section6">
                    <div className="container">
                        <div className="title-1 mb-5">
                            <h5 className="title">
                                <span>The</span> Team
                            </h5>
                        </div>
                        <div className="team-members-carousel">
                            <Slider {...settings}>    
                                    { TeamData.map((member) => {
                                        
                                        let memberAvatar = member.avatar !=="" ? 
                                        `https://www.crypto-bliz.io/img/team-members/${member.avatar}` : 
                                        "https://www.crypto-bliz.io/img/team-members/blank-avatar.jpg"

                                        if(member.isSpecialAvatar) {
                                            memberAvatar = member.avatar
                                        }

                                        return (
                                            <div  key={member.name} >
                                                <div className="d-flex align-items-center flex-column justify-content-center h-1">
                                                    <img className="avatar" src={memberAvatar} />
                                                    <a href={member.url} >
                                                        <span className="team-member__name">{member.name}</span>
                                                    </a>
                                                    <p className="team-member__desc text-center">{member.info}</p>
                                                </div>
                                            </div>
                                        )
                                    })}
                            </Slider>
                        </div>
                    </div>
                </section>
            </div>
        )
    }
}
export default TeamMembers;
