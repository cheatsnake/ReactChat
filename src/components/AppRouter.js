import React, {useContext} from 'react';
import { Route, Switch, Redirect } from 'react-router';
import { Context } from '../index';
import { privateRoutes, publicRoutes } from '../routes';
import { CHAT_ROUTE, LOGIN_ROUTE } from '../utils/consts';
import {useAuthState} from 'react-firebase-hooks/auth';


const AppRouter = () => {
    const {auth} = useContext(Context);
    const [user] = useAuthState(auth);

    return user ? 
        (
            <Switch>
                {privateRoutes.map(({path, Component}) => 
                     <Route key={path} path={path} component={Component} exact/>
                )}
                {/* Выполняется если пользователь переходит по не существующим ссылкам */}
                <Redirect to={CHAT_ROUTE}/>
            </Switch>
        )
        :
        (
            <Switch>
                {publicRoutes.map(({path, Component}) => 
                     <Route key={path} path={path} component={Component} exact/>
                )}
                <Redirect to={LOGIN_ROUTE}/>
            </Switch>
        )
};

export default AppRouter;