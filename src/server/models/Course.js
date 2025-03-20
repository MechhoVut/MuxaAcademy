import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  duration: {
    type: String,
    required: true
  },
  fees: {
    type: String,
    required: true
  },
  intake: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  highlights: [{
    type: String,
    required: true
  }],
  career: [{
    type: String,
    required: true
  }],
  image: {
    type: String,
    default: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80'
  },
  students: {
    type: Number,
    default: 0
  },
  status: {
    type: String,
    enum: ['active', 'inactive'],
    default: 'active'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('Course', courseSchema);