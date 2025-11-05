const UploadCV = (req,res) => {
    try 
    {
        if (!req.file) {
            return res.status(400).json({error: 'No file uploaded'});
        }

        res.status(200).json({
            message : 'File uploaded successfully',
            file : req.file.name,
            path : req.file.path
        })

    }
    catch (err) {
        res.status(405).json({error: err.message});
    }
}

module.exports = {UploadCV};