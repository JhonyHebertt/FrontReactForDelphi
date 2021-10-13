import React from 'react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Api from '../../services/api';


export default function List() {

    const [categorias, setCategorias] = useState([]);

    useEffect(() => {
        fCarregandoCategorias();
        return () => { }
    }, []);

    async function fCarregandoCategorias() {
        const listaCategorias = await Api.get('categorias');
        //console.log(listaCategorias.data);

        if (Array.isArray(listaCategorias.data)) {
            setCategorias(listaCategorias.data)
        }
    }

    function fDelete(id) {
        Api.delete(`/categorias/${id}`)
            .then((res) => {
                //console.log(res);
                fCarregandoCategorias();
            })
    }

    return (
        <div className="col-sm-12">
            <h2>Lista de categorias ({categorias.length})</h2>
            <br />
            <div className="row">
                <div className="col-sm-12">
                    <Link to="categorias/new" className="btn btn-success"> Nova categoria </Link>
                </div>
            </div>
            <br />

            {categorias.length === 0 ? ( //Se não tiver categorias
                <div className="container">
                    <span>Nenhuma categorias registrada...</span>
                </div>

            ) : ( //se tiver categorias
                <>
                    <table className="table table-bordered table-hover">
                        <thead>
                            <tr className="table-primary">
                                <th> ID </th>
                                <th> Descrição </th>
                                <th >Opções</th>
                            </tr>
                        </thead>
                        <tbody>
                            {categorias.map((categorias, index) => {
                                return (
                                    <tr key={index}>
                                        <td className="table-active" > {categorias.ID}</td>
                                        <td className="table-active"> {categorias.DESCRICAO}</td>
                                        <td className="table-active">
                                            <Link to={`/categorias/${categorias.ID}`} > <i className="fa fa-pencil" ></i></Link>
                                            <Link to={''} onClick={(d) => fDelete(categorias.ID)}> <i className="fa fa-trash" ></i> </Link>
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
