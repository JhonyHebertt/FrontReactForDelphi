import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Api from '../../services/api';

export default function Form(props) {
    const [DESCRICAO, setDescricao] = useState('');
    const [CATEGORIA, setCategoria] = useState('');
    const [PRECO, setPreco] = useState('');

    const [categorias, setCategorias] = useState([]);

    const [insert, setInsert] = useState(false);
    const { ID } = props.match.params;
    const voltar = useHistory();

    useEffect(async () => {
        async function fCarregandoCategorias() {
            const listaCategorias = await Api.get('categorias');
            setCategorias(listaCategorias.data);
        };

        if (typeof ID !== "undefined") {
            setInsert(false);

            await Api.get(`produtos/${ID}`)
                .then((response) => {
                    setDescricao(response.data.DESCRICAO);
                    setCategoria(response.data.CATEGORIA);
                    setPreco(response.data.PRECO);
                })
        }
        else { setInsert(true); }

        await fCarregandoCategorias();

        return () => { }

    }, []);

    function fVoltar() {
        voltar.push('/produtos');
    }

    async function fRegistrar(e) {
        e.preventDefault();

        if (insert !== false) {
            Api.post('/produtos', {
                DESCRICAO,
                CATEGORIA,
                PRECO
            })
                .then((res) => {
                    //console.log(res);
                    fVoltar();
                })
                .catch((res) => { console.log(res) })
        }
        else {
            Api.put(`/produtos/${ID}`, {
                ID,
                DESCRICAO,
                CATEGORIA,
                PRECO
            })
                .then((res) => {
                    //console.log(res);
                    fVoltar();
                })
                .catch((res) => { console.log(res) })
        }
    }

    return (
        <div className="col-sm-12 col-md-8">
            <form onSubmit={fRegistrar} autoComplete="false" >
                <div className="row">
                    <div className="col-sm-12">
                        <div className="form-group">
                            <label>Descrição</label>
                            <input type="text" name="DESCRICAO" value={DESCRICAO} onChange={(e) => setDescricao(e.target.value)} className="form-control" autoFocus />
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-sm-8">
                        <div className="form-group">
                            <label>Categoria</label>
                            <select className="custom-select" name="CATEGORIA" onChange={(e) => setCategoria(e.target.value)} value={CATEGORIA}>
                                <option key={999} value={999}>  </option>
                                {categorias.map((categorias, index) => {
                                    return (
                                        <option key={categorias.ID} value={categorias.ID}> {categorias.DESCRICAO} </option>
                                    )
                                })
                                }
                            </select>
                        </div>
                    </div>
                    <div className="col-sm-4">
                        <div className="form-group">
                            <label>Preço</label>
                            <input type="number" name="PRECO" value={PRECO} onChange={(e) => setPreco(e.target.value)} className="form-control" />
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
