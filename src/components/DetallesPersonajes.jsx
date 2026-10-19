
import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import ServiceSeries from '../services/ServiceSeries'

export default class DetallesPersonajes extends Component {

    service = new ServiceSeries()

    state = {
        personajes: [],
        cargando: true
    }

    componentDidMount = async () => {
        await this.loadPersonajes()
    }

    componentDidUpdate = async (oldProps) => {
        if (oldProps.idSerie !== this.props.idSerie) {
            await this.loadPersonajes()
        }
    }

    loadPersonajes = async () => {
        this.setState({
            cargando: true,
            personajes: []
        })

        try {
            let datos = await this.service.obtenerPersonajesSeries(
                this.props.idSerie
            )

            this.setState({
                personajes: datos,
                cargando: false
            })
        } catch (error) {
            console.log('Error al cargar los personajes:', error)

            this.setState({
                personajes: [],
                cargando: false
            })
        }
    }

    render() {
        return (
            <div style={{
                margin: '30px auto',
                width: '90%',
                textAlign: 'center'
            }}>

                <h1>Personajes de la serie</h1>

                <NavLink to={'/Series/' + this.props.idSerie}>
                    <button style={estiloBoton}>
                        Volver
                    </button>
                </NavLink>

                {/* Mensaje mientras se reciben los datos. */}
                {this.state.cargando && (
                    <h3>Cargando personajes...</h3>
                )}

                {!this.state.cargando && (
                    <table style={{
                        borderCollapse: 'collapse',
                        margin: '25px auto',
                        width: '100%'
                    }}>

                        <thead>
                            <tr>
                                <th style={estiloCabecera}>Nombre</th>
                                <th style={estiloCabecera}>Imagen</th>
                            </tr>
                        </thead>

                        <tbody>
                            {this.state.personajes.map((personaje, index) => (
                                <tr key={personaje.idPersonaje ?? index}>

                                    {/* Nombre del personaje. */}
                                    <td style={estiloCelda}>
                                        {personaje.nombre}
                                    </td>

                                    {/* Imagen del personaje. */}
                                    <td style={estiloCelda}>
                                        <img
                                            src={personaje.imagen}
                                            alt={personaje.nombre}
                                            style={{
                                                width: '90px',
                                                height: '90px',
                                                objectFit: 'contain'
                                            }}
                                        />
                                    </td>
                                </tr>
                            ))}

                            {this.state.personajes.length === 0 &&
                                !this.state.cargando && (
                                    <tr>
                                        <td
                                            colSpan="3"
                                            style={estiloCelda}
                                        >
                                            No hay personajes para mostrar.
                                        </td>
                                    </tr>
                                )}
                        </tbody>

                    </table>
                )}

            </div>
        )
    }
}

// Estilo de las cabeceras.
const estiloCabecera = {
    backgroundColor: '#FFC5D3',
    padding: '12px',
    border: '1px solid #D3D3D3'
}

// Estilo de las celdas.
const estiloCelda = {
    padding: '12px',
    border: '1px solid #D3D3D3'
}

// Estilo de los botones.
const estiloBoton = {
    backgroundColor: '#D97891',
    color: 'white',
    padding: '9px 16px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer'
}
