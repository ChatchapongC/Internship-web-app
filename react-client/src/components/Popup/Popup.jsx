import React, { useState, useEffect, useRef } from 'react';

function Popup () {
    const [role, setRole] = useState(null);

    return (
        <div>
            <div class="testbox">
                <a class="btn" href="#popup1">Let me Pop up</a>
            </div>

            <div id="popup1" class="overlay">
                <div class="popup">
                    <h2>Here i am</h2>
                    <a class="close" href="#">&times;</a>
                    <div class="content">
			            Thank to pop me out of that button, but now i'm done so you can close this window.
		            </div>
                </div>
            </div>
        </div>

    )
}

export default Popup;