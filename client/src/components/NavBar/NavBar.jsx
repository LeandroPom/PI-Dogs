import React from 'react'
import style from './NavBar.module.css'
import { NavLink } from 'react-router-dom';
import logo from './icon_dogs.png'
//import SearchBar from '../searchBar/SearchBar';

export default function NavBar() {
  return (
    <nav className={style.navbar}>
      <header className={style.container}>
      <NavLink to = "/home">
          <img className={style.imgDog} src={logo} alt='Logo Dogs'/>
      </NavLink>
      </header>
    <div className ={style.navbuttons}>
    {/* <NavLink to = "/about" className = {style.navbarlink}>
      About
      </NavLink> */}
      
    </div>
    </nav>
  )
}