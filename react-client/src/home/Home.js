import React, { Component } from 'react';
import { homeObjOne, homeObjTwo, homeObjThree, homeObjFour } from './Data';
import { InfoSection } from '../components/InfoSection/InfoSection';
import SearchBar from '../search/SearchBar'
import Data from '../Data.json';
import JobHighlight from '../Recommend/jobHighlight.jsx';

class Home extends Component {


    render() {

        return (
            <>
            
            <SearchBar data={Data}/>
            <JobHighlight/>
            <InfoSection {...homeObjOne} />
            <InfoSection {...homeObjTwo} />
            <InfoSection {...homeObjThree} />
            <InfoSection {...homeObjFour} />
             </>
            )
    }
}

export default Home;