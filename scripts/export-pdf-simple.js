import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const OUTPUT_DIR = path.join(__dirname, '../dist');

// Find the best available HTML file
function findHTMLFile() {
  const candidates = [
    'presentation_ES2015.html',
    'presentation_ES2020.html', 
    'presentation_ES2022.html',
    'index.html'
  ];
  
  for (const candidate of candidates) {
    const filePath = path.join(OUTPUT_DIR, candidate);
    if (fs.existsSync(filePath)) {
      return filePath;
    }
  }
  return null;
}

async function exportToPDF() {
  console.log('🎬 Starting simple PDF export...');
  
  let browser;
  try {
    const HTML_FILE = findHTMLFile();
    
    if (!HTML_FILE) {
      console.error('❌ No HTML presentation file found in dist directory');
      console.log('Expected files: presentation_ES2015.html, presentation_ES2020.html, presentation_ES2022.html, or index.html');
      process.exit(1);
    }

    console.log('✅ Found HTML file:', path.basename(HTML_FILE));
    console.log('🚀 Launching browser...');
    
    browser = await puppeteer.launch({
      headless: true,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-gpu'
      ],
    });

    const page = await browser.newPage();
    await page.setViewport({ width: 1920, height: 1080 });

    console.log('📄 Loading presentation...');
    const htmlPath = `file://${HTML_FILE}`;
    
    await page.goto(htmlPath, { 
      waitUntil: 'domcontentloaded',
      timeout: 30000 
    });

    console.log('⏳ Waiting for content to load...');
    await wait(5000);

    console.log('📄 Generating PDF directly from page...');
    const pdfPath = path.join(OUTPUT_DIR, 'BMSTU_Presentation_Simple.pdf');
    
    await page.pdf({
      path: pdfPath,
      format: 'A4',
      landscape: true,
      printBackground: true,
      margin: {
        top: '10mm',
        bottom: '10mm',
        left: '10mm',
        right: '10mm'
      }
    });

    console.log('🎉 PDF exported successfully!');
    console.log('📁 Location:', pdfPath);

  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}

exportToPDF(); 