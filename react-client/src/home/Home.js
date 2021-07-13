import React, { Component } from 'react';
import { homeObjOne, homeObjTwo, homeObjThree, homeObjFour } from './Data';
import { InfoSection } from '../components/InfoSection/InfoSection';
import { RecommendBar } from '../Recommend/RecommendBar';
import SearchBar from '../search/SearchBar'
import Data from '../Data.json';

class Home extends Component {


    render() {

        return (
            <>
            
            <SearchBar data={Data}/>
            <InfoSection {...homeObjOne} />
            <RecommendBar/>
            <InfoSection {...homeObjTwo} />
            <InfoSection {...homeObjThree} />
            <InfoSection {...homeObjFour} />
             </>
            )
    }
}

export default Home;