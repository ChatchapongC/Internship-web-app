import './Joblist.scss';
import React, { Component } from 'react';
import { useState} from "react";
import useFetch from "react-fetch-hook"
import VannessLogo from '../img/vanness_logo.jpg'

class Joblist extends Component{
    constructor(props) {
        super(props);
        // this.state = {dataList: [], isLoading: true};
        console.log(props);
    }
    // let dataList = {this.poops};

    // const [searchText, setSearchText] = useState('');
    // const [data, setData] = useState(dataList);

    // const excludeColumns = ['Position'];

    // async componentDidMount() {
    //     fetch('/api/job/1')
    //   .then(response => response.json())
    //   .then(data => this.setState({dataList: data, isLoading: false}));
    // }

    // handleChange = value => {
    //     setSearchText(value);
    //     filterData(value);
    // }

    // filterData = value => {
    //     const lowerCaseValue = value.toLowerCase().trim();
    //     if (!lowerCaseValue) {
    //         setData(dataList);
    //     }
    //     else {
    //         const filteredData = dataList.filter( item => {
    //             return Object.keys(item).some(key => {
    //                 return excludeColumns.includes(key) ? false: item[key].toString().toLowerCase().includes(lowerCaseValue);
    //             })
    //         });
    //         setData(filteredData);
    //     }
    // }

    render() {
        // const {dataList, isLoading} = this.state;
        const dataList = this.props.jobList;
        console.log(dataList);
        
    return (
        
        <div className="Box">
            {/* Search: <input 
                type = "text"
                placeholder = "Type to search..." 
                value = {searchText}
                onChange = {e => handleChange(e.target.value)}
            /> */}

            <div className="box-container">
                {dataList.map((d) => {
                return <div className="box" key={d.id}>
                    <em>{d.title}</em><br/>
                    <b>Comapny name:</b>{d.business_name}<br/>
                    <b> Position: </b>{d.avaliable_position}<br/>
                    {/* <img src = {d.logo}/>
                    <em>{d.Title}</em><br/>
                    <b>Comapny name:</b>{d.business_name}<br/>
                    <b> Position: </b>{d.title}<br/>
                    <b> Available: </b>{d.Amount == 1 ? (
                            d.Amount + ' position'
                    ):(d.Amount +  ' position(s)' )}<br/>
                    <b> Allowance: </b>{d.benefit}฿/day<br/> */}
                </div>
                })} 
                <div className="clearboth"></div>
                {/* {this.props.dataList.length === 0 && <span>No records found to display!</span>} */}
            </div>
        </div>
    )
}
}
export default Joblist;

