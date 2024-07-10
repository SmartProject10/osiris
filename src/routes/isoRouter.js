const isoController = require('../controllers/isoController');
const router = express.Router();

router.post('/iso', isoController.createIso);
router.get('/iso/:id', isoController.getIsoById);
router.get('/iso', isoController.getAllIsos);
router.put('/iso/:id', isoController.updateIso);
router.delete('/iso/:id', isoController.deleteIso);

module.exports = router;
