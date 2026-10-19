
import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import ServiceSeries from '../services/ServiceSeries'

export default class DetallesSeries extends Component {

  service = new ServiceSeries()

  state = {
    serie: null,
    cargando: true
  }

  componentDidMount = async () => {
    await this.loadSerie()
  }

  componentDidUpdate = async (oldProps) => {
    if (oldProps.idSerie !== this.props.idSerie) {
      await this.loadSerie()
    }
  }

  loadSerie = async () => {
    this.setState({
      cargando: true,
      serie: null
    })

    try {
      // Obtenemos los series de la API.
      let datos = await this.service.obtenerSeries()

      let serieEncontrado = datos.find(
        serie =>
          String(serie.idSerie) === String(this.props.idSerie)
      )

      this.setState({
        serie: serieEncontrado || null,
        cargando: false
      })

    } catch (error) {
      console.log('Error al cargar la serie:', error)

      this.setState({
        serie: null,
        cargando: false
      })
    }
  }

  render() {

    // Mientras llegan los datos de la API, mostramos un mensaje.
    if (this.state.cargando) {
      return <h2 style={{ textAlign: 'center' }}>
        Cargando serie...
      </h2>
    }

    // Si no encontramos la serie, mostramos un mensaje.
    if (this.state.serie == null) {
      return (
        <div style={{ textAlign: 'center', marginTop: '30px' }}>
          <h2>No se ha encontrado la serie</h2>

          <NavLink to="/">
            <button style={estiloBoton}>
              Volver a Inicio
            </button>
          </NavLink>
        </div>
      )
    }

    // Guardamos la serie para acceder a sus propiedades.
    let serie = this.state.serie

    return (
      <div style={{
        margin: '30px auto',
        maxWidth: '750px',
        textAlign: 'center',
        padding: '20px'
      }}>


        {/* Nombre de la serie */}
        <h1>{serie.nombre}</h1>

        {/* Tarjeta con la información de la serie */}
        <div style={{
          border: '1px solid #D3D3D3',
          borderRadius: '12px',
          padding: '20px',
          marginTop: '20px',
          backgroundColor: '#FFF5F8'
        }}>

          {/* imagen de la serie */}
          <img
            src={serie.imagen}
            alt={serie.nombre}
            style={{
              width: '180px',
              height: '180px',
              objectFit: 'contain',
              marginBottom: '20px'
            }}
          />

          {/* Descripción de la serie */}
          <p style={{
            textAlign: 'left',
            whiteSpace: 'pre-line',
            lineHeight: '1.6',
            fontWeight: 'normal'
          }}>
            {serie.nombre}
          </p>
        </div>

        {/* Botones para navegar por la aplicación */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '15px',
          flexWrap: 'wrap',
          marginTop: '25px'
        }}>


          {/* Enviamos el ID de la serie al buscador de personajes */}
          <NavLink to={'/series/' + serie.idSerie + '/personajes'}>
            <button style={estiloBoton}>
              Ver Personajes
            </button>
          </NavLink>
        </div>
      </div>
    )
  }
}

// Estilo compartido por los botones.
const estiloBoton = {
  backgroundColor: '#D97891',
  color: 'white',
  padding: '10px 18px',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer'
}