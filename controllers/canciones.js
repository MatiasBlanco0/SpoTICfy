const conn = require("../db");

const getCanciones = (_, res) => {
    // Completar con la consulta que devuelve todas las canciones
    // Recordar que los parámetros de una consulta GET se encuentran en req.params
    // Deberían devolver los datos de la siguiente forma:
    /*
        [
            {
                "id": "Id de la canción",
                "nombre": "Nombre de la canción",
                "nombre_artista": "Id del artista",
                "nombre_album": "Id del album",
                "duracion": "Duración de la canción",
                "reproducciones": "Reproducciones de la canción"
            },
            {
                "id": "Id de la canción",
                "nombre": "Nombre de la canción",
                "nombre_artista": "Id del artista",
                "nombre_album": "Id del album",
                "duracion": "Duración de la canción",
                "reproducciones": "Reproducciones de la canción"
            },
            ...
        ]
    */
    conn.execute('SELECT canciones.id, canciones.nombre, artistas.nombre AS nombre_artista, albumes.nombre AS nombre_album, canciones.duracion, canciones.reproducciones FROM canciones LEFT JOIN albumes ON albumes.id = canciones.album LEFT JOIN artistas ON artistas.id = albumes.artista', (err, rows) => {
        if (err) {
            console.log("Error: ", err);
            return res.sendStatus(500);
        }
        else {
            return res.json(rows);
        }
    })
};

const getCancion = (req, res) => {
    // Completar con la consulta que devuelve una canción
    // Recordar que los parámetros de una consulta GET se encuentran en req.params
    // Deberían devolver los datos de la siguiente forma:
    /*
        {
            "id": "Id de la canción",
            "nombre": "Nombre de la canción",
            "nombre_artista": "Id del artista",
            "nombre_album": "Id del album",
            "duracion": "Duración de la canción",
            "reproducciones": "Reproducciones de la canción"
        }
    */
    const id = parseInt(req.params.id);
    if (isNaN(id)) return res.status(400).json("Ingrese un id valido");
    conn.execute('SELECT canciones.id, canciones.nombre, artistas.nombre AS nombre_artista, albumes.nombre AS nombre_album, canciones.duracion, canciones.reproducciones FROM canciones LEFT JOIN albumes ON albumes.id = canciones.album LEFT JOIN artistas ON artistas.id = albumes.artista WHERE canciones.id = ?', [id], (err, rows) => {
        if (err) {
            console.log("Error: ", err);
            return res.sendStatus(500);
        }
        else {
            return res.json(rows);
        }
    })
};

const createCancion = (req, res) => {
    // Completar con la consulta que crea una canción
    // Recordar que los parámetros de una consulta POST se encuentran en req.body
    // Deberían recibir los datos de la siguiente forma:
    /*
        {
            "nombre": "Nombre de la canción",
            "artista": "Id del artista",
            "album": "Id del album",
            "duracion": "Duración de la canción",
        }
    */
    // (Reproducciones se inicializa en 0)
    const nombre = req.body.nombre;
    const album = parseInt(req.body.album);
    const duracion = parseInt(req.body.duracion);
    if (!nombre || isNaN(album) || isNaN(duracion)) return res.status(400).json("Ingrese datos validos");
    conn.execute('INSERT INTO canciones(nombre, album, duracion, reproducciones) VALUES(?, ?, ?, 0)', [nombre, album, duracion], (err, rows) => {
        if (err) {
            console.log("Error: ", err);
            return res.sendStatus(500);
        }
        else {
            return res.json("Cancion creada");
        }
    })
};

const updateCancion = (req, res) => {
    // Completar con la consulta que actualiza una canción
    // Recordar que los parámetros de una consulta PUT se encuentran en req.body
    // Deberían recibir los datos de la siguiente forma:
    /*
        {
            "nombre": "Nombre de la canción",
            "artista": "Id del artista",
            "album": "Id del album",
            "duracion": "Duración de la canción",
        }
    */
    // (Reproducciones no se puede modificar con esta consulta)
    const nombre = req.body.nombre;
    const album = parseInt(req.body.album);
    const duracion = parseInt(req.body.duracion);
    const id = parseInt(req.params.id);
    if (!nombre || isNaN(album) || isNaN(duracion) || isNaN(id)) return res.status(400).json("Ingrese datos validos");
    conn.execute('UPDATE canciones SET nombre = ?, album = ?, duracion = ? WHERE canciones.id = ?', [nombre, album, duracion, id], (err, rows) => {
        if (err) {
            console.log("Error: ", err);
            return res.sendStatus(500);
        }
        else {
            return res.json("Cancion actualizada");
        }
    })
};

const deleteCancion = (req, res) => {
    // Completar con la consulta que elimina una canción
    // Recordar que los parámetros de una consulta DELETE se encuentran en req.params
    const id = parseInt(req.params.id);
    if (isNaN(id)) return res.status(400).json("Ingrese un id valido");
    conn.execute('DELETE FROM canciones WHERE canciones.id = ?', [id], (err, rows) => {
        if (err) {
            console.log("Error: ", err);
            return res.sendStatus(500);
        }
        else {
            return res.json("Cancion borrado");
        }
    })
};

const reproducirCancion = (req, res) => {
    // Completar con la consulta que aumenta las reproducciones de una canción
    // En este caso es una consulta PUT, pero no recibe ningún parámetro en el body, solo en los params
    const id = parseInt(req.params.id);
    if (isNaN(id)) return res.status(400).json("Ingrese un id valido");
    conn.execute('UPDATE canciones SET reproducciones = reproducciones + 1 WHERE canciones.id = ?', [id], (err, rows) => {
        if (err) {
            console.log("Error: ", err);
            return res.sendStatus(500);
        }
        else {
            return res.json("Cancion reproducida");
        }
    })
};

module.exports = {
    getCanciones,
    getCancion,
    createCancion,
    updateCancion,
    deleteCancion,
    reproducirCancion,
};