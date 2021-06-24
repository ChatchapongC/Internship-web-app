import { useState, useStste } from "react";

export function Box(){
    const dataList = [
        {
            "Title" : "Require IT/Programmer Intern",
            "Position" : "Programmer",
            "Company" : "Vanness Plus Consulting",
            "Amount" : 1,
            "Budget" : 150,
            "color" : "#98B2D1",
            "pantone_value" : "15-4020" 
        },
        {
            "Title" : "Require IT/Programmer Intern",
            "Position" : "Accounting",
            "Company" : "Vanness Plus Consulting",
            "Amount" : 1,
            "Budget" : 150,
            "color" : "#C74375",
            "pantone_value" : "17-2031" 
        },
        {
            "Title" : "Require IT/Programmer Intern",
            "Position" : "Programmer",
            "Company" : "Vanness Plus Consulting",
            "Amount" : 1,
            "Budget" : 150,
            "color" : "#98B2D1",
            "pantone_value" : "15-4020"  
        },
        {
            "Title" : "Require IT/Programmer Intern",
            "Position" : "Accounting",
            "Company" : "Vanness Plus Consulting",
            "Amount" : 1,
            "Budget" : 150,
            "color" : "#C74375",
            "pantone_value" : "17-2031" 
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
            Search: <input 
                type = "text"
                placeholder = "Type to search..." 
                value = {searchText}
                onChange = {e => handleChange(e.target.value)}
            />

            <div className="box-container">
                {data.map((d,i) => {
                return <div className="box" key={i} style={{ backgroundColor : d.color }}>
                    <b> Name: </b>{d.name}<br/>
                    <b> Year: </b>{d.year}<br/>
                    <b> Color: </b>{d.color}<br/>
                    <b> Pantone value: </b>{d.pantone_value}<br/>
                </div>
                })}
                <div className="clearboth"></div>
                {data.length === 0 && <span>No records found to display!</span>}
            </div>
        </div>
    )
}

export default Box;

