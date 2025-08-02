import mongoose from 'mongoose';

const noteSchema = new mongoose.Schema({
  class: { type: String, required: true },
  subject: { type: String, required: true },
  topic: { type: String, required: true },
  date: { type: String, required: true },
  teacherName: { type: String, required: true },
    description: String,
}, {
  timestamps: true,
});

export default mongoose.models.Note || mongoose.model('Note', noteSchema);
