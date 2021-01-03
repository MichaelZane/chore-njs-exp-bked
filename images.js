const express = require( 'express' )
const aws = require( 'aws-sdk')
const multerS3 = require( 'multer-s3' )
const multer = require( 'multer')
const path = require( 'path')

const router = express.Router

const s3 = new aws.s3({
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
    Bucket: process.env.BUCKET
})

//Single Upload

const imageUpload = multer({
    storage: multerS3({
        s3: s3,
        Bucket: process.env.BUCKET,
        acl: 'public-read',
        key: function(req, file, cb) {
            cb(null, path.basename( file.originalname, path.extname(file.originalname)) + '-' + Date.now() + path.extname( file.originalname ))
        }
    }),
    limits: { filesize: 2000000 },
    fileFilter: function(req, file, cb) {
        checkFileType( file, cb )
    }
}).single('image')

/**
 * Check File Type
 * @param file
 * @param cb
 * @return {*}
 */

function checkFileType( file, cb ){
    const filetypes = /jpeg|jpg|png|gif/
    const extname = filetypes.test( path.extname( file.originalname).toLowerCase())
    const mimetype = filetypes.test( file.mimetype )
    if( mimetype && extname ) {
        return cb( null, true )
    } else {
        cb( 'Error: Images Only!')
    }
}

/**
 * @route POST /api/profile/business-img-upload
 * @desc Upload post image
 * @access public
 */

router.post( '/img-upload', (req, res,) => {
    imageUpload(req, res, (error) => {
        console.log('requestOkokok', req.file)
        console.log('error', error)
        if(error) {
            console.log('errors', error)
            res.json({
                error: error
            })
        } else {
            if( req.file === undefined ) {
                console.log('Error: No FIle Selected.')
                res.json(
                    'Error: No File Selected.'
                )
            } else {
                const imageName = req.file.key
                const imageLocation = req.file.imageLocation
                res.json({
                    image: imageName,
                    location: imageLocation
                })
            }
        }
    })
})

// multiple file uploads