import './Joblist.scss';
import { getCurrentJob } from '../util/APIUtils';
import { getCurrentUser } from '../util/APIUtils';
import { ACCESS_TOKEN } from '../constants';
import Alert from 'react-s-alert';
import React, { Component } from 'react';
import LoadingIndicator from '../common/LoadingIndicator';

import { useState} from "react";
import useFetch from "react-fetch-hook"
import VannessLogo from '../img/vanness_logo.jpg'

class Joblist extends Component{
    constructor(props) {
        super(props);
        this.state = {
            // authenticated: false,
            jobList: [{
              "id": 1,
              "title": "null",
              "business_name": "null",
              "jobtype": "null",
              "avaliable_position": "null",
              "tags": "null",
              "benefit": null,
              "location": "null",
              "upload_date": "null",
              "business": null
          },
          {
              "id": 2,
              "title": "null",
              "business_name": "null",
              "jobtype": "null",
              "avaliable_position": "null",
              "tags": "null",
              "benefit": null,
              "location": "null",
              "upload_date": "2019-12-31",
              "business": null
          },
          {
              "id": 3,
              "title": "null",
              "business_name": "null",
              "jobtype": "null",
              "avaliable_position": "null",
              "tags": "null",
              "benefit": null,
              "location": "null",
              "upload_date": "2019-12-31",
              "business": null
          },
          {
              "id": 4,
              "title": "null",
              "business_name": "null",
              "jobtype": "null",
              "avaliable_position": "null",
              "tags": "null",
              "benefit": null,
              "location": "null",
              "upload_date": "2019-12-31",
              "business": null
          },
          {
              "id": 5,
              "title": "null",
              "business_name": "null",
              "jobtype": "null",
              "avaliable_position": "null",
              "tags": "null",
              "benefit": null,
              "location": "null",
              "upload_date": "2019-12-31",
              "business": null
          },
          {
              "id": 6,
              "title": "null",
              "business_name": "null",
              "jobtype": "null",
              "avaliable_position": "null",
              "tags": "null",
              "benefit": null,
              "location": "null",
              "upload_date": "2019-12-31",
              "business": null
          },
          {
              "id": 7,
              "title": "null",
              "business_name": "null",
              "jobtype": "null",
              "avaliable_position": "null",
              "tags": "null",
              "benefit": null,
              "location": "null",
              "upload_date": "2019-12-31",
              "business": null
          },
          {
              "id": 8,
              "title": "null",
              "business_name": "null",
              "jobtype": "null",
              "avaliable_position": "null",
              "tags": "null",
              "benefit": null,
              "location": "null",
              "upload_date": "2019-12-31",
              "business": null
          },
          {
              "id": 9,
              "title": "null",
              "business_name": "null",
              "jobtype": "null",
              "avaliable_position": "null",
              "tags": "null",
              "benefit": null,
              "location": "null",
              "upload_date": "2019-12-31",
              "business": null
          },
          {
              "id": 10,
              "title": "null",
              "business_name": "null",
              "jobtype": "null",
              "avaliable_position": "null",
              "tags": "null",
              "benefit": null,
              "location": "null",
              "upload_date": "2019-12-31",
              "business": null
          }],
            loading: false
          }
        this.loadjobList = this.loadjobList.bind(this);

        // this.state = {dataList: [], isLoading: true};
        console.log(props);
    }
    // let dataList = {this.poops};

    loadjobList(){
        this.setState({
          loading: true
        });
        getCurrentJob()
        .then(response => {
          this.setState({
            jobList: response,
            //authenticated: true,
            loading: false
          });
        }).catch(error => {
          this.setState({
            loading: false
          });  
        });
    }

    
    async componentDidMount() {
      // this.loadCurrentlyLoggedInUser();
      this.loadjobList();
    }
    // const [searchText, setSearchText] = useState('');
    // const [data, setData] = useState(dataList);

    // const excludeColumns = ['Position'];

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
        if(this.state.loading) {
            return <LoadingIndicator />
        }
        const {jobList} = this.state;
        //const dataList = this.props.jobList;
        console.log(jobList);
        
    return (
        <div className="Box">
            {/* Search: <input 
                type = "text"
                placeholder = "Type to search..." 
                value = {searchText}
                onChange = {e => handleChange(e.target.value)}
            /> */}
            
            <div className="box-container">
                {jobList.map((d) => {
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

