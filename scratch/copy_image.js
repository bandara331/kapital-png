const fs = require('fs');

const src = 'C:\\Users\\Sasmitha Thejan\\.gemini\\antigravity-ide\\brain\\f2da4e53-2f8c-459f-bca8-3e057fc6cb36\\media__1790753020445.png';
const dest = 'public\\dashboard-illustration.png';

try {
    fs.copyFileSync(src, dest);
    console.log('Successfully copied the image!');
} catch (err) {
    console.error('Error copying file:', err);
}
