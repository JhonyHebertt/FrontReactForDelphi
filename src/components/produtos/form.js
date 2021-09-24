import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Api from '../../services/api';

export default function Form(props) {
    const [DESCRICAO, setDescricao] = useState('');
    const [CATEGORIA, setCategoria] = useState('');
    const [PRECO, setPreco] = useState('');

    const [insert, setInsert] = useState(false);
    const { ID } = props.match.params;
    const voltar = useHistory();

    useEffect(() => {
        if (typeof ID !== "undefined") {
            async function fCarregandoProdutos() {
                const produtos = await Api.get(`produtos/${ID}`);
                setDescricao(produtos.data.DESCRICAO);
                setCategoria(produtos.data.CATEGORIA);
                setPreco(produtos.data.PRECO);
            }
            setInsert(false);
            fCarregandoProdutos();
        }
        else { setInsert(true); }

        return () => { }

    }, [ID]);

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
                    console.log(res);
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
                    console.log(res);
                    fVoltar();
                })
                .catch((res) => { console.log(res) })
        }
    }

    return (
        <div className="col-sm-12">
            <form onSubmit={fRegistrar} autoComplete="false" >

                <div className="form-group">
                    <label>DESCRICAO</label>
                    <input type="text" name="DESCRICAO" value={DESCRICAO} onChange={(e) => setDescricao(e.target.value)} className="form-control" />
                </div>


                <div className="form-group">
                    <label>CATEGORIA</label>
                    <input type="text" name="CATEGORIA" value={CATEGORIA} onChange={(e) => setCategoria(e.target.value)} className="form-control" />
                </div>


                <div className="form-group">
                    <label>PRECO</label>
                    <input type="number" name="PRECO" value={PRECO} onChange={(e) => setPreco(e.target.value)} className="form-control" />
                </div>

                <button type="button" onClick={fVoltar} className="btn btn-danger" > Voltar</button>
                <button type="submit" className="btn btn-primary">Gravar</button>
            </form>
        </div>
    )
}
