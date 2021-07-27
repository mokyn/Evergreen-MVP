import React, { useState, useEffect } from "react";

interface ProgressBarProps {
    barLength: number;
    progressPercent: number;
  }  

const ProgressBar: React.FC<ProgressBarProps> = (props) => {
    const [progressBarLength, setProgresBarLength] = useState(0);
  
    // runs every time the component rerenders
    useEffect(() => {
      setProgresBarLength(props.progressPercent * props.barLength);
    }, [props.progressPercent, props.barLength]);
  
    const progressBarStyle = {
      backgroundColor: "rgb(233, 233, 233)",
      borderRadius: "0.5rem",
      width: `${props.barLength}px`,
    };
  
    const filledProgressBarStyle = {
      backgroundColor: "rgb(62, 122, 235)",
      height: "10px",
      borderRadius: "1rem",
      width: `${progressBarLength}px`,
      // animation
      transition: "1s ease",
    };
  
    return (
      <div>
        <div style={progressBarStyle}>
          <div style={filledProgressBarStyle} />
        </div>
      </div>
    );
  };

export default ProgressBar;