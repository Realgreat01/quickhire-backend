const JobSchema = require('../../models/JobSchema.js');
const errorHandler = require('../../errors');
const { Types } = require('mongoose');

const getAllJobs = async (req, res) => {
  try {
    const allJobs = await JobSchema.find()
      .populate(
        'posted_by',
        'company_name company_location company_logo company_id'
      )
      .populate(
        'applicants',
        'username email basicDetails.firstname basicDetails.lastname basicDetails.phone_number'
      );
    res.status(200).json(allJobs);
  } catch (error) {
    res.status(500).json(errorHandler(error));
  }
};

const getSingleJob = async (req, res) => {
  try {
    const job_id = req.params.job_id;
    const requestedJob = await JobSchema.findById(job_id);
    if (requestedJob) return res.status(200).json(requestedJob);
  } catch (error) {
    return res.status(404).json(errorHandler(error));
  }
};

const deleteSingleJob = async (req, res) => {
  try {
    const job_id = req.params.job_id;
    const requestedJob = await JobSchema.findByIdAndDelete(job_id);
    if (requestedJob) return res.status(200).json(requestedJob);
  } catch (error) {
    return res.status(404).json(errorHandler(error));
  }
};

const applyForJob = async (req, res) => {
  try {
    const userId = req.user.id;
    const job_id = req.params.job_id;
    const job = await JobSchema.findById(job_id);
    if (!job) throw new Error('Job not found');

    const isApplicant = job.applicants.some(applicantId =>
      applicantId.equals(new Types.ObjectId(userId))
    );
    if (isApplicant) throw new Error('You have already applied for this job');

    const requestedJob = await JobSchema.findByIdAndUpdate(
      job_id,
      { $push: { applicants: req.user.id } },
      { new: true }
    );
    if (requestedJob) return res.status(200).json(requestedJob);
    else return res.json('job not found');
  } catch (error) {
    return res.status(404).json(errorHandler(error));
  }
};

module.exports = { getAllJobs, getSingleJob, deleteSingleJob, applyForJob };
