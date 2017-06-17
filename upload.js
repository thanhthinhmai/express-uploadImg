/**
 * sử dụng module multer để upload file
**/
const express = require('express');
const nunjucks = require('nunjucks');
const multer = require('multer');
// const up = require('./uploads')
const app = express();
//cấu hình nunjucks
nunjucks.configure('views', {
	autoescape: true,
	cache: false,
	express: app,
	watch: true
})

app.engine('html', nunjucks.render)
app.set('view engine', 'html')

app.use('/uploads',express.static('uploads'));

app.get('/', (req,res) => {
	res.render('upload.html')
})

const fs = require('fs')
  , gm = require('gm').subClass({imageMagick: true});


const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, './uploads')
	},
	filename: function (req, file, cb) {
		// cb(null, shortid.generate() + '-' + file.originalname)
		cb(null, file.originalname)
	}
})

function fileFilter(req, file, cb) { // hàm kiểm tra đuôi file
	if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg') { // nếu là đuôi png,jpg,jpeg
		cb(null, true)
	} else {
		cb(new Error(file.mimetype + ' is not accepted'))
	}
}

app.upload = multer({storage: storage , fileFilter:fileFilter})
app.post('/upload',app.upload.single('photo'), async function(req,res){
    // res.send('upload thanh cong')
	// console.log(res.file.path)
	  gm(req.file.path)
		.font("Helvetica.ttf", 150)
		.drawText(120, 350, "10000000")
		.write(req.file.path, function (err) {
		if (!err) console.log('done');
			res.render('upload.html',{
			photo :req.file.path
	})
		});

})

app.listen(8000, () => {
	console.log('Web app listens at port 8000')
})