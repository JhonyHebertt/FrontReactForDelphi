import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import { AuthContext } from '../../context/context';


export default function Header() {
    const { logado, setLogado } = useContext(AuthContext);

    function fDeslogar() {
        localStorage.removeItem('DelphiReactToken');
        setLogado(false);
        //History/Link/Redirect não deram certo... Deve ser pq o componente MENU está antes das rotas ou algo do tipo.
        window.location.reload();
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-4">
            <a className="navbar-brand col-md-1 col-lg-2 mr-0 px-3" href="/">JHC Sistemas</a>


            <button className="navbar-toggler collapsed" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="navbar-collapse collapse" id="navbarCollapse" >
                <ul className="navbar-nav mr-auto px-3">
                    <li className="nav-item active">
                        {logado ? <Link className="nav-link active" to="/"> Principal </Link> : <p> </p>}
                    </li>

                    <li className="nav-item">
                        {logado ? <Link className="nav-link" to="/categorias"> Categorias </Link> : <p> </p>}
                    </li>

                    <li className="nav-item">
                        {logado ? <Link className="nav-link" to="/produtos"> Produtos </Link> : <p> </p>}
                    </li>

                    <li className="nav-item">
                        {logado ? <Link className="nav-link" to="/usuarios"> Usuários </Link> : <p> </p>}
                    </li>

                    <li className="nav-item text-nowrap ">
                        <span className="nav-link" >
                            {logado ? <p onClick={fDeslogar}> Sair </p> : <p> </p>}
                        </span>
                    </li>
                </ul>

            </div>
        </nav>
    )
}