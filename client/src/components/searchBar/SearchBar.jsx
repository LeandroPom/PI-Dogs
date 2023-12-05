import React, { useState } from 'react';
import { getNameDogs } from '../../redux/actions';
import { useDispatch } from 'react-redux';
import style from './searchBar.module.css'


export default function SearchBar() {
  const dispatch = useDispatch();
  const [name, setName] = useState('');

  // Guarda en mi estado local lo que se escribió en el input
  function handleInputChange(event) {
    event.preventDefault();
    setName(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    dispatch(getNameDogs(name));
    setName('');
  }

  return (
    <div>
      <div className={style.searchInput}>
        <input
          type="text"
          placeholder="Search Dog"
          value={name}
          onChange={(e) => handleInputChange(e)}
        />
      <button type="submit" onClick={(e) => handleSubmit(e)}>
        Search
      </button>
      </div>
    </div>
  );
}
