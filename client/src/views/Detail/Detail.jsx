import React, { useEffect } from 'react'
import {useParams, Link} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import { getDetailDog } from '../../redux/actions'
import style from './Detail.module.css'


export default function Detail() {

  const dispatch = useDispatch()
  const {id} = useParams()
  
  
  useEffect(()=>{
    dispatch(getDetailDog(id))
  },[dispatch, id])
     
  const detailDog = useSelector((state) => state?.details);
  const selectedDog = detailDog?.find(dog => dog.id === parseInt(id));
  if(!selectedDog){
    
    return <div>"no se encontró"</div>

  }
  
  

  return (
    <div className={style.detailContainer}>
    <div className={style.detailInfo}>
      <h1>Name: {selectedDog?.name}</h1>
      <h1>Height: {selectedDog?.height}</h1>
      <h1>Weight: {selectedDog?.weight}</h1>
      <h1>Life span: {selectedDog?.life_span}</h1>
      <h1>Temperaments: {selectedDog?.allTemps && selectedDog.allTemps.map(p => (p.charAt(0).toUpperCase() + p.slice(1))).join(' / ')}</h1>
    </div>
      <div className={style.detailImage}>
      <img src={selectedDog?.image} alt="" className="card-image" />
      <button>
        <Link to='/home' style={{ textDecoradogtion: "none" }}>Home</Link>
      </button>
    </div>
    </div>
  )
}
