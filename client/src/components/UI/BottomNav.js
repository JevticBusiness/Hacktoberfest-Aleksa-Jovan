import React from 'react';

//* Material compontents
import { makeStyles, createMuiTheme, ThemeProvider  } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';

//* Icons 
import HomeIcon from '@material-ui/icons/Home';
import ExploreIcon from '@material-ui/icons/Explore';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

import { Link } from 'react-router-dom';

const useStyles = makeStyles({
    root: {
        height: '75px',
        width: '100%',
        backgroundColor: '#202020',
        "&$selected": {
            color: 'red'
        }
    },
    selected: {},
    link: {
        color: '#fff'
    }
});

export const navTheme = createMuiTheme({
    palette: {
        primary: {
            main: '#f50057'
        },
        text: {
            secondary: '#fff'
        }
    }
})

export default function LabelBottomNavigation() {
  const classes = useStyles();
  const [value, setValue] = React.useState('home');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <ThemeProvider theme={navTheme}>
      <div className="bottomNav">
            <BottomNavigation showLabels={true} value={value} onChange={handleChange} color="secondary" className={classes.root}>
                <BottomNavigationAction className={classes.link} component={Link} to="/" label="Home" value="home" icon={<HomeIcon />} />
                <BottomNavigationAction className={classes.link} component={Link} to="/explore" label="Explore" value="explore" icon={<ExploreIcon />} />
                <BottomNavigationAction className={classes.link} component={Link} to="/upload" label="Upload" value="upload" icon={<AddCircleIcon />} />
                <BottomNavigationAction className={classes.link} component={Link} to="/profile" label="Account" value="account" icon={<AccountCircleIcon />} />
            </BottomNavigation>
      </div>
    </ThemeProvider>
  );
}