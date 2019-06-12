import React from 'react';
import Container from '@material-ui/core/Container';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import {SvgIcon} from '@material-ui/icons';
import ThumbUp from '@material-ui/icons/ThumbUp';
import Star from '@material-ui/icons/Star';
import BugReport from '@material-ui/icons/BugReport'
import AccessibleForward from '@material-ui/icons/AccessibleForward';
import Typography from '@material-ui/core/Typography';
import './aboutPage';
import { ListItemText, ListItemSecondaryAction, IconButton } from '@material-ui/core';


class AboutPageTextContainer extends React.Component {
    render() {
        return (
            <Container className="about-page-text-container">
                <h1>ABOUT THIS PROJECT</h1>
                <p>TODO</p>
                <h1>ABOUT US</h1>
                <List>
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
                        <ListItemSecondaryAction>
                            <IconButton>
                                {/*todo*/}
                            </IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>
                    <ListItem>
                        <ListItemAvatar>
                            <ThumbUp />
                        </ListItemAvatar>
                        <ListItemText
                            primary="ABOUT JESSICA"
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
                    <ListItem>
                        <ListItemAvatar>
                            <BugReport />
                        </ListItemAvatar>
                        <ListItemText
                            primary="ABOUT JOHN"
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
                    <ListItem>
                        <ListItemAvatar>
                            <AccessibleForward />
                        </ListItemAvatar>
                        <ListItemText
                            primary="ABOUT WESLEY"
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
                </List>
            </Container>
        )
    }
}

export default AboutPageTextContainer;