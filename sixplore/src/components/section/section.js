import React from 'react';
import './section.css'

export default function Section({
    children,
    className = "",
    style = [],
}) {
    return (
      <>
        <div className={`section ${className}`}
             style={{ ...style}}>
        
            <div className="section-container">
                {children}
            </div>
        </div>
      </>
    )
  }
  