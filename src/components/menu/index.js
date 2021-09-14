import React from 'react';
import { Link } from 'react-router-dom';

export default function menu() {
    return (
        <div className="sidebar-sticky pt-3">
            <ul className="nav flex-column">
                <li className="nav-item">
                    <Link className="nav-link active" to="/"> Principal </Link>
                </li>

                <li className="nav-item">
                    <Link className="nav-link" to="/users"> Usuários </Link>
                </li>
            </ul>
        </div>
    )
}