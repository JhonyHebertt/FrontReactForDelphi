import { Switch, Route } from 'react-router-dom';

/*LOGIN */
import Login from './page/login';

/* DASHBOARD */
import Principal from './components/principal';

/*CATEGORIAS */
import CategoriaList from './components/categorias/list';
import CategoriaForm from './components/categorias/form';

/*PRODUTOS */
import ProdutoList from './components/produtos/list';
import ProdutoForm from './components/produtos/form';

/*USUARIOS*/
import UserList from './components/usuarios/list';
import UserForm from './components/usuarios/form';
import UserRegister from './page/register';


import PrivateRoute from './privateRoute';

export default function Routes() {
    return (
        <Switch>
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={UserRegister} />

            <PrivateRoute exact path="/" component={Principal} />

            <PrivateRoute exact path="/categorias" component={CategoriaList} />
            <PrivateRoute exact path="/categorias/new" component={CategoriaForm} />
            <PrivateRoute exact path="/categorias/:id" component={CategoriaForm} />

            <PrivateRoute exact path="/produtos" component={ProdutoList} />
            <PrivateRoute exact path="/produtos/new" component={ProdutoForm} />
            <PrivateRoute exact path="/produtos/:id" component={ProdutoForm} />

            <PrivateRoute exact path="/usuarios" component={UserList} />
            <PrivateRoute exact path="/usuarios/new" component={UserForm} />
            <PrivateRoute exact path="/usuarios/:id" component={UserForm} />
        </Switch>

    )
}