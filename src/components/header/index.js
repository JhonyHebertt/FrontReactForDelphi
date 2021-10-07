import React, { useContext } from 'react';
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
        <nav className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
            <a className="navbar-brand col-md-1 col-lg-2 mr-0 px-3" href="#">JHC Sistemas</a>
            <button className="navbar-toggler position-absolute d-md-none collapsed" type="button" data-toggle="collapse" data-target="#sidebarMenu" aria-controls="sidebarMenu" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            {/*<input className="form-control form-control-dark w-100" type="text" placeholder="Search" aria-label="Search" />*/}
            <ul className="navbar-nav px-3">
                <li className="nav-item text-nowrap">
                    <span className="nav-link" >
                        {logado ? <a onClick={fDeslogar}> Sair </a> : <a> </a>}
                    </span>
                </li>
            </ul>
        </nav>
    )
}