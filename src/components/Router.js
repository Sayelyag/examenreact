import React, { Component } from 'react'
import {BrowserRouter, Route, Routes, useParams} from 'react-router-dom'

import HomeComponent from './HomeComponent'
import MenuComponent from './MenuComponent'
import CreatePersonaje from './CreatePersonaje'
import DetallesSeries from './DetallesSeries'
import DetallesPersonajes from './DetallesPersonajes'
import ModificarPersonaje from './ModificarPersonaje'

function SerieRoute() {
    const { id } = useParams()

    return <DetallesSeries idSerie={id} />
}

function PersonajesRoute() {
    const { id } = useParams()

    return <DetallesPersonajes idSerie={id} />
}

export default class Router extends Component {
    render() {
        return (
            <BrowserRouter
                future={{
                    v7_startTransition: true,
                    v7_relativeSplatPath: true
                }}
            >
                {/* Menú superior. */}
                <MenuComponent />
                <Routes>
                    {/* Página principal. */}
                    <Route
                        path="/"
                        element={<HomeComponent />}
                    />
                    <Route
                        path="/create"
                        element={<CreatePersonaje />}
                    />
                    <Route
                        path="/series/:id"
                        element={<SerieRoute />}
                    />
                    <Route
                        path="/series/:id/personajes"
                        element={<PersonajesRoute />}
                    />
                    <Route
                        path="/modificar"
                        element={<ModificarPersonaje />}
                    />
                </Routes>
            </BrowserRouter>
        )
    }
}