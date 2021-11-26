import React, { useState, useEffect } from "react";
import { getCompanyById } from "../../api/CompanyAPI";
import profileLogo from '../../img/profile-logo.png'
import './profile.scss';

const CompanyProfile = (props) => {

    const companyId = props.match.params.id;

    const [company, setCompany] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            const result = await getCompanyById(companyId);
            setLoading(false);
            setCompany(result);
        };
        fetchData();
    }, [companyId]);

    return (
        <div className="profile-container">
            <div className="container">
                <div className="profile-info">
                    <div className="profile-avatar">
                        {
                            company.logo ? (
                                <img src={company.logo} alt="" />
                            ) : (
                                <img src={profileLogo} alt="default"></img>
                            )
                        }
                    </div>
                    <div className="profile-name">

                        <h2>{company.companyName}</h2>

                        <p className="profile-email">{company.typeOfBusiness}</p>
                    </div>
                </div>
            </div>

        </div>
    );
}


export default CompanyProfile;