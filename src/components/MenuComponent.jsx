import React, { Component } from 'react'
import Ace from './Ace.jpg'
import { NavLink } from 'react-router-dom'
import ServiceSeries from '../services/ServiceSeries'

export default class MenuComponents extends Component {

    service = new ServiceSeries()

    state = {
        series: []
    }

    // Se ejecuta al cargar el menú.
    componentDidMount = async () => {
        let datos = await this.service.obtenerSeries()

        this.setState({
            series: datos
        })
    }

    render() {
        return (
            <nav
                className="navbar navbar-expand-lg"
                style={{ backgroundColor: "#fde3f6" }}
                data-bs-theme="light"
            >
                <div className="container-fluid">

                    {/* LOGO Y NOMBRE DE LA APLICACIÓN */}
                    <NavLink
                        className="navbar-brand d-flex align-items-center"
                        to="/"
                    >
                        <img
                            src={Ace}
                            alt="Ace"
                            width="45"
                            height="45"
                            className="rounded-circle me-2"
                        />
                        Series y Personajes
                    </NavLink>

                    {/* BOTÓN DEL MENÚ PARA PANTALLAS PEQUEÑAS */}
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent"
                        aria-expanded="false"
                        aria-label="Abrir menú"
                        style={{
                            backgroundColor: "#e88eaa",
                            color: "#ffffff",
                            fontWeight: "bold",
                            padding: "12px",
                            borderRadius: "10px",
                            border: "none"
                        }}
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    {/* ENLACES DEL MENÚ */}
                    <div
                        className="collapse navbar-collapse"
                        id="navbarSupportedContent"
                    >
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">

                            {/* ENLACE A HOME */}
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/">
                                    Home
                                </NavLink>
                            </li>

                            {/* ENLACE A APUESTAS */}
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/create">
                                    Crear Personaje
                                </NavLink>
                            </li>

                            {/* ENLACE A APUESTAS */}
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/modificar">
                                    Modificar Personaje
                                </NavLink>
                            </li>


                            {/* DESPLEGABLE DE SERIES */}
                            <li className="nav-item dropdown">

                                <a
                                    className="nav-link dropdown-toggle"
                                    href="#"
                                    role="button"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                >
                                    Series
                                </a>

                                {/* Opciones creadas a partir de las series de la API */}
                                <ul className="dropdown-menu">
                                    {this.state.series.map((serie) => (
                                        <li key={serie.idSerie}>
                                            <NavLink
                                                className="dropdown-item"
                                                to={"/series/" + serie.idSerie}
                                            >
                                                {serie.nombre}
                                            </NavLink>
                                        </li>
                                    ))}

                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        )
    }
}