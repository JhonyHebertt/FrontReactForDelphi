import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Api from '../../services/api';

export default function List() {

    const [usuarios, setUsuarios] = useState([]);

    useEffect(() => {
        fCarregandoUsers();
        return () => { }
    }, []);

    async function fCarregandoUsers() {
        const listaUser = await Api.get('usuarios');
        //console.log(listaUser.data);

        if (Array.isArray(listaUser.data)) {
            setUsuarios(listaUser.data)
        }
    }

    function fDelete(id) {
        Api.delete(`/usuarios/${id}`)
            .then((res) => {
                //console.log(res);
                fCarregandoUsers();
            })
    }

    return (
        <div className="col-sm-12">
            <h2>Lista de usuarios ({usuarios.length})</h2>
            <br />
            <div className="row">
                <div className="col-sm-12">
                    <Link to="usuarios/new" className="btn btn-success"> Novo Usuário </Link>
                </div>
            </div>
            <br />

            {usuarios.length === 0 ? ( //Se Ñ tiver usuario
                <div className="container">
                    <span>Nenhum usuario registrado...</span>
                </div>

            ) : ( //se tiver usuario
                <>
                    <table className="table table-bordered table-hover">
                        <thead>
                            <tr className="table-primary">
                                <th scope="col">#</th>
                                <th scope="col">Nome</th>
                                <th scope="col">Status</th>
                                <th scope="col">Opções</th>
                            </tr>
                        </thead>
                        <tbody>
                            {usuarios.map((user, index) => {
                                return (
                                    <tr key={index}>
                                        <td className="table-active" data-label="id">{user.id}</td>
                                        <td className="table-active" data-label="Nome">{user.username}</td>
                                        <td className="table-active" data-label="Status"> {user.status} </td>
                                        <td className="table-active" >
                                            <Link to={`/usuarios/${user.id}`} > <i className="fa fa-pencil" ></i></Link>
                                            <Link to={''} onClick={(d) => fDelete(user.id)}> <i className="fa fa-trash" ></i> </Link>
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