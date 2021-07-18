import React from 'react';
import './loading.scss';

export default function LoadingIndicator(props) {
    return (
        <div className="loading-container">
            <div className="loading">
                <div className="dot"></div>
                <div className="dot"></div>
                <div className="dot"></div>
                <div className="dot"></div>
                <div className="dot"></div> 
            </div>
        </div>
        
    );
}