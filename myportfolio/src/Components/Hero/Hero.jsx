import React, { useEffect, useRef, useState } from "react";
import "./Hero.css";
import profile from "../../assets/profile-img.jpg";
import AnchorLink from "react-anchor-link-smooth-scroll";

const Hero = () => {
  const heroRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true); // Section is in view
        }
      },
      { threshold: 0.1 } // Trigger when 10% of the hero section is visible
    );

    if (heroRef.current) {
      observer.observe(heroRef.current);
    }

    return () => {
      if (heroRef.current) {
        observer.unobserve(heroRef.current);
      }
    };
  }, []);

  return (
    <div
      id="home"
      className={`hero ${isVisible ? "visible" : ""}`} // Add the "visible" class when in view
      ref={heroRef}
    >
      <div className="hero-container">
        <img src={profile} alt="Profile" />
      </div>
      <h1>
        <span>I'm Chika Favor,</span> frontend developer based in Nigeria.
      </h1>
      <p>
       I specialize in crafting seamless, user-friendly, and visually stunning web experiences.
      </p>
      <div className="hero-action">
        <div className="hero-connect">
           <AnchorLink className="anchor-link" offset={50} href="#contact">
              Connect with Me
           </AnchorLink>
        </div>
        <div className="hero-resume">My Resume</div>
      </div>
    </div>
  );
};

export default Hero;
