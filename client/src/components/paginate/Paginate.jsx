import React from 'react';
import styles from './paginate.module.css'; // Importar el módulo de estilos

export default function Paginate({ dogPerPage, allDogs, paginate, activePage, currentPage }) {
  const pageNumbers = [];
  const totalPage = Math.ceil( allDogs / dogPerPage) //da el numero de paginas totales

  for (let i = 0; i < totalPage; i++) {
    pageNumbers.push(i + 1);
  }

  return (
    <nav>
      <div className={styles.paginate}> {/* Utilizar la clase CSS desde el módulo */}
      <button onClick={()=>{currentPage > 1 && paginate(currentPage - 1)}}>⮜</button> {/*cuando esta en la primer pag no retrocede mas */}
        {pageNumbers &&
          pageNumbers.map((number) => (
            <div className={styles.number} key={number}>
            
              <button onClick={() => paginate(number)} className={number === activePage ? styles.active : ''}>
                {number}
              </button>
            </div>
          ))}
          <button onClick={()=>{currentPage < totalPage && paginate(currentPage + 1)}}>⮞</button> 
      </div>
    </nav>
  );
}