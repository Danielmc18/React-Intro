
//importar siempre react
import React from "react";
//esta es la forma de empezar a crear los estilos
import './TodoCounter.css';



//Forma de agregar estilos en formato de linea
// const estilos = {

//     color: 'red',
//     backgroundColor: 'yellow',


// };

//componente
//ahora hay que recibir la info al todocounter para funcionar 
//en las props que son los parametros se podria decir
function TodoCounter({total,completed}){

    //y por eso aqui accedemos como si fuera un objeto
    // const = {total, completed} = props
    return (

        <h2 className="TodoCounter">
            Your Tasks<br>
            </br>Completed {completed} of {total} 
        </h2>
    );
}



//es el exports obligado a que sea el mismo nombre
export { TodoCounter };