import React from 'react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Api from '../../services/api';


export default function List() {

    const [produtos, setProdutos] = useState([]);

    useEffect(() => {
        fCarregandoProdutos();
        return () => { }
    }, []);

    async function fCarregandoProdutos() {
        const listaProdutos = await Api.get('produtos');
        //console.log(listaProdutos.data);

        if (Array.isArray(listaProdutos.data)) {
            setProdutos(listaProdutos.data)
        }
    }

    function fDelete(id) {
        Api.delete(`/produtos/${id}`)
            .then((res) => {
                //console.log(res);
                fCarregandoProdutos();
            })
    }

    return (
        <div className="col-sm-12">
            <h2>Lista de produtos ({produtos.length})</h2>
            <br />
            <div className="row">
                <div className="col-sm-12">
                    <Link to="produtos/new" className="btn btn-success"> Novo produtos </Link>
                </div>
            </div>
            <br />

            {produtos.length === 0 ? ( //Se não tiver produtos
                <div className="container">
                    <span>Nenhum produtos registrado...</span>
                </div>

            ) : ( //se tiver produtos
                <>
                    <table className="table table-bordered table-hover">
                        <thead>
                            <tr className="table-primary">
                                <th> ID </th>
                                <th> Descrição </th>
                                <th> Categoria </th>
                                <th> Preço </th>
                                <th >Opções</th>
                            </tr>
                        </thead>
                        <tbody>
                            {produtos.map((produtos, index) => {
                                return (
                                    <tr key={index}>
                                        <td className="table-active" > {produtos.id}</td>
                                        <td className="table-active" > {produtos.descricao}</td>
                                        <td className="table-active" > {produtos.categoriaDescricao}</td>
                                        <td className="table-active" > {produtos.preco}</td>
                                        <td className="table-active" >
                                            <Link to={`/produtos/${produtos.id}`} > <i className="fa fa-pencil" ></i></Link>
                                            <Link to={''} onClick={(d) => fDelete(produtos.id)}> <i className="fa fa-trash" ></i> </Link>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </>
            )
            }
        </div >
    )
}
