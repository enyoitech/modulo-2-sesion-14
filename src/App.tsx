import { useState, useEffect } from 'react'
import { Form } from './Components/Form/Form'
import { Navbar } from './Components/Navbar/Navbar';
import { TaskItem } from './Components/Task/TaskItem';



interface data{
  name: string,
  description: string,
  id: number,
  state: boolean
}
function App() {

  const [taskList, setTaskList] = useState(Array<data>)
  const [ taskSelect, setTaskSelect]= useState<data>(Object);

  useEffect(() => {
    console.log('llego a modificar el doom')
    let dataLocal = localStorage.getItem('listaTareas');
    // dataLocal= dataLocal? JSON.parse(dataLocal): null;
    // dataLocal? setTaskList(dataLocal):setTaskList(misTareasLista)

    dataLocal? setTaskList( JSON.parse(dataLocal)): setTaskList(misTareasLista);

  },[])
  
  const misTareasLista = [
    {
      id: 1,
      name: 'Lavar platos',
      description: ' lavar bien los platos en la noche',
      state: false
    },
    {
      id: 2,
      name: 'Lavar ropa',
      description: ' lavar bien los ropa  en la noche',
      state: true
    },
    {
      id: 3,
      name: 'ir al supermercado',
      description: 'Comprar Todo el mercado',
      state: false
    },

  ]

  const updateList = (id: number, state: boolean) => {
    console.log(id, state);
    taskList.map( (element) => element.id === id ? element.state =state: element);
    console.log(taskList);
  }

  const createTask = (name: string, description: string) =>{

    // setTaskList(
    //   [...taskList, {name: name, description: description, state: false, id: 4}]
    // );
    const  idTmp = taskList.length+1;

    setTaskList(
      [...taskList, {name, description, state: false, id: idTmp}]
    );
    console.log(taskList)
    localStorage.setItem('listaTareas', JSON.stringify([...taskList, {name, description, state: false, id: idTmp }]));

  }

  const deleteTask = (id: number) =>{

    console.log(id)
   const nuevoListado= taskList.filter( (tarea)=> tarea.id !== id );
    setTaskList(nuevoListado)
  }

  const editTask = (id: number) =>{
    // console.log(id);
    const tareaSeleccionada= taskList.filter( (tarea)=> tarea.id === id );
    // console.log(tareaSeleccionada[0])
    setTaskSelect(tareaSeleccionada[0])
  }

  const updateTaskSelected = (name: string, description: string, id: number, state: boolean) =>{
    /**
     * el error presentando en clase se debio a que taskList al ser un state de react no se puede modificar
     * a traves del metodo map ya que se debe utilizar setTaskList
     * entonces procedemos a crear una copia de lo que contenga taskList y modificamos esa copia (newData)
     * y luego actualizamos taskList utilizando su funcion setTaskList() a la cual le enviamos la copia
     * modificada (newData)
     */
    const newData = [...taskList];
    newData.map((elemento)=>{
      if (elemento.id === id) {
        elemento.name= name;
        elemento.description= description;
        elemento.state= state;
      }
      return(elemento)
    })
    setTaskList(newData)
    localStorage.setItem('listaTareas', JSON.stringify(newData));
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
           <Navbar
           countTask={5}
           /> 
          </div>
        <div className="col-6">
          {
            taskSelect.name?
              <Form
              taskSelect={taskSelect}
              updateTaskSelected={updateTaskSelected}
              />
            :
            <Form
            createTask={createTask}
            />
          }
        </div>
        <div className="col-6">
          {
            taskList.map((taskItemElemt)=> {
              return( 
                <TaskItem 
                key={taskItemElemt.id}
                
                name = {taskItemElemt.name}
                description={taskItemElemt.description}
                id={taskItemElemt.id}
                state={taskItemElemt.state}
                updateList={updateList}
                deleteTask={deleteTask}
                editTask={editTask}
                /> 
                )
              } )
            }
        </div>
      </div>
    </div>
  )
}

export default App
