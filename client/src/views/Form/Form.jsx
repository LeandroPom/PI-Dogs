import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { postDog, getTemperaments} from '../../redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import style from './Form.module.css'
const isValid = /^[a-zA-Z]+$/;

// Validaciones
function validate(input) {
  const errors = {};

 
  if (input.name.trim().length === 0) {
    errors.name = 'Te has olvidado de ingresar tu nombre';
  }

  if (input.name.length < 3 || input.name.length > 12) {
    errors.name = 'El nombre debe contener de 3 a 12 letras';
  }
  
  if(!isValid.test(input.name)){
    errors.name = 'El nombre solo debe contener letras'
  }

  if(input.life_span > 999 || input.life_span < 0){
    
    errors.life_span = 'Este campo solo admite valores de 0 hasta 999';
  }
  
  if(input.height > 999 || input.height< 0){
 errors.height = 'Este campo solo admite valores de 0 hasta 999';
  }
  
  if( input.weight > 999 || input.weight< 0){
errors.weight = 'Este campo solo admite valores de 0 hasta 999';
  }

  if (input.temperaments.length === 0) {
    errors.temperaments = 'Debes elegir al menos un temperamento';
  }
  return errors;
}

const Form = () => {
  const dispatch = useDispatch();
  const tempsDogs = useSelector((state) => state.allTemps);
  // Ahora puede acceder al historial de rutas a través del objeto `history`.
  const history = useHistory();

 
  const [errors, setErrors] = useState({});

  const [initialFormState, setInitialFormState] = useState({
    name: '',
    life_span: '',
    height: '',
    weight: '',
    temperaments: '',
    createdInDb: true,
  });

  const [input, setInput] = useState({ ...initialFormState });

  useEffect(() => {
    dispatch(getTemperaments());
  }, [dispatch]);

  const handleInputChange = (event) => {
  setInput({
    ...input,
    [event.target.name]: event.target.value,
  });
  setErrors(validate({
    ...input,
    [event.target.name]: event.target.value,
  }))
};

  const handleSubmit = (event) => {
    event.preventDefault();
    const { errors, ...sinErrors } = initialFormState;
    const result = validate(sinErrors);
    setInput({
      ...input,
      errors: result,
    });
    dispatch(postDog(input));
    setInput({ ...initialFormState });
    history.push('/home');
    setInitialFormState()
  };

  return (
    <div className={style.formBack}>
    <div className={style.searchInput}>
      <h1>Crear un nuevo Dog</h1>
      <form onSubmit={handleSubmit}>
        <div >
          <input
            type="text"
            name="name"
            value={input.name}
            placeholder="Nombre"
            onChange={handleInputChange}
            autoComplete="off"
            required
          />
          {errors.name && <p>{errors.name}</p>}
        </div>
        <div>
          <input
            type="text"
            name="life span"
            value={input.life_span}
            placeholder="life span"
            onChange={handleInputChange}
            autoComplete="off"
            required
          />
          {errors.life_span && <p>{errors.life_span}</p>}
        </div>       
        <div>
          <input
            type="number"
            name="height"
            value={input.height}
            placeholder="Altura"
            onChange={handleInputChange}
            autoComplete="off"
            required
          />
          {errors.height && <p>{errors.height}</p>}
        </div>
        <div>
          <input
            type="number"
            name="weight"
            value={input.weight}
            placeholder="Peso"
            onChange={handleInputChange}
            autoComplete="off"
            required
          />
          {errors.weight && <p>{errors.weight}</p>}
        </div>
        <div>
          <select
            className="temperaments"
            value={input.temperaments}
            onChange={handleInputChange}
            autoComplete="off"
            name="temperaments"
            required
            //multiple
          >
            <option value="">Select By Temps</option>
            {tempsDogs &&
              tempsDogs.map((dog) => (
                <option key={dog.id} value={dog.name}>
                  {dog.name}
                </option>
              ))}
          </select>
          {errors.temps && <p>{errors.temps}</p>}
        </div>
        <button type="submit">Crear</button>
      </form>
    </div>
      <Link to="/home">
        <button className={style.buttonHome}>To Home</button>
      </Link>
    </div>
  );
};

export default Form;

