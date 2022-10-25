const express = require("express");
const app = express();
const port = 3000;

const artistas = require("./controllers/artistas");
const albumes = require("./controllers/albumes");
const canciones = require("./controllers/canciones");

app.use(express.json());

app.get("/", (_, res) => {
    res.send("SpoTICfy API working!");
});

/* ------------------- Rutas ------------------- */

// Artistas
// Completar con las rutas de artistas
// Para acceder a cada funcion de artistas, se debe hacer de la siguiente forma:
// artistas.getArtistas;
// artistas.getArtista;
// ...
app.get('/artistas', artistas.getArtistas);

app.get('/artistas/:id', artistas.getArtista);

app.post('/artistas', artistas.createArtista);

app.put('/artistas/:id', artistas.updateArtista);

app.delete('/artistas/:id', artistas.deleteArtista);

app.get('/artistas/:id/albumes', artistas.getAlbumesByArtista);

app.get('/artistas/:id/canciones', artistas.getCanionesByArtista);
// Albumes
// Completar con las rutas de albumes
// Para acceder a cada funcion de albumes, se debe hacer de la siguiente forma:
// albumes.getAlbumes;
// albumes.getAlbum;
// ...
app.get('/albumes', albumes.getAlbumes);

app.get('/albumes/:id', albumes.getAlbum);

app.post('/albumes', albumes.createAlbum);

app.put('/albumes/:id', albumes.updateAlbum);

app.delete('/albumes/:id', albumes.deleteAlbum);

app.get('/albumes/:id/canciones', albumes.getCancionesByAlbum);

// Canciones
// Completar con las rutas de canciones
// Para acceder a cada funcion de canciones, se debe hacer de la siguiente forma:
// canciones.getCanciones;
// canciones.getCancion;
// ...
app.get('/canciones', canciones.getCanciones);

app.get('/canciones/:id', canciones.getCancion);

app.post('/canciones', canciones.createCancion);

app.put('/canciones/:id', canciones.updateCancion);

app.delete('/canciones/:id', canciones.deleteCancion);

app.put('/canciones/:id/reproducir', canciones.reproducirCancion);

app.listen(port, () => {
    console.log(`SpoTICfy API listening at http://localhost:${port}`);
});