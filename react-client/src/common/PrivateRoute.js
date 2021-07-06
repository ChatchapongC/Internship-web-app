import React, { useEffect, useState } from 'react';
import {
    Route,
    Redirect,
  } from "react-router-dom";
import { getCurrentUser } from '../util/APIUtils';
import LoadingIndicator from './LoadingIndicator';


export const PrivateRoute = (props) => {
    const [loading, setLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const { component: Component, ...rest } = props;

    useEffect(() => {
        const fetchData = async () => {
            const result = await getCurrentUser();
            setIsAuthenticated(result);
            setLoading(false);
        };
        fetchData();
    }, []);

    return (
        <Route
            {...rest}
            render={() =>
                isAuthenticated ? (
                    <Component {...props} />
                ) : loading ? (
                    <LoadingIndicator/>
                ) : (
                    <Redirect
                        to={{
                            pathname: "/login",
                            state: { from: props.location },
                        }}
                    />
                )
            }
        />
    );
};
  
export default PrivateRoute
