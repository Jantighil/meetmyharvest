const express = require('express');
const router = express.Router({ mergeParams: true});
const helpers = require("../controllers/imgsUpload/helpers");

router.post('/profile', helpers.upload.single('avatar'), async function (req, res, next) {
    const img = req.file;
    console.log(img);
    const result = await helpers.uploadImage(img.path);
    return res.json({message: "image uploaded successfully!", data: result})
});

// app.delete('/profile/', (req, res, next) => {
//     const item = 'imgs/vgfy74puunvke8f0fx1k'
//     // const { public_id } = req.params.pub;
//     helpers.deleteImage(item);
//     // console.log(public_id);
//     return res.json({ message: `The image has deleted`})
// })


router.delete('/profile', async (req, res) => {
    const publicId = 'imgs/vgfy74puunvke8f0fx1k'; // Replace with dynamic public ID
    const result = await helpers.deleteImage(publicId);
    return res.json({ message: `The image has been deleted`, result });
});

  
// app.post('/photos/upload', helpers.upload.array('photos', 12), function (req, res, next) {
//   // req.files is array of `photos` files
//   // req.body will contain the text fields, if there were any
// })
module.exports = router;
