import {
 GET_ALL_DOGS,
 GET_NAME_DOG,
 GET_TEMPERAMENTS,
 FILTER_BY_TEMPERAMENTS,
 FILTER_CREATED,
 ORDER_BY_NAME,
 DETAIL_DOG,
 POST_DOG
} from "./action-types"

const initialState = {
    allDogs: [],
    allTemps: [],
    allDogsDB: [],
    details: []
}

const reducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case GET_ALL_DOGS:
            return {
                ...state,
                allDogs: payload,
                allDogsDB: payload
            }
        case GET_NAME_DOG:
            return {
                ...state,
                allDogs: payload
            }
        case GET_TEMPERAMENTS:
            return {
                ...state,
                allTemps: payload
            }

         case FILTER_BY_TEMPERAMENTS:
            const { allDogsDB: allTemperamentsFilter } = state;
            const statusFiltered = payload === 'all' ? allTemperamentsFilter : allTemperamentsFilter.filter(dogs => dogs.temperaments?.includes(payload.toLowerCase()));

            return {
                ...state,
                allDogs: statusFiltered,
            };

        case FILTER_CREATED:
            const { allDogsDB: allDogsCreatedFilter } = state;
            const createdFilter = payload === "dataBase" ? allDogsCreatedFilter.filter(e => e.createdInDb) : allDogsCreatedFilter.filter(e => !e.createdInDb);

            return {
                ...state,
                allDogs: payload === "all" ? allDogsCreatedFilter : createdFilter,
            };

        case ORDER_BY_NAME:
            const sortedArr = [...state.allDogs].sort((a, b) => {
                return payload === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
            });

            return {
                ...state,
                allDogs: sortedArr,
            };
            
        case POST_DOG:
            return {
                ...state,
            }
    
        case DETAIL_DOG:
            return {
                ...state,
                details: payload
            }


        default: return {
            ...state
        }
    }
}

export default reducer;