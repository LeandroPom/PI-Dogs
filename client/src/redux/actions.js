import axios from 'axios';
import {
 GET_ALL_DOGS,
 GET_NAME_DOG,
 GET_TEMPERAMENTS,
 FILTER_BY_TEMPERAMENTS,
 FILTER_CREATED,
 ORDER_BY_NAME,
 DETAIL_DOG
} from './action-types';

// Todos los Dog
export const getAllDogs = () => {
  return async (dispatch) => {
    try {
      // Obtén los perros de la base de datos local
      const dbData = await axios('http://localhost:3001/dogs');
      
      // Obtén los perros de la API externa
      const apiData = await axios('https://api.thedogapi.com/v1/breeds');

      // Combina los resultados en un único array
      const allDogs = [...dbData.data, ...apiData.data];

      dispatch({
        type: GET_ALL_DOGS,
        payload: allDogs
      });
    } catch (error) {
      console.error('Error fetching all dogs:', error);
    }
  };
};

// Detalles de un Dog por ID
export const getDetailDog = (id) => {
    return async (dispatch) => {
        try {
            const details = await axios.get(`http://localhost:3001/dogs?id=${id}`);
            const detaildogs = details.data;
            dispatch({
                type: DETAIL_DOG,
                payload: detaildogs,
            });
        } catch (error) {
            // Manejo de errores
        }
    };
};

// Búsqueda por nombres
export function getNameDogs(name) {
  return async (dispatch) => {
    try {
      const dataName = await axios(`http://localhost:3001/dogs/name?name=${name}`, {
        params: {
          name: name
        }
      });

      const allDataName = dataName.data;
      dispatch({
        type: GET_NAME_DOG,
        payload: [allDataName]
      });
    } catch (error) {
      console.log(error);
    }
  };
}

// Traigo los Temperaments de los perros
export function getTemperaments() {
  return async (dispatch) => {
    try {
      const dataTemps = await axios('http://localhost:3001/temperaments');
      const allTemps = dataTemps.data;
      console.log(allTemps, 'hola soy tom');
      dispatch({
        type: GET_TEMPERAMENTS,
        payload: allTemps
      });
    } catch (error) {
      console.error('Error fetching Dogs temps:', error);
    }
  };
}

// Para crear el Dog
export function postDog(payload) {
  return async function (dispatch) {
    try {
      const response = await axios.post('http://localhost:3001/dogs', payload);
      // console.log(response);
      return response;
    } catch (error) {
      console.error('Error creating Dog', error);
    }
  };
}

export function filterByTemps(payload) {
  return {
    type: FILTER_BY_TEMPERAMENTS,
    payload
  };
}

// Ordenamiento por origen
export function filterCreatedDog(payload) {
  return {
    type: FILTER_CREATED,
    payload
  };
}

export function orderByName(payload) {
  return {
    type: ORDER_BY_NAME,
    payload
  };
}

// export function orderByAttack(payload) {    ///////usar despues para filtrado en Home//////
//   return {
//     type: ORDER_BY_ATTACK,
//     payload
//   };
// }


