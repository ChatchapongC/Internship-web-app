import React from 'react';
import './loading.scss';

export default function LoadingIndicator(props) {
    return (
        <div className="loading-container">
            <div class="loading">
                <div class="dot"></div>
                <div class="dot"></div>
                <div class="dot"></div>
                <div class="dot"></div>
                <div class="dot"></div> 
            </div>
        </div>
        
    );
}