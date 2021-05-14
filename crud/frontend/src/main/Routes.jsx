import React from 'react';
import { Switch, Route, Redirect } from 'react-router';

import Home from '../components/home/Home';
import ProductCrud from '../components/product/ProductCrud';

export default props =>
    <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/Produto' component={ProductCrud} />
        <Redirect from='*' to='/' />
    </Switch>