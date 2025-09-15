import multer from 'multer';
import path from 'path';
import fs from 'fs';

// Garante que a pasta de destino exista
const pastaDestino = path.resolve(__dirname, '..', '..', 'uploads', 'oficinas');
if (!fs.existsSync(pastaDestino)) {
  fs.mkdirSync(pastaDestino, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, pastaDestino);
  },
  filename: (req, file, cb) => {
    const timestamp = Date.now();
    const ext = path.extname(file.originalname);
    const fileName = `${file.fieldname}-${timestamp}${ext}`;
    cb(null, fileName);
  }
});

export const upload = multer({ storage });
