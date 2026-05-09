
router.route('/submission').post(upload.single('file'), async (req, res) => {
    try {

        const savedSubmission = await Submission.create({
            filename: req.file.filename,
            path: req.file.path
        });

        res.status(200).json({
            message: "Upload successful",
            file: req.file,
            dbRecord: savedSubmission
        });

    } catch (error) {
        res.status(500).json({
            message: 'upload failed',
            error
        });
    }
});



<<<<<<< HEAD
=======

>>>>>>> 6b328b3b93ee8ac91d4ffb7d9bd1b22df8ca551f
