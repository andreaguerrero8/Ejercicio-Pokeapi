const main = document.getElementById('main');
const form = document.getElementById('form');
const search = document.getElementById('search')

const previous = document.getElementById('previous')
const next = document.getElementById('next')


const API_URL = "https://pokeapi.co/api/v2/pokemon/" //{id or name}/


// botones de siguiente y atras
let offset = 1;
let limit = 19;

previous.addEventListener('click', () => {
    if (offset != 1) {
        offset -= 20;
        removeChilNodes(main);
        enviarIds(offset, limit)
    } else {
        Swal.fire('Estás en la primera página')
    }

});
next.addEventListener('click', () => {
    if (limit != null) {
        offset += 20
        removeChilNodes(main);
        enviarIds(offset, limit)
    }
    else{
        Swal.fire('Estás en la última página')
    }
});




//traer la url del pokemon por el id
const peticion = async (id) => {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
    const data = await res.json()
    showPokemones(data);
    
}


//crear los ids para enviarlos a peticion
const enviarIds = (offset, limit) => { //mecanismo de paginacion donde offset indica el número del primer registro a retornar.La cláusula limit indica el número máximo de registros a retornar; 
    for (let i = offset; i <= offset + limit; i++) {
        peticion(i)
    }
}



//funcion de mostrar los pokemones
const showPokemones = (pokes) => {
    const { name, id, sprites } = pokes
    const movieDiv = document.createElement('div')
    movieDiv.classList.add('movie')
    movieDiv.innerHTML += `
        <img src="${sprites.front_default}" alt="">
        <div class="movie-info">
            <h3>${name}</h3>
            <span class="orange">${id}</span>
        </div>
            <div class="overview">
                <h3>${name}</h3>
            </div>
        </div>
        
        `
    main.appendChild(movieDiv);
}


//funcion de escucha al evento de buscar
form.addEventListener('submit', (e) => {
    e.preventDefault(); // para que no se recargue la pagina

    const searchTerm = search.value.toLowerCase();
    if (searchTerm && searchTerm !== '') { //si esto existe y ademas no esta vacio es porque el usuario escebio algo
        buscar(API_URL + searchTerm);
        search.value = '';
    }
    else {
        swal.fire({
            title: 'Error!',
            text: 'Debe escribir algo en la barra de busqueda',
            icon: 'error',
            confirmButtonText: 'Aceptar'
        })
    }

})


//funcion para buscar los pokemones en el input search
const buscar = async (buscado) => {
    try { // es una vaidacon donde se ejecuta esta linea y si hay un error pasa al catch
        const res = await fetch(buscado)
        const data = await res.json()

        console.log(data);
        resultBusqueda(data);

    } catch (error) {
        swal.fire({
            title: 'Error..!',
            text: 'No se ha encontrado ningun pokemon, Ingrese nombre o número del pokemon que desea buscar',
            icon: 'error',
            confirmButtonText: 'Aceptar'
        })
    }
}


//mostrar resultado de la busqueda
const resultBusqueda = (data) => {
    main.innerHTML = '';
    const movieDiv = document.createElement('div')
    movieDiv.classList.add('movie')
    movieDiv.innerHTML = `
        <img src="${data.sprites.front_default}" alt="">
        <div class="movie-info">
            <h3>${data.name}</h3>
            <span class="orange">${data.id}</span>
        </div>
            <div class="overview">
                <h3>${data.name}</h3>
            </div>
        </div>
        </div>
        
        `
    main.appendChild(movieDiv);

}

//funcion que elimina si hay una tarjeta dentro del contenedor padre (main)

function removeChilNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild)
    }
}

enviarIds(offset, limit)