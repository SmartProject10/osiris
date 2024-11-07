require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { connectToMongoose } = require('./db');
const cookieParser = require('cookie-parser');
const app = express();
const port = process.env.PORT || 3000;

// Conectar a la base de datos
connectToMongoose();

// Middleware
app.use(express.json());
app.use(cors());
app.use(cookieParser());

// Rutas
const rutas = [
  require('../IsoAndIso/Tables/actividad/actividadRoutes'),
  require('../IsoAndIso/Tables/fechacumplimientoactividad/fechaCumplimientoActividadRoutes'),
  require('../IsoAndIso/Tables/objetivoespecifico/objetivoEspecificoRoutes'),
  require('../IsoAndIso/Tables/objetivogeneral/objetivoGeneralRoutes'),
  require('../IsoAndIso/Tables/subempresa/subempresaRoutes'),
  require('../IsoAndIso/Tables/trabajador/trabajadorRoutes'),
  require('../IsoAndIso/Tables/trabajadorsubempresa/trabajadorSubempresaRoutes'),
  require('../IsoAndIso/Tables/usuario/usuarioRoutes'),
  require('../WebIso/Tables/adquisicionempresa/adquisicionEmpresaRoutes'),
  require('../WebIso/Tables/areaempresa/areaEmpresaRoutes'),
  require('../WebIso/Tables/Empresa/empresaRoutes'),
  require('../WebIso/Tables/iso/isoRoutes'),
  require('../WebIso/Tables/nacionalidad/nacionalidadRoutes'),
  require('../WebIso/Tables/pais/paisRoutes'),
  require('../WebIso/Tables/rol/rolRoutes'),
  require('../WebIso/Tables/sede/sedeRoutes'),
  require('../WebIso/Tables/tipodeadquisicion/tipoDeAdquisicionRoutes'),
];
rutas.forEach(route => app.use(route));

// Error handler
app.use((err, req, res, next) => {
  console.error('Error:', err.stack);
  res.status(err.status || 500).json({
    message: err.message || 'Internal Server Error',
  });
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

module.exports = app;
