import React from 'react'
import {useSelector } from 'react-redux'
import Card from '../card/Card'
import style from './cards.module.css'

export default function Cards(props){ 
    const dogs = useSelector(state => state.allDogs)
   
    return <div>
    <div className={style.cardsContainer}>
{       
        dogs.map((dogs)=>{
        return(
        <Card
            key={dogs.id}
            image={<img src={dogs.image} alt={dogs.name} />}
            name={<label>Name: {dogs.name}</label>}
            id={<label>Id: <span>{dogs.id}</span></label>}
            height={<label>Height: {dogs.height}</label>}
            weight={<label>Weight: {dogs.weight}</label>}
            hp={<label>Life Span: {dogs.life_span}</label>}
            type={<label>Temperaments: {dogs.temperament}</label>}
        />
        )
    })}
    </div>
</div>
}