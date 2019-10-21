import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';

import Home from '~/pages/Home';
import Contacts from '~/pages/Contacts';
import Extract from '~/pages/Extract';
import Profile from '~/pages/Profile';
import SignIn from '~/pages/SignIn';
import SignUp from '~/pages/SignUp';
import Transfer from '~/pages/Transfer';
import CreateContacts from '~/pages/Contacts/create';

export default function Routes() {
    return (
        <Switch>
            <Route path="/login" component={SignIn} />
            <Route path="/register" component={SignUp} />

            <Route path="/" exact component={Home} isPrivate />
            <Route path="/contacts" exact component={Contacts} isPrivate />
            <Route
                path="/contacts/create"
                component={CreateContacts}
                isPrivate
            />
            <Route path="/extract" component={Extract} isPrivate />
            <Route path="/transfer" component={Transfer} isPrivate />
            <Route path="/profile" component={Profile} isPrivate />
        </Switch>
    );
}
