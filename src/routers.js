import react from 'react';
import { Switch, Route } from 'react-router-dom';

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

export default function Routes() {
    return (
        <Switch>
            <Route exact path="/" component={Principal} />

            <Route exact path="/categorias" component={CategoriaList} />
            <Route exact path="/categorias/new" component={CategoriaForm} />
            <Route exact path="/categorias/:ID" component={CategoriaForm} />

            <Route exact path="/produtos" component={ProdutoList} />
            <Route exact path="/produtos/new" component={ProdutoForm} />
            <Route exact path="/produtos/:ID" component={ProdutoForm} />

            <Route exact path="/usuarios" component={UserList} />
            <Route exact path="/usuarios/new" component={UserForm} />
            <Route exact path="/usuarios/:id" component={UserForm} />
        </Switch>

    )
}