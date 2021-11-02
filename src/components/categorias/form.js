import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Api from '../../services/api';

export default function Form(props) {
    const [descricao, setDescricao] = useState('');

    const [insert, setInsert] = useState(false);
    const { id } = props.match.params;
    const voltar = useHistory();

    useEffect(() => {
        if (typeof id !== "undefined") {
            async function fCarregandoCategorias() {
                const categorias = await Api.get(`categorias/${id}`);
                setDescricao(categorias.data.descricao);
            }
            setInsert(false);
            fCarregandoCategorias();
        }
        else { setInsert(true); }
        return () => { }

    }, [id]);

    function fVoltar() {
        voltar.push('/categorias');
    }

    async function fRegistrar(e) {
        e.preventDefault();

        if (insert !== false) {
            Api.post('/categorias', {
                descricao
            })
                .then((res) => {
                    //console.log(res);
                    fVoltar();
                })
                .catch((res) => { console.log(res) })
        }
        else {
            //Api.put(`/categorias/${id}`, {
            Api.put(`/categorias/`, {
                id,
                descricao
            })
                .then((res) => {
                    //console.log(res);
                    fVoltar();
                })
                .catch((res) => { console.log(res) })
        }
    }

    return (
        <div className="col-sm-12">
            <form onSubmit={fRegistrar} autoComplete="false" >
                <div className="row">
                    <div className="col-sm-12">
                        <div className="form-group">
                            <label>Descrição</label>
                            <input type="text" name="descricao" value={descricao} onChange={(e) => setDescricao(e.target.value)} className="form-control" autoFocus />
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
