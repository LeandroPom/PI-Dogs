import React from "react";
import { Link } from "react-router-dom";
import style from './card.module.css'

export default function Card({ id, name, image, temperaments, weight, life_span }) {
  const formTemperaments = Array.isArray(temperaments)
    ? temperaments.map(temperament => temperament.charAt(0).toUpperCase() + temperament.slice(1)).join(' / ')
    : typeof temperaments === "string"
      ? temperaments.charAt(0).toUpperCase() + temperaments.slice(1)
      : 'Unknown Temperaments';

  const imageUrl = `https://cdn2.thedogapi.com/images/${image}.jpg`;

  return (
    <div>
      <div className={style.cardN}>
        <Link to={`/detail/${id}`} style={{ textDecoration: "none" }}>
          <div className="card-img">
            <div className={style.cardInfo}>
            <img src={imageUrl} alt='Not Found' />
              <h3>Name: {name}</h3>
              <p>Weight: {weight}</p>
              <p>Temperaments: {formTemperaments}</p>
            </div>
            <div></div>
          </div>
        </Link>
      </div>
    </div>
  );
}