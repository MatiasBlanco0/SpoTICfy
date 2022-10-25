const conn = require("../db");

const getAlbumes = (_, res) => {
    // Completar con la consulta que devuelve todos los albumes
    // Recordar que los parámetros de una consulta GET se encuentran en req.params
    // Deberían devolver los datos de la siguiente forma:
    /*
        [
            {
                "id": 1,
                "nombre": "Nombre del album",
                "nombre_artista": "Nombre del artista"
            },
            {
                "id": 2,
                "nombre": "Nombre del album",
                "nombre_artista": "Nombre del artista"
            },
            ...
        ]
    */
    conn.execute('SELECT albumes.id, albumes.nombre, artistas.nombre AS nombre_artista FROM albumes INNER JOIN artistas ON albumes.artista = artistas.id', (err, rows) => {
        if (err) {
            console.log("Error: ", err);
            return res.sendStatus(500);
        }
        else {
            res.json(rows);
        }
    })
};

const getAlbum = (req, res) => {
    // Completar con la consulta que devuelve un album por id
    // Recordar que los parámetros de una consulta GET se encuentran en req.params
    // Deberían devolver los datos de la siguiente forma:
    /*
        {
            "id": 1,
            "nombre": "Nombre del album",
            "nombre_artista": "Nombre del artista"
        }
    */
    const id = parseInt(req.params.id);
    if (isNaN(id)) return res.status(400).json("El id no es un numero entero");
    conn.execute('SELECT albumes.id, albumes.nombre, artistas.nombre AS nombre_artista FROM albumes INNER JOIN artistas ON albumes.artista = artistas.id WHERE albumes.id = ?', [id], (err, rows) => {
        if (err) {
            console.log("Error: ", err);
            return res.sendStatus(500);
        }
        else {
            res.json(rows);
        }
    })
};

const createAlbum = (req, res) => {
    // Completar con la consulta que crea un album
    // Recordar que los parámetros de una consulta POST se encuentran en req.body
    // Deberían recbir los datos de la siguiente forma:
    /*
        {
            "nombre": "Nombre del album",
            "artista": "Id del artista"
        }
    */
    const nombre = req.body.nombre;
    const artista = parseInt(req.body.artista);
    if (!nombre || isNaN(artista)) return res.status(400).json("Ingrese datos validos");
    conn.execute('INSERT INTO albumes(nombre, artista) VALUES(?,?)', [nombre, artista], (err, _) => {
        if (err) {
            console.log("Error: ", err);
            return res.sendStatus(500);
        }
        else {
            return res.json("Album creado");
        }
    })
};

const updateAlbum = (req, res) => {
    // Completar con la consulta que actualiza un album
    // Recordar que en este caso tienen parámetros en req.params (el id) y en req.body (los demás datos)
    // Deberían recbir los datos de la siguiente forma:
    /*
        {
            "nombre": "Nombre del album",
            "artista": "Id del artista"
        }
    */
    const nombre = req.body.nombre;
    const artista = parseInt(req.body.artista);
    const id = parseInt(req.params.id);
    if (!nombre || isNaN(artista) || isNaN(id)) return res.status(400).json("Ingrese datos validos");
    conn.execute('UPDATE albumes SET albumes.nombre = ?, albumes.artista = ? WHERE albumes.id = ?', [nombre, artista, id], (err, _) => {
        if (err) {
            console.log("Error: ", err);
            return res.sendStatus(500);
        }
        else {
            return res.json("Album actualizado");
        }
    })
};

const deleteAlbum = (req, res) => {
    // Completar con la consulta que elimina un album
    // Recordar que los parámetros de una consulta DELETE se encuentran en req.params
    const id = parseInt(req.params.id);
    if (isNaN(id)) return res.status(400).json("Ingrese un id valido");
    conn.execute('DELETE FROM albumes WHERE albumes.id = ?', [id], (err, rows) => {
        if (err) {
            console.log("Error: ", err);
            return res.sendStatus(500);
        }
        else {
            return res.json("Album borrado");
        }
    })
};

const getCancionesByAlbum = (req, res) => {
    // Completar con la consulta que devuelve las canciones de un album
    // Recordar que los parámetros de una consulta GET se encuentran en req.params
    // Deberían devolver los datos de la misma forma que getCanciones
    const id = parseInt(req.params.id);
    if (isNaN(id)) return res.status(400).json("Ingrese un id valido");
    conn.execute('SELECT canciones.id, canciones.nombre, artistas.nombre AS nombre_artista, albumes.nombre AS nombre_album, canciones.duracion, canciones.reproducciones FROM canciones INNER JOIN albumes ON albumes.id = canciones.album INNER JOIN artistas ON artistas.id = albumes.artista WHERE albumes.id = ?', [id], (err, rows) => {
        if (err) {
            console.log("Error: ", err);
            return res.sendStatus(500);
        }
        else {
            return res.json(rows);
        }
    })
};

module.exports = {
    getAlbumes,
    getAlbum,
    createAlbum,
    updateAlbum,
    deleteAlbum,
    getCancionesByAlbum,
};