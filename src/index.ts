import express from "express";
import cors from 'cors';
const app = express();
app.use(cors());

import bodyParser from 'body-parser';
const jsonParser = bodyParser.json();

import * as db from './db-connection';

app.post('/alumno', jsonParser, async (req, res) => {

    console.log(`Petición recibida al endpoint POST /alumno. 
        Body: ${JSON.stringify(req.body)}`);

    try {

        let new_student = {
            id: req.body.id,
            name: req.body.name,
            surname: req.body.surname,
            age: req.body.age,
            grade: req.body.grade
        }

        console.log(`Producto añadido: ${JSON.stringify(new_student)}`);

        let query = `INSERT INTO alumnos (id, name, surname, age, grade)
        VALUES ('${new_student.id}', '${new_student.name}', '${new_student.surname}', ${new_student.age}, '${new_student.grade}');`;
        let db_response = await db.query(query);


        if (db_response.rowCount == 1) {
            console.log(`Alumno guardaro`);
            res.json(`El alumno ha sido creado correctamente.`);
        } else {
            console.log(`Alumno NO creado`);
            res.json(`El alumno NO ha sido creado.`);
        }

    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});



app.get('/personajes', async (req, res) => {
    console.log(`Petición recibida al endpoint GET /personajes.`);

    try {
        let query = `SELECT * FROM personajes ORDER BY id`;
        let db_response = await db.query(query);

        if (db_response.rows.length > 0) {
            console.log(`personajes encontrados: ${db_response.rows.length}`);
            res.json(db_response.rows);
        } else {
            console.log(`personajes no encontrados.`)
            res.json(`personajes no encontrados.`);
        }

    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }

});



app.post('/personajes/pass', jsonParser, async (req, res) => {

    console.log(`Petición recibida al endpoint POST /personajes/pass. 
        Body: ${JSON.stringify(req.body)}`);
        let id = req.body.id;

    try {

        let query = `UPDATE personajes SET pass = pass + 1 WHERE id = '${id}';`;
        let db_response = await db.query(query);

        console.log(db_response);

        if (db_response.rowCount == 1) {
            res.json(`Pass añadido.`);
        } else {
            res.json(`Pass NO añadido.`);
        }

    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});

app.post('/personajes/smash', jsonParser, async (req, res) => {

    console.log(`Petición recibida al endpoint POST /personajes/smash. 
        Body: ${JSON.stringify(req.body)}`);
        let id = req.body.id;

    try {

        let query = `UPDATE personajes SET smash = smash + 1 WHERE id = '${id}';`;
        let db_response = await db.query(query);

        console.log(db_response);

        if (db_response.rowCount == 1) {
            res.json(`smash añadido.`);
        } else {
            res.json(`smash NO añadido.`);
        }

    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});
























/*
app.get('/user/:email', async (req, res) => {
    console.log(`Petición recibida al endpoint GET /user/:email.`);
    console.log(`Parámetro recibido por URL: ${req.params.email}`);

    try {
        let query = `SELECT * FROM users WHERE id='${req.params.email}'`;
        let db_response = await db.query(query);

        if (db_response.rows.length > 0) {
            console.log(`Usuario encontrado: ${db_response.rows[0].id}`);
            res.json(db_response.rows[0]);
        } else {
            console.log(`Usuario no encontrado.`)
            res.json(`User not found`);
        }

    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }

});

app.post('/user', jsonParser, async (req, res) => {

    console.log(`Petición recibida al endpoint POST /user. 
        Body: ${JSON.stringify(req.body)}`);

    try {

        let query = `INSERT INTO users 
        VALUES ('${req.body.id}', '${req.body.nombre}');`;
        let db_response = await db.query(query);

        console.log(db_response);

        if (db_response.rowCount == 1) {
            res.json(`El registro ha sido creado correctamente.`);
        } else {
            res.json(`El registro NO ha sido creado.`);
        }

    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});

/*app.post('/perfil', jsonParser, async (req, res) => {
    console.log(`Petición recibida al endpoint POST /perfil. 
        Body:${JSON.stringify(req.body)}`);
    try {
        
        let query = `INSERT INTO alumnos (name, email, img) 
        VALUES ('${req.body.name}', '${req.body.email}', '${req.body.img}');`;
        console.log(query);
        let db_response = await db.query(query);
        console.log(db_response);
        
        res.json(`El registro del señor/a ${req.body.nombre} ${req.body.apellidos}, con domicilio ${req.body.direccion},
             y color de pelo ${req.body.color_pelo} ha sido creado.`);

    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});

app.get('/suma/:valor1/:valor2', (req, res) => {
    let resultado: number = 0;
    resultado = Number(req.params.valor1) + Number(req.params.valor2);
    console.log("resultado: " + resultado);
    res.send(String(resultado));
});*/

/*app.post('/futbolistas', jsonParser, async (req, res) => {
    console.log(`Petición recibida al endpoint POST /futbolistas. 
        Body:${JSON.stringify(req.body)}`);
    try {
        let query = `INSERT INTO alumnos (name, email, img) 
        VALUES ('${req.body.name}', '${req.body.email}', '${req.body.img}');`;
        console.log(query);
        let db_response = await db.query(query);
        console.log(db_response);
        res.json("Registro guardado correctamente.");
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});*/


/*
app.get('/products', async (req, res) => {
    console.log(`Petición recibida al endpoint GET /products.`);

    try {
        let query = `SELECT * FROM products`;
        let db_response = await db.query(query);

        if (db_response.rows.length > 0) {
            console.log(`Productos encontrados: ${db_response.rows.length}`);
            res.json(db_response.rows);
        } else {
            console.log(`Productos no encontrados.`)
            res.json(`Productos no encontrados.`);
        }

    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }

});

app.get('/payments/unpaid', async (req, res) => {
    console.log(`Petición recibida al endpoint GET /payments/unpaid.`);

    try {
        
        let query = `SELECT * FROM payments WHERE is_paid = false ORDER BY date_bought DESC`;
        let db_response = await db.query(query);

        if (db_response.rows.length > 0) {
            console.log(`Numero de pagos encontrados: ${db_response.rows.length}`);
            res.json(db_response.rows);
        } else {
            console.log(`Pagos no encontrados.`)
            res.json(`Pagos no encontrados.`);
        }

    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }

});

app.get('/payments/paid', async (req, res) => {
    console.log(`Petición recibida al endpoint GET /payments/paid.`);

    try {
        let query = `SELECT * FROM payments WHERE is_paid = false ORDER BY date_pay DESC`;
        let db_response = await db.query(query);

        if (db_response.rows.length > 0) {
            console.log(`Numero de pagos encontrados: ${db_response.rows.length}`);
            res.json(db_response.rows);
        } else {
            console.log(`Pagos no encontrados.`)
            res.json(`Pagos no encontrados.`);
        }

    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }

});

app.post('/products/buy', jsonParser, async (req, res) => {

    console.log(`Petición recibida al endpoint POST /products/buy. 
        Body: ${JSON.stringify(req.body)}`);

    try {

        let new_product = {
            id_user: req.body.id_user,
            id_product: req.body.id_product,
            is_paid: false,
            date_bought: new Date().toISOString().split('T')[0]
        }

        console.log(`Producto añadido: ${JSON.stringify(new_product)}`);

        let query = `INSERT INTO payments (id_user, id_product, is_paid, date_bought)
        VALUES ('${new_product.id_user}', ${new_product.id_product}, ${new_product.is_paid}, '${new_product.date_bought}');`;
        let db_response = await db.query(query);


        if (db_response.rowCount == 1) {
            console.log(`Producto creado`);
            res.json(`El registro ha sido creado correctamente.`);
        } else {
            console.log(`Producto NO creado`);
            res.json(`El registro NO ha sido creado.`);
        }

    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});


app.post('/products/pay', jsonParser, async (req, res) => {

    console.log(`Petición recibida al endpoint POST /products/pay. 
        Body: ${JSON.stringify(req.body)}`);

    try {
    
        let update_product = {
            id_user: req.body.id_user,
            id: req.body.id,
            is_paid: true,
            date_paid: new Date().toISOString().split('T')[0]
        }

        let query = `UPDATE payments SET is_paid = ${update_product.is_paid}, date_paid = '${update_product.date_paid}' 
        WHERE id = ${update_product.id} AND id_user = '${update_product.id_user}'`;

        let db_response = await db.query(query);

        if (db_response.rowCount == 1) {
            console.log(`Producto actualizado`);
            res.json(`El registro ha sido actualizado correctamente.`);
        } else {
            console.log(`Producto NO actualizado`);
            res.json(`El registro NO ha sido actualizado.`);
        }

    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});*/

const port = process.env.PORT || 3000;

app.listen(port, () =>
    console.log(`App listening on PORT ${port}.

    ENDPOINTS:
    
     - GET /user/:email
     - POST /user
     - GET /products
     `));

