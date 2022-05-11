import React from 'react';
import { AppUI } from './AppUI';

// const defaultTodos = [
//   { text: 'Cortar cebolla', completed: true },
//   { text: 'Tomar el cursso de intro a React', completed: false },
//   { text: 'Llorar con la llorona', completed: false },
//   { text: 'LALALALAA', completed: false },
// ];

function useLocalStorage(itemName, initialValue){

  //simular que esta cragando
  const [error,setError] = React.useState(false)
  const [loading,setLoading] = React.useState(true)
  //el estado es item y el setItemes la funcion para actualizar el estado
  const [item, setItem] = React.useState(initialValue);

  //------------------------SECCION DEL LOCAL STORAGE----------------------
  //-----------------------------------------------------------------------
  //ESTO VA A SER UN STRING DE JSON, trayendo los todos
  //aqui es para poder hacer un puente con nuestros todos y el 
  //localstorage
  //llamamos algun elemento

  React.useEffect(()=>{

    setTimeout(() => {
  
      try {
        
          const localStorageItem = localStorage.getItem('itemName');
          let parsedItem;

          //el ! null, undefined, false o string vacio
          if (!localStorageItem) {
            //aqui es cuando no hay ninguno todavia
            localStorage.setItem('itemName', JSON.stringify(initialValue));
            parsedItem = initialValue;
          } else {
            //aqui es donde si ya tienen algun todo ya creado
            parsedItem = JSON.parse(localStorageItem);
          }

          setItem(parsedItem);
          //aqui ya es como que todo salio bien asi que a no va a cargar
          setLoading(false)
      } catch (error) {
        setError(error)
      }
    }, 1000);
  });

  const saveItem = (newItem) =>{

    try {
      const stringifiedItem = JSON.stringify(newItem);

      localStorage.setItem(itemName,stringifiedItem);
  
      setItem(newItem)
    } catch (error) {
      setError(error);
    }

  };

  return {
    item,
    saveItem,
    loading,
    error,
  };
}

//cada vez que cambiamos el estado lo que hace react es Re-render 
function App() {
    /*
      -----------Aqui es donde vamos a usar nuestra react hook--------- 
      Despues del localstorage es como decirle en donde lo quieres guardar
      y ahi es usando el hook que tenemos arriba que es useLocalStorage
    */
  
  const {
    item: todos,
    saveItem: saveTodos,
    loading,
    error,
  } = useLocalStorage('TODOS_V1',[]);

  //cambiar = estado
  //esto es para manejar el estado del TodoSearch so hay que enviarlas 
  const [searchValue, setSearchValue] = React.useState('');

  //Seccion para el TodoCounter
  //variable para contar los TODOS ya hechos
  // !! falso flaso 
  const completedTodos = todos.filter(todo => !!todo.completed).length;
  const totalTodos = todos.length;


  let searchedTodos = [];

  //aqui es para ver si los usaurios han escrito algo sino se va a mostrar
  //igual que siempre
  if (!searchValue.length >=1 ) {
    searchedTodos = todos;

    //si escriben lo que vamos a hacer es:
  }else{

    //estamos convirtiendo todo en minusculas 
    searchedTodos = todos.filter(todo=>{

      //esto es para convertir tanto lo que escribamos como los todos en minusculas
      const todoText = todo.text.toLowerCase();
      const searchText = searchValue.toLowerCase();
      //y aqui vemos si incluyen lo que estemos escribiendo
       return todoText.includes(searchText);
    });
  }

  //---------------------SECCION PARA COMPLETAR Y BORRAR TODOS-------------
  //-----------------------------------------------------------------------

  //enviamos un texto
  const completTodo = (text) =>{
    //y aqui examinar todo por todo cual tiene ese texto y vamos a 
    //obtener el index con el metodo findIndex
    const todoIndex = todos.findIndex(todo => todo.text === text);


    //TENEMOS QUE CREAR NUESTRO ESTADO PARA PODER ELIMINAR
    // el ... es para pasarle los todos que ya estaban
    const newTodos = [...todos];
    //otra forma de hacerlo
    newTodos[todoIndex].completed = true;
    saveTodos(newTodos);
    //Primera forma de hacerlo
    // todos[todoIndex]={
    //   text: todos[todoIndex].text,
    //   completed: true,
    // };
  };

  //Para BORRAR
  const deleteTodo = (text) =>{
    //buscar que tiene el texto igual
    const todoIndex = todos.findIndex(todo=> todo.text===text);
    //una copia del mismo
    const newTodos = [...todos];
    //aqui es donde lo vamos a borrar 
    //primero es desde donde y luego cuanto va a borrar
    newTodos.splice(todoIndex,1);
    saveTodos(newTodos);

  };
  /*
    --------------------SECCION DONDE VAMOS A VER LOS EFECTOS DE REACT
    -------------------------------------------------------------------------
    es como poner condiciones para ver cuando nosotros queremos ejecutar
    el codigo encapsulado en la funcion react.useeffect()
    [] si le enviamos un array vacio solo se va a ejecutar el efecto solo una vez
    cuando se renderice 
  */

  // console.log("Render (antes de usar use effect)");

  // React.useEffect(()=>{

  //   console.log('use effect');


  // },[totalTodos]);

  // console.log("render luego del use effect");

  return(
    <AppUI 
        loading={loading}
        error={error}
        totalTodos={totalTodos}
        completedTodos={completedTodos}
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        searchedTodos={searchedTodos}
        completeTodo={completTodo}
        deleteTodo={deleteTodo}
    />
  );

}

  

export default App;
