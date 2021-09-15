const uri= "https://api.spotify.com/v1/artists/3fMbdgg4jU18AjLCKBhRSm/top-tracks?market=US"

const token="Bearer BQAipW7n-gz92dSZagEbZpDQKTm5q8e6UYhFqqDjOdboymcTGxVHhhG-lKvuRPvlhP89qRo0UIdIbOu_mzW3e0qqvDf0Nu2-KBNB8OXjmPuQwAyaABo7RHHar5H4j0PlN5MLPUpG7QyfZX9tp4wXcWO5qT6UCcf_11o"

let parametros={
method:"GET",
headers:{
        Authorization:token
    }
}
/*transformar en JSON*/ 
fetch(uri,parametros)

.then(function(respuesta){
    return(respuesta.json())
})

//PINTAR DATOS
.then(function(respuesta){
    console.log(respuesta)
    pintarDatos(respuesta)
  //DE LO CONTRARIO ERROR
})
.catch(function(error){
    console.log(error)
})

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
        titulo.textContent=cancion.name;

        //CREO ETIQUETAS DE AUDIO

        let audio=document.createElement("audio")
        audio.classList.add("w-100")
        audio.classList.add("mt-5")
        audio.setAttribute("controls","controls")
        audio.src=cancion.preview_url

      ///popularidad
       /* let h1=document.createElement("h1")
        h1.classList.add("w-100")
        h1.classList.add("mt-5")
        h1.setAttribute("controls","controls")
        h1.textContent=cancion.popularity*/

        //padres e hijos
        
        tarjeta.appendChild(imagen);
        tarjeta.appendChild(audio)    
        tarjeta.appendChild(titulo);   
        columna.appendChild(tarjeta);
        fila.appendChild(columna);


    })
}











  /*console.log(respuesta.tracks)
    console.log(respuesta.tracks[0])
    console.log(respuesta.tracks[0].preview_url)
    console.log(respuesta.tracks[0].name)
    console.log(respuesta.tracks[0].album.images[0].url)*/