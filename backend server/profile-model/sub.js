import mongoose from 'mongoose';

const submissionSchema = new mongoose.Schema({
    filename: String,
    path: String,
    uploadedAt: {
        type: Date,
        default: Date.now
    }
});

const Submission = mongoose.model('Submission', submissionSchema);

export default Submission;


<<<<<<< HEAD
=======

>>>>>>> 6b328b3b93ee8ac91d4ffb7d9bd1b22df8ca551f
