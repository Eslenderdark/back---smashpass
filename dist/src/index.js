"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var app = express_1.default();
app.use(cors_1.default());
var body_parser_1 = __importDefault(require("body-parser"));
var jsonParser = body_parser_1.default.json();
var db = __importStar(require("./db-connection"));
app.post('/alumno', jsonParser, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var new_student, query, db_response, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log("Petici\u00F3n recibida al endpoint POST /alumno. \n        Body: " + JSON.stringify(req.body));
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                new_student = {
                    id: req.body.id,
                    name: req.body.name,
                    surname: req.body.surname,
                    age: req.body.age,
                    grade: req.body.grade
                };
                console.log("Producto a\u00F1adido: " + JSON.stringify(new_student));
                query = "INSERT INTO alumnos (id, name, surname, age, grade)\n        VALUES ('" + new_student.id + "', '" + new_student.name + "', '" + new_student.surname + "', " + new_student.age + ", '" + new_student.grade + "');";
                return [4 /*yield*/, db.query(query)];
            case 2:
                db_response = _a.sent();
                if (db_response.rowCount == 1) {
                    console.log("Alumno guardaro");
                    res.json("El alumno ha sido creado correctamente.");
                }
                else {
                    console.log("Alumno NO creado");
                    res.json("El alumno NO ha sido creado.");
                }
                return [3 /*break*/, 4];
            case 3:
                err_1 = _a.sent();
                console.error(err_1);
                res.status(500).send('Internal Server Error');
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
app.get('/personajes', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var query, db_response, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log("Petici\u00F3n recibida al endpoint GET /personajes.");
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                query = "SELECT * FROM personajes ORDER BY id";
                return [4 /*yield*/, db.query(query)];
            case 2:
                db_response = _a.sent();
                if (db_response.rows.length > 0) {
                    console.log("personajes encontrados: " + db_response.rows.length);
                    res.json(db_response.rows);
                }
                else {
                    console.log("personajes no encontrados.");
                    res.json("personajes no encontrados.");
                }
                return [3 /*break*/, 4];
            case 3:
                err_2 = _a.sent();
                console.error(err_2);
                res.status(500).send('Internal Server Error');
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
app.post('/personajes/pass', jsonParser, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, query, db_response, err_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log("Petici\u00F3n recibida al endpoint POST /personajes/pass. \n        Body: " + JSON.stringify(req.body));
                id = req.body.id;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                query = "UPDATE personajes SET pass = pass + 1 WHERE id = '" + id + "';";
                return [4 /*yield*/, db.query(query)];
            case 2:
                db_response = _a.sent();
                console.log(db_response);
                if (db_response.rowCount == 1) {
                    res.json("Pass a\u00F1adido.");
                }
                else {
                    res.json("Pass NO a\u00F1adido.");
                }
                return [3 /*break*/, 4];
            case 3:
                err_3 = _a.sent();
                console.error(err_3);
                res.status(500).send('Internal Server Error');
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
app.post('/personajes/smash', jsonParser, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, query, db_response, err_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log("Petici\u00F3n recibida al endpoint POST /personajes/smash. \n        Body: " + JSON.stringify(req.body));
                id = req.body.id;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                query = "UPDATE personajes SET smash = smash + 1 WHERE id = '" + id + "';";
                return [4 /*yield*/, db.query(query)];
            case 2:
                db_response = _a.sent();
                console.log(db_response);
                if (db_response.rowCount == 1) {
                    res.json("smash a\u00F1adido.");
                }
                else {
                    res.json("smash NO a\u00F1adido.");
                }
                return [3 /*break*/, 4];
            case 3:
                err_4 = _a.sent();
                console.error(err_4);
                res.status(500).send('Internal Server Error');
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
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
var port = process.env.PORT || 3000;
app.listen(port, function () {
    return console.log("App listening on PORT " + port + ".\n\n    ENDPOINTS:\n    \n     - GET /user/:email\n     - POST /user\n     - GET /products\n     ");
});
