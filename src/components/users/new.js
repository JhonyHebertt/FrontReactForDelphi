import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Api from '../../services/api';

export default function New() {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [status, setStatus] = useState(1);
    const history = useHistory();

    async function fRegistrar(e) {
        e.preventDefault();
        Api.post('/users', { userName, password, status })
            .then((res) => {
                console.log(res);
                fVoltar();
            })
            .catch((res) => { console.log(res) })
    }

    function fVoltar() {
        history.push('/users');
    }

    return (
        <div className="col-sm-12">
            <form onSubmit={fRegistrar} autoComplete="false" >

                <div className="form-group">
                    <label >Nome</label>
                    <input type="text" className="form-control" value={userName} onChange={(e) => setUserName(e.target.value)} placeholder="Digite seu nome" autoComplete="false" />
                </div>

                <div className="form-group">
                    <label>Senha</label>
                    <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Digite uma senha" autoComplete="false" />
                </div>

                <div className="form-group">
                    <label>Status
                        <input type="number" className="form-control" value={status} onChange={(e) => setStatus(e.target.value)} />
                    </label>
                </div>

                <button type="button" onClick={fVoltar} className="btn btn-danger" > Voltar</button>
                <button type="submit" className="btn btn-primary">Gravar</button>
            </form>
        </div>
    )
}