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
        const listaUser = await Api.get('users');
        //console.log(listaUser.data);
        //'<HTML><BODY><B>200 OK</B></BODY></HTML>')
        if (Array.isArray(listaUser.data)) {
            setUsuarios(listaUser.data)
        }

    }

    function fDelete(id) {
        Api.delete(`/users/${id}`)
            .then((res) => {
                console.log(res);
                fCarregandoUsers();
            })
    }

    return (
        <div>
            <h2>Lista de usuarios ({usuarios.length})</h2>
            <br />
            <div className="row">
                <Link to="users/new" className="btn btn-success">
                    Novo Usuário
                </Link>
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
                                            <Link to={`/users/${user.ID}`} > <i className="fa fa-pencil" ></i></Link>
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