import React from 'react';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ThumbUp from '@material-ui/icons/ThumbUp';
import Star from '@material-ui/icons/Star';
import BugReport from '@material-ui/icons/BugReport'
import AccessibleForward from '@material-ui/icons/AccessibleForward';
import Typography from '@material-ui/core/Typography';
import './aboutPage';
import { ListItemText } from '@material-ui/core';

class AboutPageListItem extends React.Component {

    render() {
        return (
            <ListItem>
                <ListItemAvatar>
                    <Star />
                </ListItemAvatar>
                <ListItemText
                    primary="ABOUT HAILIN"
                    secondary={
                        <React.Fragment>
                            <Typography
                                component="span"
                                variant="body2"
                                color="textPrimary"
                            >
                                TODO
                            </Typography>
                        </React.Fragment>
                    }
                >
                </ListItemText>
            </ListItem>
        )
    }
}

export default AboutPageListItem;