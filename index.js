var JsBarcode = require('jsbarcode');
const express = require('express');
var cors = require('cors')

const ejs = require("ejs");
const path = require("path");
const exp = require("constants");
const http   = require('http');
const bwipjs = require('bwip-js');

const app = express();
app.use(cors())
const port = process.env.port || 3000;

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use(express.static("public"));

// EJS & dir
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "view"));


app.get('/', (req, res, next) => {
    // res.send('Barcode Generator App');
    res.render('index');
});

//      "2201062035339"
// 		"2201062036367"
// 		"2201062041583"
// 		"2201071100028");
// 		"2201062037326");
// 		"2201071100028");
// 		"2201071101377");
// 		"2112142329227");
// 		"2201061917438");
// 		"2112142327247");
// 		"2110231638533");
// 		"2110231730183");
// 		"2108101741537");
// 		"2111242140244");

app.post('/download', (req, res, next) => {
    const barcodeNum = req.body.barcode_number;
    // console.log('typeof : ', typeof barcodeNum);
    console.log('length: ', barcodeNum.length);
    if(barcodeNum.length == 13) {
        bwipjs.toBuffer({
            bcid:        'ean13',       // Barcode type
            text:        barcodeNum,    // Text to encode
            scale:       3,               // 3x scaling factor
            height:      10,              // Bar height, in millimeters
            includetext: true,            // Show human-readable text
            textxalign:  'center',        // Always good to set this
        })
        .then((png) => {
            // `png` is a Buffer as in the example above
            // console.log(png);
            res.writeHead(200, {
                'Content-Type': 'image/png',
                'Content-Length': png.length
            });
            res.end(png);
            // res.send(download(png, `${barcodeNum}.png`));
        })
        .catch((err) => {
            // `err` may be a string or Error object
            console.log(err);
            res.status(500);
            res.end("Not a valid number");
        });
    } else {
        res.end("Not a valid number");
    }
});

var download = function(uri, filename, callback){
    request.head(uri, function(err, res, body) {
      console.log('content-type:', res.headers['content-type']);
      console.log('content-length:', res.headers['content-length']);
  
      request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
    });
  };



app.listen(port, console.log('port Listining on port ', port));


  
// download('https://www.google.com/images/srpr/logo3w.png', 'google.png', function(){
//     console.log('done');
// });

