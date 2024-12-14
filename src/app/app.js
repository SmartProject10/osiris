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
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000'],
  credentials: true
}));
app.use(cookieParser());

// Rutas
const rutas = [
  require('../isoandiso/tables/activity/activityRoutes'),
  require('../isoandiso/tables/activitycompletiondate/activityCompletionDateRoutes'),
  require('../isoandiso/tables/specificobjective/specificObjectiveRoutes'),
  require('../isoandiso/tables/generalobjective/generalObjectiveRoutes'),
  require('../isoandiso/tables/subcompany/subcompanyRoutes'),
  require('../isoandiso/tables/worker/workerRoutes'),
  require('../isoandiso/tables/subcompanyworker/subcompanyWorkerRoutes'),
  require('../isoandiso/tables/user/userRoutes'),
  require('../webiso/tables/companyacquisition/companyAcquisitionRoutes'),
  require('../webiso/tables/companyarea/companyAreaRoutes'),
  require('../webiso/tables/company/companyRoutes'),
  require('../webiso/tables/iso/isoRoutes'),
  require('../webiso/tables/companycountry/companyCountryRoutes'),
  require('../webiso/tables/rol/rolRoutes'),
  require('../webiso/tables/companysite/companySiteRoutes'),
  require('../webiso/tables/acquisitiontype/acquisitionTypeRoutes'),
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
