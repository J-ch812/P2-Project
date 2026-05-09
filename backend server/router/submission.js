import router from "./user.router.js";
import { upload } from "./upload.js";
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


export default router;
