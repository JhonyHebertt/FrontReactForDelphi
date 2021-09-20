import react from 'react';
import { Switch, Route } from 'react-router-dom';

import Principal from './components/principal';
import UserList from './components/users/list';
import UserForm from './components/users/form';
//import UserEdit from './components/users/edit';
//import UserNew from './components/users/new';

export default function Routes() {
    return (
        <Switch>
            <Route exact path="/" component={Principal} />
            <Route exact path="/users" component={UserList} />
            <Route exact path="/users/new" component={UserForm} />
            <Route exact path="/users/:id" component={UserForm} />
        </Switch>

    )
}