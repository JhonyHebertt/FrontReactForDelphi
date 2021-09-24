import React from 'react';
import { useEffect, useState } from 'react';
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
        console.log(listaUser.data);

        if (Array.isArray(listaUser.data)) {
            setUsuarios(listaUser.data)
        }
    }

    function fDelete(id) {
        Api.delete(`/usuarios/${id}`)
            .then((res) => {
                console.log(res);
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
                    <table className="table table-hover">
                        <thead>
                            <tr>
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
                                        <td data-label="ID">{user.ID}</td>
                                        <td data-label="Nome">{user.USERNAME}</td>
                                        <td data-label="Status"> {user.STATUS} </td>
                                        <td>
                                            <Link to={`/usuarios/${user.ID}`} > <i className="fa fa-pencil" ></i></Link>
                                            <Link to={''} onClick={(d) => fDelete(user.ID)}> <i className="fa fa-trash" ></i> </Link>
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