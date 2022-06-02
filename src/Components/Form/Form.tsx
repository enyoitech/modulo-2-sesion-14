import React, {FC, FormEvent, ChangeEvent, useState} from 'react'

interface IProps{
  createTask?: Function,
  taskSelect?: data,
  updateTaskSelected?: Function
}

interface data{
  name: string,
  description: string,
  id: number,
  state: boolean
}
export const Form:FC<IProps> = ({createTask, taskSelect, updateTaskSelected}) => {
  const [seleccion, setSeleccion] = useState<string>(taskSelect?.state ? 'Ejecutada' : 'Pendiente');
  const [stateUpdate, setStateUpdate] = useState<boolean>(true);


  const changeSelect = (event: ChangeEvent<HTMLSelectElement>) => {
    // console.log('algo cambios', event);
    // console.log('value', event.target.value);
    // const valueSelected = event.target.value;
    // console.log(event.target.value)
    setStateUpdate( (event.target.value === 'Ejecutada') ? true : false);
    
  }

  const capturaData = (event: FormEvent<HTMLFormElement>) =>{

    event.preventDefault();
    const {name, description} = event.target as typeof event.target & {
      name: {value: string},
      description: {value: string}
    }
    // console.log(name.value)
    // console.log(description.value)

      if (createTask) {
        createTask? createTask(name.value, description.value): null ;
      }

      if (updateTaskSelected) {
        console.log(stateUpdate)
        updateTaskSelected? updateTaskSelected(name.value, description.value, taskSelect?.id, stateUpdate): null ;
      }
  }

  

  return (
    <>
      <form action="" onSubmit={(event)=> capturaData(event) }>

        <div className="mb-3">
          <label htmlFor="name" className="form-label">Nombre Tarea</label>
          <input type="text"
            name='name'
            className="form-control"
            id="name"
            defaultValue={taskSelect?.name ? taskSelect?.name : ''}
            placeholder="Ingrese tarea" />
        </div>
        <div className="mb-3">
          <label htmlFor="description"
            className="form-label">Descripcion</label>
          <textarea className="form-control"
            name='description'
            defaultValue={taskSelect?.description? taskSelect?.description : ''}
            id="description" rows={3}></textarea>
        </div>
        {
          taskSelect?.id?
              <select  onChange={(event) => changeSelect(event)}
              defaultValue={seleccion}
              className="form-select my-2"
              aria-label="Default select example"
            >
              <option value="Ejecutada">Ejecutada</option>
              <option value="Pendiente">Pendiente</option>
            </select>
          :
          null
        }
       

        <input type="submit" value={taskSelect?.id? 'Actualizar' : 'Crear'}/>
      </form>

    </>
  )
}
