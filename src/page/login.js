import React, { useState, useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import { AuthContext } from '../context/context';
import auth from '../services/auth';

import './login.css';

export default function Login() {
    const { logado, setLogado } = useContext(AuthContext);
    const [USERNAME, setUserName] = useState('');
    const [PASSWORD, setPassword] = useState('');
    const principal = useHistory();
    const registrar = useHistory();

    useEffect(() => {
        if (logado === true) {
            principal.push('/');
        }
    }, [logado, principal])

    function fLogar(e) {
        e.preventDefault();
        auth.post('/usuarios/auth', { USERNAME, PASSWORD })
            .then((res) => {
                //console.log(res);
                localStorage.setItem("DelphiReactToken", res.data.token);
                setLogado(true);
                window.location.reload();
            })
            .catch((error) => {
                //console.log(error);
                setLogado(false);
                alert('Usuario ou senha inválida!!!')
            })
    }

    function fRegistrar() {
        registrar.push("/register");
    }

    return (
        <div className="container-fluid col-sm-6 border border-primary">
            <div className="row d-flex justify-content-center text-center">
                <form className="form-signin " onSubmit={fLogar}>
                    <img className="mb-4" src="/src/img/bootstrap-solid.svg" alt="" width="72" height="72" />

                    <h1 className="h3 mb-3 font-weight-normal">Login</h1>

                    <label className="sr-only">Usuário</label>
                    <input type="text" value={USERNAME} onChange={(e) => setUserName(e.target.value)} className="form-control" placeholder="Usuário" required autoFocus="" />
                    <br />

                    <label className="sr-only">Senha</label>
                    <input type="text" value={PASSWORD} onChange={(e) => setPassword(e.target.value)} className="form-control" placeholder="Senha" required />
                    <br />

                    <button className="btn btn-lg btn-primary btn-block" type="submit">Logar</button>
                    <button className="btn btn-lg btn-success btn-block" type="button" onClick={fRegistrar} >Registrar</button>

                    <p className="mt-5 mb-3 text-muted">©JHC Sistemas-2021</p>
                </form>
            </div>
        </div>
    )
}