import React from 'react';
import Container from '@material-ui/core/Container';
import './aboutPage'


class AboutPageTextContainer extends React.Component {
    render() {
        return (
            <div className="about-page-text-container">
                    <Container>
                        <h1>ABOUT THIS PROJECT</h1>
                        <p>TODO</p>
                    </Container>
                    <Container>
                        <h1>ABOUT US</h1>
                        <div>
                            <h3>ABOUT HAILIN</h3>
                            <p>TODO</p>
                        </div>
                        <div>
                            <h3>ABOUT JESSICA</h3>
                            <p>TODO</p>
                        </div>
                        <div>
                            <h3>ABOUT JOHN</h3>
                            <p>TODO</p>
                        </div>
                        <div>
                            <h3>ABOUT WESLEY</h3>
                            <p>TODO</p>
                        </div>
                    </Container>
            </div>
        )
    }
}

export default AboutPageTextContainer;