import React from "react";
import './TodoSearch.css'

//Aqui es un evento para poder escuchar lo que se escribio 
//en el input y ver los cambios del texto


function TodoSearch({searchValue, setSearchValue}){

    //esto es para crear una variable de estado en react son herramientas
    //que empiezan con use el estado inicial iria en los ()
    //esto te devuelve el estado y la funcion delestado para editarlo
    const onSearchValueChange = (event) =>{

        console.log(event.target.value);
        setSearchValue(event.target.value);
    }

    return(
        
        <input 
            placeholder="Cebolla" 
            className="TodoSearch"
            value={searchValue}
            onChange={onSearchValueChange}
        />
    );
}

export {TodoSearch};