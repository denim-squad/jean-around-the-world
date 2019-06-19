import React from 'react';
import './about.page.css';
import { Container, List } from '@material-ui/core';
import AboutPageListItem from './aboutPageListItem';

class AboutPageTextContainer extends React.Component {
  render() {
    return (
      <Container className="about-page-text-container">
        <div className="about-page-project-description">
          <h2>ABOUT THIS PROJECT</h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis vitae vehicula metus. Vestibulum ornare ante at urna egestas bibendum. Maecenas rhoncus eros non nisi suscipit dapibus. Suspendisse tincidunt ex metus, vel mollis eros dapibus sed. Cras ipsum neque, mattis sed nibh eu, lobortis rhoncus lorem. Donec non nunc nec tellus finibus ornare. Vivamus laoreet, nulla vel ullamcorper pretium, est nisl tincidunt quam, pellentesque sollicitudin purus elit dictum arcu. Quisque velit est, lobortis ut quam vitae, ultricies mollis eros. Ut mattis id nisl vel bibendum. Donec elementum, nulla a malesuada placerat, felis enim interdum nulla, sit amet tincidunt justo leo quis diam. Proin ut dolor ut quam tempor blandit id at sapien.</p>
          <br />
          <h2>ABOUT US</h2>
        </div>
        <List>
          <AboutPageListItem info={hailinInfo} />
          <AboutPageListItem info={jessicaInfo} />
          <AboutPageListItem info={johnInfo} />
          <AboutPageListItem info={wesleyInfo} />
        </List>
      </Container>
    )
  }
}

const hailinInfo = {
  name: "HAILIN",
  github: "https://github.com/hailin-zhang",
  linkedIn: "https://www.linkedin.com/in/hai-lin-zhang/",
  picturePath: "/hailin-profile.svg"
};

const jessicaInfo = {
  name: "JESSICA",
  github: "https://github.com/jvssicawu",
  linkedIn: "https://www.linkedin.com/in/jvssicawu/",
  picturePath: "/jessica-profile.svg"
};

const johnInfo = {
  name: "JOHN",
  github: "https://github.com/js1998",
  linkedIn: "https://www.linkedin.com/in/john-sastrillo-3996a3155/",
  picturePath: "/john-profile.svg"
};

const wesleyInfo = {
  name: "WESLEY",
  github: "https://github.com/pwesferguson",
  linkedIn: "https://www.linkedin.com/in/wesley-ferguson-6a682214a/",
  picturePath: "/wesley-profile.svg"
};

export default AboutPageTextContainer;