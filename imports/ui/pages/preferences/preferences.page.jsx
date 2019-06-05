import React from 'react';
import Navbar from '../../shared_components/navbar/navbar';
import './preferences.page.css';

const images = [
    "/grand_canyon.svg",
    "/lighthouse.svg",
    "/japan.svg",
    "/greece.svg",
    "/eiffel_tower.svg",
    "/london.svg",
    "/ski.svg",
    "/venice.svg",
    "/china.svg",
    "/new_york.svg",
];

class PreferencesPage extends React.Component {
  
    constructor() {
        super();
        this.state = { 
            imgPath: "url(" + images[~~(Math.random() *10)] + ")" 
        };
    }
  
    render() {
        return <div className="preferences-page-container">
            <Navbar />
            <div className="preferences-background" style={{ backgroundImage: this.state.imgPath }}>
            </div>
        </div>
    }
}

export default PreferencesPage;
