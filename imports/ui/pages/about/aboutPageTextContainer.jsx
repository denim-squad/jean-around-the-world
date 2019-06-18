import React from 'react';
import './aboutPage';
import { Container, List } from '@material-ui/core';
import AboutPageListItem from './aboutPageListItem';

const hailinInfo = {
    name: "HAILIN",
    github: "#",
    linkedIn: "#",
    picturePath: "#"
}

const jessicaInfo = {
    name: "JESSICA",
    github: "#",
    linkedIn: "#",
    picturePath: "#"
}

const johnInfo = {
    name: "JOHN",
    github: "#",
    linkedIn: "#",
    picturePath: "#"
}

const wesleyInfo = {
    name: "WESLEY",
    github: "#",
    linkedIn: "#",
    picturePath: "#"
}



class AboutPageTextContainer extends React.Component {
    render() {
        return (
            <Container className="about-page-text-container">
                <h2>ABOUT THIS PROJECT</h2>
                <p>TODO</p>
                <h2>ABOUT US</h2>
                <List>
                    <AboutPageListItem info={hailinInfo}/>
                    <AboutPageListItem info={jessicaInfo}/>
                    <AboutPageListItem info={johnInfo}/>
                    <AboutPageListItem info={wesleyInfo}/>
                </List>
            </Container>
        )
    }
}

export default AboutPageTextContainer;