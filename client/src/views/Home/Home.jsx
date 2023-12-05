import React, { useEffect, useState } from 'react'
import Card from '../../components/card/Card'
import { useDispatch, useSelector } from 'react-redux'
import { filterByTemps, filterCreatedDog, getAllDogs, getTemperaments, orderByName } from '../../redux/actions'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'
import SearchBar from '../../components/searchBar/SearchBar'
import Paginate from '../../components/paginate/Paginate'
import style from './Home.module.css'


export default function Home(props) {

  const dispatch = useDispatch()
  const allDogs = useSelector((state) => state.allDogs) 
  const allTemperaments = useSelector((state) => state.allTemps) 
  console.log(allTemperaments, 'hola');
  //Estados del paginado
  const [currentPage, setCurrentPage] = useState(1) //pagina actual y me setea esta 
  const [dogPerPage] = useState(12) // va a setear cuantos dogs quiero por pagina
  //constantes del paginado donde asocio las pag con los dogs por pag
  const indexOfLastDog = currentPage * dogPerPage //12
  const indexOfFirstDog = indexOfLastDog - dogPerPage //0 
  const currentDog = allDogs.slice(indexOfFirstDog, indexOfLastDog)

  // me va a ayudar al renderizado
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber)
  }
  //fin de paginado
  const [order, setOrder] = useState('') /* --> estado local vacío que me permite ordenar asc y desc */
  // ciclo que maneja todos los dogs
  useEffect(() => {
    dispatch(getAllDogs())
  }, [dispatch])

 

  //ciclo que busca por temperamentos
  useEffect(() => {
    dispatch(getTemperaments())
  }, [dispatch])



  //permite volver a cargar todos los dogs 
  function handlerClick(event) {
    event.preventDefault(); // para que no se recargue por defecto y asi no me rompa 
    dispatch(getAllDogs());
  }

  //filtro de los temperaments
  function handlerFilterStatus(event) {
    event.preventDefault();
    dispatch(filterByTemps(event.target.value))
    setCurrentPage(1)
  }

  //Filtrado por creado

  function handleFilterCreated(e) {
    dispatch(filterCreatedDog(e.target.value)) /* --> lo que viene del select que es el payload  */
    setCurrentPage(1)
  }

  // ordenamiento descendente y ascendente
  function handleSortName(e) {
    e.preventDefault();
    dispatch(orderByName(e.target.value));
    setCurrentPage(1);
    // Puedes eliminar la siguiente línea si no necesitas el estado 'order'
    // setOrder(`Ordenado ${e.target.value}`);
  }

  // function handleSortAttack(e) {                   ////////usar despues para filtrado///////
  //   e.preventDefault();
  //   dispatch(orderByAttack(e.target.value));
  //   setCurrentPage(1);
  //   // Puedes eliminar la siguiente línea si no necesitas el estado 'order'
  //   // setOrder(`Ordenado ${e.target.value}`);
  // }

  return (
    <div className={style.containerHome}>

      <div className={style.allOrder}>
        {/* name */}
        <div className={`${style.selectWrapper} ${style.selectOption}`}>
          <select className="order" onChange={(e) => handleSortName(e)}>
            <option>Select Order Alphabetical</option>
            <option value="asc">Ascendent</option>
            <option value="desc">Descendent</option>
          </select>
        </div>

        {/* <div className={`${style.selectWrapper} ${style.selectOption}`}>  //////////usar despues para filtrado////////
      <select className="attack" onChange={(e) => handleSortAttack(e)}> 
        <option>Select attack Order</option>
        <option value="asc">Ascendent attack</option>
        <option value="desc">Descendent attack</option>
      </select>
    </div> */}

     {/* mapeo de tipo */}
    <div className={`${style.selectWrapper} ${style.selectOption}`}>
    <select key="uniqueKey" onChange={(e)=> handlerFilterStatus(e)} defaultValue='default'>
    <option value="default" disabled>Select By Temperaments</option>
    {allTemperaments.map((dog) => (
        <option key={dog.id} value={dog.name}>
            {dog.name}
        </option>
    ))}
</select>
    </div>

    {/* filtro por procedencia */}

    <div className={`${style.selectWrapper} ${style.selectOption}`}>
      <select onChange={(e) => handleFilterCreated(e)}>
        <option>Select Dog</option>
        <option value="all">All Dog</option>
        <option value="api">Dog Api</option>
        <option value="dataBase">created Dog</option>          
        </select>
    </div>
    <div className={style.searchContainer}>
      <SearchBar />
    </div>
  </div>

  <div className={style.buttonR}>
    <button><Link to='/create' style={{ textDecoration: "none" }}>Create Dog</Link></button>
    <button onClick={handlerClick}>Reload Dog</button>
  </div>

  <div>
    <Paginate
      currentPage={currentPage}
      dogPerPage={dogPerPage}
      allDogs={allDogs.length}
      paginate={paginate}
    />
  </div>

  <div className={style.cardTas}>
    {currentDog.map(dog => (
        <Card
            key={dog.id}
            id={dog.id}
            name={dog.name}
            temperaments={dog.temperament}
            image={dog.image}
            height={dog.height}
            weight={dog.weight}
            life_span={dog.life_span}
        />
    ))}
  </div>

  <div>
    <Paginate
      currentPage={currentPage}
      dogPerPage={dogPerPage}
      allDogs={allDogs.length}
      paginate={paginate}
    />
  </div>
</div>
  )
}
