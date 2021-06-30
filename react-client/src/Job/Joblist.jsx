import './Joblist.scss';
import { useState} from "react";

import VannessLogo from '../img/vanness_logo.jpg'

export function Joblist(){
    const dataList = [
        {
            "Title" : "Require IT/Programmer Intern",
            "Position" : "Programmer",
            "Company" : "Vanness Plus Consulting",
            "Amount" : 1,
            "Budget" : 150,
            "logo" : VannessLogo
        },
        {
            "Title" : "Require IT/Programmer Intern",
            "Position" : "Accounting",
            "Company" : "Vanness Plus Consulting",
            "Amount" : 1,
            "Budget" : 150,
            "logo" : VannessLogo
        },
        {
            "Title" : "Require IT/Programmer Intern",
            "Position" : "Programmer",
            "Company" : "Vanness Plus Consulting",
            "Amount" : 1,
            "Budget" : 150,
            "logo" : VannessLogo 
        },
        {
            "Title" : "Accounting Intern",
            "Position" : "Accounting",
            "Company" : "Vanness Plus Consulting",
            "Amount" : 2,
            "Budget" : 150,
            "logo" : VannessLogo
        },
    ];

    const [searchText, setSearchText] = useState('');
    const [data, setData] = useState(dataList);

    const excludeColumns = ['Position'];

    const handleChange = value => {
        setSearchText(value);
        filterData(value);
    }

    const filterData = value => {
        const lowerCaseValue = value.toLowerCase().trim();
        if (!lowerCaseValue) {
            setData(dataList);
        }
        else {
            const filteredData = dataList.filter( item => {
                return Object.keys(item).some(key => {
                    return excludeColumns.includes(key) ? false: item[key].toString().toLowerCase().includes(lowerCaseValue);
                })
            });
            setData(filteredData);
        }
    }

    return (
        <div className="Box">
            {/* Search: <input 
                type = "text"
                placeholder = "Type to search..." 
                value = {searchText}
                onChange = {e => handleChange(e.target.value)}
            /> */}

            <div className="box-container">
                {data.map((d,i) => {
                return <div className="box" key={i}>
                    <img src = {d.logo}/>
                    <em>{d.Title}</em><br/>
                    <b>Comapny name:</b>{d.Company}<br/>
                    <b> Position: </b>{d.Position}<br/>
                    <b> Available: </b>{d.Amount == 1 ? (
                            d.Amount + ' position'
                    ):(d.Amount +  ' position(s)' )}<br/>
                    <b> Allowance: </b>{d.Budget}฿/day<br/>
                </div>
                })}
                <div className="clearboth"></div>
                {data.length === 0 && <span>No records found to display!</span>}
            </div>
        </div>
    )
}

export default Joblist;

