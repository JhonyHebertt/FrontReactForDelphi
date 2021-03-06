import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Api from '../services/api';

export default function Form(props) {

    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const status = 1;

    const logar = useHistory();

    function fLogar() {
        logar.push('/login');
    }

    async function fRegistrar(e) {
        e.preventDefault();
        //console.log(username, password, status);
        Api.post('/usuarios', {
            username,
            password,
            status
        })
            .then((res) => {
                //console.log(res);
                fLogar();
            })
            .catch((res) => { console.log(res) })
    }

    return (
        <div className="container-fluid col-sm-6 border border-primary">
            <div className="row d-flex justify-content-center text-center">
                <form onSubmit={fRegistrar} autoComplete="false" >
                    <h1 className="h3 mb-3 font-weight-normal">Cadastrar</h1>
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="form-group">
                                <label >Nome</label>
                                <input type="text" className="form-control" value={username} onChange={(e) => setUserName(e.target.value)} placeholder="Digite seu nome" autoComplete="false" autoFocus />
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="form-group">
                                <label>Senha</label>
                                <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Digite uma senha" autoComplete="false" />
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-sm-12">
                            <button type="submit" className="btn btn-success">Registrar</button>
                            &nbsp;&nbsp;
                            <button type="button" onClick={fLogar} className="btn btn-danger" > Voltar</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}