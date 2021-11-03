import React, { Component } from 'react';
import { homeObjOne, homeObjTwo, homeObjThree, homeObjFour } from './Data';
import { InfoSection } from '../components/InfoSection/InfoSection';
import SearchBar from '../components/SearchBar/SearchBar'
import Data from '../data/Data.json';
import JobHighlight from '../components/Job/JobHighlight.jsx';

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