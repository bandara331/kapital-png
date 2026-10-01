const fs = require('fs');
const path = require('path');

const targetDir = path.join(__dirname, 'public', 'images', 'sectors');

if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
}

const images = {
    'png_sme_1790649336005.png': 'sme.png',
    'png_retail_1790649357356.png': 'retail.png',
    'png_trade_1790649377568.png': 'trade.png',
    'png_hospitality_1790649399116.png': 'hospitality.png',
    'png_ngo_1790649423052.png': 'ngo.png',
    'png_startup_1790649444569.png': 'startup.png'
};

const sourceDir = 'C:\\Users\\Sasmitha Thejan\\.gemini\\antigravity-ide\\brain\\cbf88613-4270-4458-9a56-27996a283a6b';

for (const [srcFile, destFile] of Object.entries(images)) {
    const srcPath = path.join(sourceDir, srcFile);
    const destPath = path.join(targetDir, destFile);
    
    try {
        if (fs.existsSync(srcPath)) {
            fs.copyFileSync(srcPath, destPath);
            console.log(`Successfully copied ${destFile}`);
        } else {
            console.error(`Source file not found: ${srcPath}`);
        }
    } catch (err) {
        console.error(`Failed to copy ${destFile}:`, err);
    }
}
