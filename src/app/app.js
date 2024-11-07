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
  require('../isoandiso/tables/actividad/actividadRoutes'),
  require('../isoandiso/tables/fechacumplimientoactividad/fechaCumplimientoActividadRoutes'),
  require('../isoandiso/tables/objetivoespecifico/objetivoEspecificoRoutes'),
  require('../isoandiso/tables/objetivogeneral/objetivoGeneralRoutes'),
  require('../isoandiso/tables/subempresa/subempresaRoutes'),
  require('../isoandiso/tables/trabajador/trabajadorRoutes'),
  require('../isoandiso/tables/trabajadorsubempresa/trabajadorSubempresaRoutes'),
  require('../isoandiso/tables/usuario/usuarioRoutes'),
  require('../webIso/tables/adquisicionempresa/adquisicionEmpresaRoutes'),
  require('../webIso/tables/areaempresa/areaEmpresaRoutes'),
  require('../webIso/tables/empresa/empresaRoutes'),
  require('../webIso/tables/iso/isoRoutes'),
  require('../webIso/tables/nacionalidad/nacionalidadRoutes'),
  require('../webIso/tables/pais/paisRoutes'),
  require('../webIso/tables/rol/rolRoutes'),
  require('../webIso/tables/sede/sedeRoutes'),
  require('../webIso/tables/tipodeadquisicion/tipoDeAdquisicionRoutes'),
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