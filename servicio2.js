let uri="https://accounts.spotify.com/api/token"

let dato1="grant_type=client_credentials";
let dato2="client_id=b01a6443106b423583732dea8ab9f603";
let dato3="client_secret=1ec365707b2a485faef9e3db1e3f2e67";

let parametrosPOST={
    method:"POST",
    headers:{
        "Content-Type": 'application/x-www-form-urlencoded'
    },
    body:dato1+"&"+dato2+"&"+dato3
}


fetch(uri,parametrosPOST)
.then(function(respuesta){
    return(respuesta.json())
})

.then(function(respuesta){
    console.log(respuesta) 
    generarToken(respuesta) 
})
.catch(function(error){
    console.log(error)
})

function generarToken(respuesta){
    
    const token=respuesta.token_type+" "+respuesta.access_token;
    console.log(token)
    buscarCanciones(token)

}

function buscarCanciones(token){
    const uri= "https://api.spotify.com/v1/artists/3fMbdgg4jU18AjLCKBhRSm/top-tracks?market=US"

    let parametros={
        method:"GET",
        headers:{
                Authorization:token
            }
        }

        fetch(uri,parametros)
        .then(function(respuesta){
            return(respuesta.json())
        })
        .then(function(respuesta){
            console.log(respuesta)
            pintarDatos(respuesta)
          
        })
        .catch(function(error){
            console.log(error)
        })      
}

function pintarDatos(datos){
    let fila=document.getElementById("fila");

    datos.tracks.forEach(function(cancion){
        
        let columna=document.createElement("div");
        columna.classList.add("col");

        let tarjeta=document.createElement("div")
        tarjeta.classList.add("card");
        tarjeta.classList.add("h-100");

        let imagen=document.createElement("img")
        imagen.classList.add("card-img-top");
        imagen.src=cancion.album.images[0].url

        let titulo=document.createElement("h5")
        titulo.classList.add("mt-2")
        titulo.classList.add("text-center")
        titulo.textContent="Tema: " + cancion.name;


        let album=document.createElement("h5")
        album.classList.add("mt-2")
        album.classList.add("text-center")
        album.textContent= "Album: " + cancion.album.name;

        //CREO ETIQUETAS DE AUDIO

        let audio=document.createElement("audio")
        audio.classList.add("w-100")
        audio.classList.add("mt-2")
        audio.setAttribute("controls","controls")
        audio.src=cancion.preview_url

      ///popularidad
      let h1=document.createElement("h5")
      h1.classList.add("text-center")
      h1.textContent="Popularidad: "+cancion.popularity;

        //padres e hijos
        

        tarjeta.appendChild(imagen);
        tarjeta.appendChild(audio);       
        tarjeta.appendChild(h1); 
        tarjeta.appendChild(album);      
        tarjeta.appendChild(titulo);   
        columna.appendChild(tarjeta);
        fila.appendChild(columna);


    })
}