const conn = require("../db");

const getArtistas = (_, res) => {
    // Completar con la consulta que devuelve todos los artistas
    // Recordar que los parámetros de una consulta GET se encuentran en req.params
    // Deberían devolver los datos de la siguiente forma:
    /*
        [
            {
                "id": "Id del artista",
                "nombre": "Nombre del artista"
            },
            {
                "id": "Id del artista",
                "nombre": "Nombre del artista"
            },
            ...
        ]
    */
    conn.execute('SELECT artistas.id, artistas.nombre FROM artistas', (err, rows) => {
        if (err) {
            // La unica posibilidad de error en esta query es uno interno, ejemplo, no se conecto a la base de datos
            console.log("Error: ", err);
            return res.sendStatus(500);
        }
        else {
            return res.json(rows);
        }
    });
};

const getArtista = (req, res) => {
    // Completar con la consulta que devuelve un artista
    // Recordar que los parámetros de una consulta GET se encuentran en req.params
    // Deberían devolver los datos de la siguiente forma:
    /*
        {
            "id": "Id del artista",
            "nombre": "Nombre del artista"
        }
    */
    // parseInt devuelve NaN si no se puede convertir el string a int
    const id = parseInt(req.params.id);
    if (isNaN(id)) return res.status(400).json("El id no es un número entero");
    conn.execute('SELECT artistas.id, artistas.nombre FROM artistas WHERE artistas.id = ?', [id], (err, rows) => {
        if (err) {
            // La unica posibilidad de error en esta query es uno interno, ejemplo, no se conecto a la base de datos
            console.log("Error: ", err);
            return res.sendStatus(500);
        }
        // Si rows es un array vacio, significa que no hay un artista con el id especificado
        if (rows.length === 0) return res.status(404).json("No se encontró al artista");
        else return res.json(rows);
    });
};

const createArtista = (req, res) => {
    // Completar con la consulta que crea un artista
    // Recordar que los parámetros de una consulta POST se encuentran en req.body
    // Deberían recibir los datos de la siguiente forma:
    /*
        {
            "nombre": "Nombre del artista",
        }
    */
    const nombre = req.body.nombre;
    // Si nombre es un string vacio, se devulve una respuesta de status 400 (Bad Request)
    if (!nombre) return res.status(400).json("Ingrese un nombre válido");
    conn.execute('INSERT INTO artistas(nombre) VALUES(?)', [nombre], (err, rows) => {
        if (err) {
            // La unica posibilidad de error en esta query es uno interno, ejemplo, no se conecto a la base de datos.
            // No puede tirar un error "Duplicate Entry", porque el nombre no es el campo primario
            console.log("Error: ", err);
            return res.sendStatus(500);
        }
        else {
            return res.json("Artista creado");
        }
    })
};

const updateArtista = (req, res) => {
    // Completar con la consulta que actualiza un artista
    // Recordar que en este caso tienen parámetros en req.params (el id) y en req.body (los demás datos)
    // Deberían recibir los datos de la siguiente forma:
    /*
        {
            "nombre": "Nombre del artista"
        }
    */
    const nombre = req.body.nombre;
    // parseInt devuelve NaN si el string no se puede convertir a int
    const id = parseInt(req.params.id);
    if (isNaN(id)) return res.status(400).json("El id no es un numero entero");
    // Si nombre es un string vacio, se devulve una respuesta de status 400 (Bad Request)
    if (!nombre) return res.status(400).json("Ingrese un nombre válido");
    conn.execute('UPDATE artistas SET artistas.nombre = ? WHERE artistas.id = ?', [nombre, id], (err, rows) => {
        if (err) {
            // La unica posibilidad de error en esta query es uno interno, ejemplo, no se conecto a la base de datos
            console.log("Error: ", err);
            return res.sendStatus(500);
        }
        else {
            return res.json("Nombre cambiado");
        }
    })
};

const deleteArtista = (req, res) => {
    // Completar con la consulta que elimina un artista
    // Recordar que los parámetros de una consulta DELETE se encuentran en req.params
    const id = parseInt(req.params.id);
    if (isNaN(id)) return res.status(400).json("El id no es un numero entero");
    conn.execute('DELETE FROM artistas WHERE artistas.id = ?', [id], (err, rows) => {
        if (err) {
            console.log("Error: ", err);
            return res.sendStatus(500);
        }
        else {
            return res.json("Artista borrado");
        }
    })
};

const getAlbumesByArtista = (req, res) => {
    // Completar con la consulta que devuelve las canciones de un artista 
    // Recordar que los parámetros de una consulta GET se encuentran en req.params
    // Deberían devolver los datos de la misma forma que getAlbumes
    const id = parseInt(req.params.id);
    if (isNaN(id)) return res.status(400).json("El id no es un numero entero");
    conn.execute('SELECT albumes.id, albumes.nombre, artistas.nombre AS nombre_artista FROM albumes INNER JOIN artistas ON albumes.artista = artistas.id WHERE albumes.artista = ?', [id], (err, rows) => {
        if (err) {
            console.log("Error: ", err);
            return res.sendStatus(500);
        }
        else {
            return res.json(rows);
        }
    })
};

const getCanionesByArtista = (req, res) => {
    // Completar con la consulta que devuelve las canciones de un artista
    // (tener en cuenta que las canciones están asociadas a un álbum, y los álbumes a un artista)
    // Recordar que los parámetros de una consulta GET se encuentran en req.params
    // Deberían devolver los datos de la misma forma que getCanciones
    const id = parseInt(req.params.id);
    if (isNaN(id)) return res.status(400).json("El id no es un numero entero");
    conn.execute('SELECT canciones.id, canciones.nombre, artistas.nombre AS nombre_artista, albumes.nombre AS nombre_album, canciones.duracion, canciones.reproducciones FROM canciones INNER JOIN albumes ON canciones.album = albumes.id INNER JOIN artistas ON albumes.artista = artistas.id WHERE artistas.id = ?', [id], (err, rows) => {
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
    getArtistas,
    getArtista,
    createArtista,
    updateArtista,
    deleteArtista,
    getAlbumesByArtista,
    getCanionesByArtista,
};