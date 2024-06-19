import React from 'react'
import { Link } from "react-router-dom";

function NavBar() {
    return (
        <div>
            <nav class="navbar navbar-expand-lg bg-body-tertiary">
                <div class="container-fluid">
                    <Link class="navbar-brand" to="/" style={{ fontWeight: 600 }}>HUB</Link>
                    <div class="collapse navbar-collapse" id="navbarNav">
                        <ul class="navbar-nav">
                            <li class="nav-item">
                                <Link className="navbar-brand" to="/todo-basic">Todo 1.0</Link>
                            </li>
                            <li class="nav-item">
                                <Link className="navbar-brand" to="/clock-basic">Clock 1.0</Link>
                            </li>
                            <li class="nav-item">
                                <Link className="navbar-brand" to="/fragment-basic">Fragment 1.0</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default NavBar
