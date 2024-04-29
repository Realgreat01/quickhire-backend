const router = require('express').Router();
const {
  getAllJobs,
  getSingleJob,
  deleteSingleJob,
  applyForJob,
} = require('../controller/job/job-controller.js');

router.get('/', getAllJobs);
router.post('/apply/:job_id', applyForJob);
router.get('/:job_id', getSingleJob);
router.delete('/:job_id', deleteSingleJob);

module.exports = router;
