import React, { Component } from 'react'
import axios from 'axios'
import Global from './Global'
import { Navigate } from 'react-router-dom'

export default class CreatePersonaje extends Component {

    // Referencias a las cajas del formulario
    cajaIdPersonaje = React.createRef()
    cajaNombre = React.createRef()
    cajaImagen = React.createRef()
    selectSerie = React.createRef()

    // URL de la API
    url = Global.urlApiEjemplos

    // Estado del componente
    state = {
        mensaje: "",
        status: false,
        series: [],
        serie: {},
        personajes: [],
        statusGet: false,
        statusUpdate: false,
        personaje: {},
        statusSerie: false,
        statusPersonaje: false
    }

    componentDidMount = async () => {
        try {
            const response = await axios.get(this.url + "api/Series")

            this.setState({
                series: response.data
            })
        } catch (error) {
            console.error("Error al cargar las series:", error)
            this.setState({
                mensaje: "No se pudieron cargar las series"
            })
        }
    }

    // Inserta un personaje
    insertPersonaje = async (event) => {
        event.preventDefault()

        const request = "api/Personajes"

        const personaje = {
            idPersonaje: Number(this.cajaIdPersonaje.current.value),
            nombre: this.cajaNombre.current.value,
            imagen: this.cajaImagen.current.value,
            idSerie: Number(this.selectSerie.current.value),
        }

        try {
            await axios.post(this.url + request, personaje)

            this.setState({
                mensaje: "Personaje insertado: " + personaje.nombre,
                status: true
            })
        } catch (error) {
            console.error("Error al insertar el personaje:", error.response?.data || error)

            this.setState({
                mensaje: error.response?.data?.title ||
                    "Error al insertar el personaje"
            })
        }
    }

    render() {
        return (
            <div className="container mt-4">
                {
                    this.state.status == true &&
                    (<Navigate to="/personajes" />)
                }
                <h1>Crear Personaje</h1>

                <h3 style={{ color: "red" }}>
                    {this.state.mensaje}
                </h3>

                <form onSubmit={this.insertPersonaje}>

                    <label>ID Personaje</label>
                    <br />
                    <input
                        type="number"
                        ref={this.cajaIdPersonaje}
                        className="form-control"
                        required
                    />
                    <br />
                    <label>Nombre Personaje</label>
                    <br />
                    <input
                        type="text"
                        ref={this.cajaNombre}
                        className="form-control"
                        required
                    />
                    <br />
                    <label>Imagen Personaje</label>
                    <br />
                    <input
                        className="border border-[#D97891] rounded px-2 py-1"
                        ref={this.cajaImagen}
                        type="text"
                    />
                    <br />
                    <label>Introduce la Serie</label>
                    <br />
                    <select
                        className='form-select'
                        ref={this.selectSerie}>
                        {
                            this.state.series.map((serie, index) => {
                                return (
                                    <option key={index}
                                        value={serie.idSerie}>
                                        {serie.nombre}
                                    </option>
                                );
                            })
                        }
                    </select>

                    <button type="submit" className="btn btn-warning mt-3"
                        style={{
                            backgroundColor: '#D97891',
                            color: 'white',
                            padding: '10px 18px',
                            border: 'none',
                            borderRadius: '5px',
                            cursor: 'pointer'
                        }}>
                        Insertar Personaje
                    </button>
                </form>
            </div>
        )
    }
}