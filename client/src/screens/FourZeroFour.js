import React from 'react'

import Error from '@material-ui/icons/Error'
import { makeStyles } from '@material-ui/core/styles'

const FourZeroFourStyles = makeStyles({
    icon: { 
        height: '100px',
        marginTop: '-100px'
    }
})

const FourZeroFour = () => {

    const classes = FourZeroFourStyles()

    return(
        <div className="feedRoute fourZeroFourScreen">
            <Error fontSize="large" className={classes.icon} color="secondary" />
            <p> 
                Sorry, the page you are looking for does not exist...
            </p>
        </div>
    )
}

export default FourZeroFour