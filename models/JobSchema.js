const { model, Schema } = require('mongoose');
const { isDate } = require('validator');
const JobSchema = new Schema({
  posted_by: {
    type: Schema.Types.ObjectId,
    ref: 'companies',
    required: [true, 'identity of hiring company is required'],
  },
  applicants: {
    type: [Schema.Types.ObjectId],
    ref: 'users',
  },
  job_title: {
    type: String,
    required: [true, 'job title is required'],
  },
  job_description: {
    type: String,
    required: [true, 'job description is required'],
  },
  job_type: {
    type: String,
    enum: ['Full-Time', 'Part-Time', 'Contract', 'Internship', 'Voluntary'],
    default: 'part-time',
    required: [true, 'job type is required'],
  },
  posted_on: {
    type: Date,
    immutable: true,
    default: () => Date.now(),
  },
  application_ends: {
    type: Date,
    required: [true, 'job application due date is required'],
    validate: [isDate, 'Enter a valid date'],
  },
  job_duration: {
    type: Date || String,
    required: [true, 'job duration is required'],
  },
  salary: {
    type: String || Number,
    required: [true, 'job salary is required'],
  },
  required_skills: {
    type: [Object],
    required: [true, 'job skills requirement must be added'],
  },
});

const JobModel = model('jobs', JobSchema);
module.exports = JobModel;
