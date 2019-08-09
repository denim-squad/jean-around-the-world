/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import '../about.page.css';
import { Container, List } from '@material-ui/core';
import AboutPageListItem from './aboutPageListItem';

const hailinInfo = {
  name: 'HAILIN',
  github: 'https://github.com/hailin-zhang',
  linkedIn: 'https://www.linkedin.com/in/hai-lin-zhang/',
  email: 'mailto:hzhan339@hotmail.com',
  picturePath: '/hailin-profile.svg',
  description: 'Hai Lin is a 3rd year CS student at the University of British Columbia. He currently works at Fatigue Science as a part-time Junior Software Engineer, where he did his first co-op work term for 8 months. He enjoys front-end web development and created the UI for the home and preferences pages, the navbar, the loading spinner, as well as the Google Maps integrations for this website.',
};

const jessicaInfo = {
  name: 'JESSICA',
  github: 'https://github.com/jvssicawu',
  linkedIn: 'https://www.linkedin.com/in/jvssicawu/',
  email: 'mailto:jessicawu.98@hotmail.ca',
  picturePath: '/jessica-profile.svg',
  description: 'Jessica is a computer science major who just finished up her 3rd year at UBC. She has a huge passion for design and development, and is always looking for opportunities to dabble in both areas as the current design director behind hackathon club nwPlus and as an incoming software developer co-op @ Hootsuite. She led the UI and UX design behind this web application, and implemented some of the core functionality such as the login, signup, and calendar export.',
};

const johnInfo = {
  name: 'JOHN',
  github: 'https://github.com/js1998',
  linkedIn: 'https://www.linkedin.com/in/john-sastrillo-3996a3155/',
  email: 'mailto:john.sastrillo@gmail.com',
  picturePath: '/john-profile.svg',
  description: 'John is an entering 3rd year Honours Computer Science major at UBC. His main passions are in algorithm analyis, videogame development, and graphics. He has done previous software engineering internships in Academia with the UBC Sensory, Perception, and Interaction Laboratory and in industry with Trulioo. He worked on research and implementation of the algorithms for filtering locations and generating the path for a trip, redux calls to the database for a users preferences/previous trips, and the users profile page.',
};

const wesleyInfo = {
  name: 'WESLEY',
  github: 'https://github.com/pwesferguson',
  linkedIn: 'https://www.linkedin.com/in/wesley-ferguson-6a682214a/',
  email: 'mailto:pwesferguson@gmail.com',
  picturePath: '/wesley-profile.svg',
  description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis vitae vehicula metus. Vestibulum ornare ante at urna egestas bibendum. Maecenas rhoncus eros non nisi suscipit dapibus. Suspendisse tincidunt ex metus, vel mollis eros dapibus sed. Cras ipsum neque, mattis sed nibh eu, lobortis rhoncus lorem. Donec non nunc nec tellus finibus ornare. Vivamus laoreet, nulla vel ullamcorper pretium, est nisl tincidunt quam, pellentesque sollicitudin purus elit dictum arcu. Quisque velit est, lobortis ut quam vitae, ultricies mollis eros. Ut mattis id nisl vel bibendum. Donec elementum, nulla a malesuada placerat, felis enim interdum nulla, sit amet tincidunt justo leo quis diam. Proin ut dolor ut quam tempor blandit id at sapien.',
};

class AboutPageTextContainer extends React.Component {
  render() {
    return (
      <Container className="about-page-text-container">
        <div className="about-page-project-description">
          <div className="about-project-title">ABOUT THIS PROJECT</div>
          <div className="about-project-description">
            Jean Around the World is a web application which takes the effort out of trip planning.
            You can select a destination somewhere in the world, choose how you'd like your trip to be, and instantly receive a suggested itinerary.
            If you're planning to go on vacation, looking for a good deal, or are interested in quickly getting personalized trip ideas, Jean Around the World is for you!
          </div>
          <br />
          <div className="about-us">ABOUT US</div>
        </div>
        <List>
          <AboutPageListItem info={hailinInfo} />
          <AboutPageListItem info={jessicaInfo} />
          <AboutPageListItem info={johnInfo} />
          <AboutPageListItem info={wesleyInfo} />
        </List>
      </Container>
    );
  }
}


export default AboutPageTextContainer;
