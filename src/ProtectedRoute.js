import { Route, Redirect} from 'react-router-dom'
import React, {Component} from 'react';

const PrivateRoute = ({component: Component, authUser, ...rest}) =>{
    console.log(authUser);
    return(
        <Route {...rest}
        render={props => authUser ?
        (<Component {...props}/> ) : 
        <Redirect to={{ pathname: "/about", state: {from: props.location}}}/>
    }
        />
    )
}

export default PrivateRoute;