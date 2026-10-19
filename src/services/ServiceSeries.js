import axios from 'axios';
import Global from '../components/Global';

// La carpeta services sirve para guardar las llamadas al API
// no tener que escribirlas directamente dentro de cada componente.

export default class ServiceSeries {
    async obtenerSeries() {
        let url = Global.urlApiEjemplos;
        let request = "api/Series";

        let response = await axios.get(url + request);
        return response.data;
    }

    async obtenerSerie(id) {
        let url = Global.urlApiEjemplos;
        let request = "api/Series/" + id;

        let response = await axios.get(url + request);
        return response.data;
    }

    async obtenerPersonajesSeries(id) {
        let url = Global.urlApiEjemplos;
        let request = "api/Series/PersonajesSerie/" + id;
    
        let response = await axios.get(url + request);
        return response.data;
    }

    async obtenerPersonajes(id) {
        let url = Global.urlApiEjemplos;
        let request = "api/Personajes/" + id;

        let response = await axios.get(url + request);
        return response.data;
    }

    async insertarPersonaje(personaje) {
        let url = Global.urlApiEjemplos;
        let request = "api/Personajes";

        let response = await axios.post(url + request, personaje);
        return response.data;
    }

    async updatePersonaje(personaje) {
        let url = Global.urlApiEjemplos;
        let endpoint = "api/Personajes/";

        try {
            let response= await axios.put(url+endpoint, personaje);
        } catch (error) {
            throw error;
        }
    }
}