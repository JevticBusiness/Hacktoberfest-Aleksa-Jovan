import React from 'react'

import { Link } from 'react-router-dom'

import { 
    MenuList, MenuItem
} from '@material-ui/core'
import { makeStyles, ThemeProvider  } from '@material-ui/core/styles'

//* Icons 
import HomeIcon from '@material-ui/icons/Home';
import ExploreIcon from '@material-ui/icons/Explore';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

const sidebarStyles = makeStyles({
    menuItem: {
        color: '#fafafa',
        height: '55px',
        display: 'flex',
    }
});

const Sidebar = () => {
    const classes = sidebarStyles();

    return(
        <div className="sidebar">
            <div className="gap"></div>
            <MenuList>
                <MenuItem className={classes.menuItem} component={ Link } to="/">
                    <HomeIcon color="secondary" /> Home
                </MenuItem>
                <MenuItem className={classes.menuItem} component={ Link } to="/explore">
                    <ExploreIcon style={{color: 'green[500]'}} />
                </MenuItem>
                <MenuItem className={classes.menuItem} component={ Link } to="/upload">
                    <AddCircleIcon />
                </MenuItem>
            </MenuList>
        </div>
    )
}   

export default Sidebar