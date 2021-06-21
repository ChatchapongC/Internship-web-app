import React, { Component } from 'react';
import { homeObjOne, homeObjTwo, homeObjThree, homeObjFour } from './Data';
import { InfoSection } from '../components/InfoSection/InfoSection';


class Home extends Component {
    render() {
        return (
            <>
            <InfoSection {...homeObjOne} />
            <InfoSection {...homeObjTwo} />
            <InfoSection {...homeObjThree} />
            <InfoSection {...homeObjFour} />
             </>
            )
    }
}

export default Home;