import React, { useState, useContext } from 'react';
import { useHistory, Link } from 'react-router-dom';

import { AuthContext } from '../context/context';
import auth from '../services/auth';

export default function Login() {
    const { setLogado } = useContext(AuthContext);
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const principal = useHistory();
    const registrar = useHistory();

    function fLogar(e) {
        e.preventDefault();
        //ficou feio, mas funcionou...
        auth.post('/usuarios/auth', { "USERNAME": userName, "PASSWORD": password })
            .then((res) => {
                //console.log(res);
                localStorage.setItem("DelphiReactToken", res.data.token);
                setLogado(true);
                principal.push('/');
            })
            .catch((error) => {
                //console.log(error);
                setLogado(false);
            })
    }

    function fRegistrar() {
        registrar.push("/register");
    }

    return (
        <div className="container col-sm-4 d-flex align-items-center text-center">
            <form className="form-signin" onSubmit={fLogar}>
                <img className="mb-4" src="/src/img/bootstrap-solid.svg" alt="" width="72" height="72" />

                <h1 className="h3 mb-3 font-weight-normal">Login</h1>

                <label className="sr-only">Usuário</label>
                <input type="text" value={userName} onChange={(e) => setUserName(e.target.value)} className="form-control" placeholder="Usuário" required autoFocus="" />
                <br />

                <label className="sr-only">Senha</label>
                <input type="text" value={password} onChange={(e) => setPassword(e.target.value)} className="form-control" placeholder="Senha" required />
                <br />

                <button className="btn btn-lg btn-primary btn-block" type="submit">Logar</button>
                <button className="btn btn-lg btn-success btn-block" type="button" onClick={fRegistrar} >Registrar</button>

                <p className="mt-5 mb-3 text-muted">©JHC Sistemas-2021</p>
            </form>
        </div>
    )
}