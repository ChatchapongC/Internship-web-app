import React, { useState, useEffect } from "react";
import "../style/formstyle.scss";
import { verifyEmail } from "../api/UserAPI";
import Alert from "react-s-alert";
import Skeleton from '@material-ui/lab/Skeleton'
import { useHistory } from "react-router";

export default function EmailVerification(props) {

    const query = new URLSearchParams(props.location.search);
    const code = query.get('code');
    const [loading, setloading] = useState(true);
    const [emailVerify, setEmailVerify] = useState(false);
    const history = useHistory();
    
    useEffect(() => {
        const fetchData = async () => {
            const response = await verifyEmail(code)
            .then((response) => {
                Alert.success("Verify email successfull")
                setTimeout(() => history.push("/login"), 3000);
            });
          
           
        }
        fetchData();
    }, [code]);
    
    
    console.log(emailVerify)

    return (
        <>
            <div className="base-container">
                <div className="footer" />
                <div className="header">Email Verification</div>
                <div className="content">
                Successfull verify email <br/>
                waiting for redirect to login page
                </div>
            </div>
        </>
       
    );
}
