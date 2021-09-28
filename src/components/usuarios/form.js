import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Api from '../../services/api';

export default function Form(props) {

    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [status, setStatus] = useState(1);
    const [insert, setInsert] = useState(false);
    const { id } = props.match.params;
    const voltar = useHistory();

    useEffect(() => {
        if (typeof id !== "undefined") {
            async function fCarregandoUser() {
                const User = await Api.get(`usuarios/${id}`);
                setUserName(User.data.USERNAME);
                setPassword(User.data.PASSWORD);
                setStatus(User.data.STATUS);
            }
            setInsert(false);
            fCarregandoUser();
        }
        else { setInsert(true); }

        return () => { }

    }, [id]);

    function fVoltar() {
        voltar.push('/usuarios');
    }

    async function fRegistrar(e) {
        e.preventDefault();

        if (insert !== false) {
            Api.post('/usuarios', { userName, password, status })
                .then((res) => {
                    console.log(res);
                    fVoltar();
                })
                .catch((res) => { console.log(res) })
        }
        else {
            Api.put(`/usuarios/${id}`, { id, userName, password, status })
                .then((res) => {
                    console.log(res);
                    fVoltar();
                })
                .catch((res) => { console.log(res) })
        }
    }

    return (
        <div className="col-sm-12">
            <form onSubmit={fRegistrar} autoComplete="false" >
                <div className="row">
                    <div className="col-sm-6">
                        <div className="form-group">
                            <label >Nome</label>
                            <input type="text" className="form-control" value={userName} onChange={(e) => setUserName(e.target.value)} placeholder="Digite seu nome" autoComplete="false" autoFocus />
                        </div>
                    </div>
                    <div className="col-sm-6">
                        <div className="form-group">
                            <label>Senha</label>
                            <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Digite uma senha" autoComplete="false" />
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-6">
                        <div className="form-group">
                            <label>Status
                                <input type="number" className="form-control" value={status} onChange={(e) => setStatus(e.target.value)} />
                            </label>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-6">
                        <button type="button" onClick={fVoltar} className="btn btn-danger" > Voltar</button>
                        &nbsp;&nbsp;
                        <button type="submit" className="btn btn-success">Gravar</button>
                    </div>
                </div>
            </form>
        </div>
    )
}