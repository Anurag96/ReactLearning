import React from 'react'
import { Link } from "react-router-dom";

function NavBar() {
    return (
        <div>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/" style={{ fontWeight: 600 }}>HUB</Link>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link className="navbar-brand active" to="/todo-basic">Todo 1.0</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="navbar-brand" to="/clock-basic">Clock 1.0</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="navbar-brand" to="/fragment-basic">Heathy Food 1.0</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="navbar-brand" to="/calculator-basic">Calculator 1.0</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default NavBar
