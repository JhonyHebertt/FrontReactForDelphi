import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Api from '../../services/api';

export default function Form(props) {
    const [descricao, setDescricao] = useState('');
    const [categoria, setCategoria] = useState('');
    const [preco, setPreco] = useState('');

    const [categorias, setCategorias] = useState([]);

    const [insert, setInsert] = useState(false);
    const { id } = props.match.params;
    const voltar = useHistory();

    useEffect(async () => {
        async function fCarregandoCategorias() {
            const listaCategorias = await Api.get('categorias');
            setCategorias(listaCategorias.data);
        };

        if (typeof id !== "undefined") {
            setInsert(false);

            await Api.get(`produtos/${id}`)
                .then((response) => {
                    setDescricao(response.data.descricao);
                    setCategoria(response.data.categoria);
                    setPreco(response.data.preco);
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
                descricao,
                categoria,
                preco
            })
                .then((res) => {
                    //console.log(res);
                    fVoltar();
                })
                .catch((res) => { console.log(res) })
        }
        else {
            //Api.put(`/produtos/${id}`, {
            Api.put(`/produtos`, {
                id,
                descricao,
                categoria,
                preco
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
                            <input type="text" name="descricao" value={descricao} onChange={(e) => setDescricao(e.target.value)} className="form-control" autoFocus />
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-sm-8">
                        <div className="form-group">
                            <label>Categoria</label>
                            <select className="custom-select" name="categoria" onChange={(e) => setCategoria(e.target.value)} value={categoria}>
                                <option key={999} value={999}>  </option>
                                {categorias.map((categorias, index) => {
                                    return (
                                        <option key={categorias.id} value={categorias.id}> {categorias.descricao} </option>
                                    )
                                })
                                }
                            </select>
                        </div>
                    </div>
                    <div className="col-sm-4">
                        <div className="form-group">
                            <label>Preço</label>
                            <input type="number" name="preco" value={preco} onChange={(e) => setPreco(e.target.value)} className="form-control" />
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
