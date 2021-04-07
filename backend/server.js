// Import Express to create Node.js server
const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const fs = require('fs');

// Import CORS middleware to allow CrossOrigin Requests to this server
const cors = require('cors');

// Add CORS Middleware to express instance.
app.use(cors());

// Parse incoming request bodies in a middleware before your handlers, available under the req.body property.
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

// Import multer to handle file uploads
const multer = require('multer');


// Create Upload Instace to use in route middlware
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
})
const upload = multer({ storage: storage });

app.get('/', (req, res) => {
  res.send('We are live');
});

// Route Controller for uploading a single file
app.post('/single', upload.single('singleImage'), (req, res) => {
  try {
    res.status(200).send({ message: 'File uploaded successfully.' });
  } catch (err) {
    res.status(400).send({ message: 'Error uploading file.' });
  }
});

// Route Controller for uploading multiple files
app.post('/multiple', upload.array('multipleImages'), (req, res) => {
  try {
    res.status(200).send({ message: 'Files uploaded successfully.' });
  } catch (err) {
    res.status(400).send({ message: 'Error uploading file.' });
  }
});

const img = (data) => {
  const reg = /^data:image\/([\w+]+);base64,([\s\S]+)/;
  const match = data.match(reg);
  const baseType = {
    jpeg: 'jpg'
  };

  baseType['svg+xml'] = 'svg'

  if (!match) {
    throw new Error('image base64 data error');
  }

  const extname = baseType[match[1]] ? baseType[match[1]] : match[1];

  return {
    extname: '.' + extname,
    base64: match[2]
  };
}

const imgSync = async (data, destpath, name) => {
  const result = img(data);
  const filepath = path.join(destpath, name + result.extname);

  await fs.writeFileSync(filepath, result.base64, { encoding: 'base64' });
  return filepath;
};

// Route Controller for uploading base64 image file
app.post('/base64', async (req, res) => {
  try {
    const { base64Image, fileName } = req.body;
    await imgSync(base64Image, './uploads', fileName)

    res.status(200).send({ message: 'Files uploaded successfully.' });
  } catch (err) {
    res.status(400).send({ message: 'Error uploading file.' });
  }
});

app.listen(3001, () => {
  console.log('Listing on port 3001');
});