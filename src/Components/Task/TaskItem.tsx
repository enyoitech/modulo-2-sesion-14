import React, { useState, ChangeEvent, FC } from 'react'
import './TaskItem.css';

interface IProps {
  name: string,
  description: string,
  id: number,
  state: boolean,
  updateList: Function,
  deleteTask: Function,
  editTask: Function
}

export const TaskItem: FC<IProps> = ({ name, description, id, state, updateList, deleteTask, editTask }) => {
  const [seleccion, setSeleccion] = useState<string>(state ? 'Ejecutada' : 'Pendiente');

  const changeSelect = (event: ChangeEvent<HTMLSelectElement>) => {
    // console.log('algo cambios', event);
    // console.log('value', event.target.value);
    // const valueSelected = event.target.value;
    setSeleccion(event.target.value)
    const stateUpdate = (event.target.value === 'Ejecutada') ? true : false;
    updateList(id, stateUpdate)
  }
  return (

    <div className="card my-4">
      <ul className="list-group list-group-flush">
        <li className="list-group-item"> <strong>Tarea</strong> : {name}</li>
        <li className="list-group-item"><strong>Descripcion</strong>: {description}</li>
        <li className={seleccion === 'Ejecutada' ? 'list-group-item ejecutada': 'list-group-item pendiente' }>
          <strong>Estado</strong>: {seleccion}
        </li>
        <li className="list-group-item">
          <select onChange={(event) => changeSelect(event)}
            defaultValue={seleccion}
            className="form-select"
            aria-label="Default select example"
          >
            <option value="Ejecutada">Ejecutada</option>
            <option value="Pendiente">Pendiente</option>
          </select>
        </li>
        <li className="list-group-item"> 
          <button type='button' 
          onClick={()=>editTask(id)}
          className='btn btn-success'>
              Editar
          </button>
          <button type='button' 
                className='btn btn-danger mx-2'
                onClick={()=>deleteTask(id)}>
           Eliminar
         </button>
        </li>
       
      </ul>
    </div>

  )
}



