import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Helper function to wait
const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// All the slides in your presentation
const SLIDES = [
  '/title',
  '/problem', 
  '/market',
  '/solution',
  '/testing',
  '/ycsb',
  '/market-analysis',
  '/market-analysis/trends-deep-dive',
  '/dataset-selection',
  '/dataset-selection/details',
  '/mongodb-preparation',
  '/postgresql-preparation', 
  '/cassandra-preparation',
  '/test-environment',
  '/technical-implementation',
  '/technical-optimization',
  '/ycsb-configuration',
  '/automation',
  '/visualization',
  '/main-results',
  '/main-results/radar',
  '/scalability-delays',
  '/publications',
  '/recommendations',
  '/conclusion',
  '/goodbye'
];

const OUTPUT_DIR = path.join(__dirname, '../dist');
const HTML_FILE = path.join(OUTPUT_DIR, 'presentation_ES2020.html');

async function exportToPDF() {
  try {
    console.log('🔍 Checking for HTML file...');
    console.log('Looking for:', HTML_FILE);
    
    // Check if the built HTML file exists
    if (!fs.existsSync(HTML_FILE)) {
      console.error('❌ Built HTML file not found. Please run "npm run build" first.');
      console.log('Expected location:', HTML_FILE);
      process.exit(1);
    }

    console.log('✅ HTML file found!');
    console.log('🚀 Starting PDF export...');
    
    const browser = await puppeteer.launch({
      headless: true,
      args: [
        '--no-sandbox', 
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-accelerated-2d-canvas',
        '--disable-gpu'
      ],
    });

    const page = await browser.newPage();
    
    // Set longer timeout for large files
    page.setDefaultNavigationTimeout(60000); // 60 seconds
    page.setDefaultTimeout(60000);
    
    // Set viewport for consistent rendering
    await page.setViewport({ width: 1920, height: 1080 });

    const screenshots = [];
    
    // Load the HTML file
    const htmlPath = `file://${HTML_FILE}`;
    console.log('📄 Loading presentation from:', htmlPath);
    console.log('⏳ This may take a while for large files...');
    
    await page.goto(htmlPath, { 
      waitUntil: 'domcontentloaded', // Less strict than networkidle0
      timeout: 60000 
    });
    
    // Wait for React to fully load
    console.log('⏳ Waiting for React app to initialize...');
    await wait(5000);
    
    console.log('✅ Loaded presentation HTML file');

    for (let i = 0; i < SLIDES.length; i++) {
      const slide = SLIDES[i];
      console.log(`📸 Capturing slide ${i + 1}/${SLIDES.length}: ${slide}`);
      
      try {
        // Use evaluate to change hash instead of full navigation
        await page.evaluate((hash) => {
          window.location.hash = hash;
        }, slide);
        
        // Wait for route change to complete
        await wait(2000);
        
        // Wait for animations to settle
        await wait(4000);
        
        // Additional wait for any D3 animations or complex components
        await page.evaluate(() => {
          return new Promise(resolve => {
            // Wait for any ongoing animations
            setTimeout(resolve, 3000);
          });
        });
        
        // Take screenshot
        const screenshot = await page.screenshot({
          type: 'png',
          fullPage: false, // Capture viewport only for slide-like behavior
          clip: { x: 0, y: 0, width: 1920, height: 1080 }
        });
        
        screenshots.push({
          slide: slide,
          buffer: screenshot,
          index: i
        });
        
        console.log(`✅ Captured slide: ${slide}`);
        
      } catch (error) {
        console.warn(`⚠️  Failed to capture slide ${slide}:`, error.message);
        // Continue with next slide
      }
    }

    await browser.close();

    if (screenshots.length === 0) {
      console.error('❌ No screenshots captured. Exiting.');
      process.exit(1);
    }

    console.log(`📚 Creating PDF from ${screenshots.length} slides...`);

    // Create PDF using a new browser instance for PDF generation
    const pdfBrowser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });

    const pdfPage = await pdfBrowser.newPage();
    
    // Create HTML content with all screenshots
    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <title>BMSTU Database Research Presentation</title>
        <style>
          @page {
            size: A4 landscape;
            margin: 0;
          }
          body {
            margin: 0;
            padding: 0;
            font-family: Arial, sans-serif;
          }
          .slide {
            width: 100vw;
            height: 100vh;
            page-break-after: always;
            display: flex;
            align-items: center;
            justify-content: center;
            background: white;
          }
          .slide:last-child {
            page-break-after: avoid;
          }
          .slide img {
            max-width: 100%;
            max-height: 100%;
            object-fit: contain;
          }
          .slide-info {
            position: absolute;
            bottom: 10px;
            right: 10px;
            font-size: 10px;
            color: #666;
          }
        </style>
      </head>
      <body>
        ${screenshots.map((screenshot, index) => `
          <div class="slide">
            <img src="data:image/png;base64,${screenshot.buffer.toString('base64')}" alt="Slide ${index + 1}">
            <div class="slide-info">Slide ${index + 1} - ${screenshot.slide}</div>
          </div>
        `).join('')}
      </body>
      </html>
    `;

    await pdfPage.setContent(htmlContent, { waitUntil: 'networkidle0' });
    
    // Generate PDF
    const pdfPath = path.join(OUTPUT_DIR, 'BMSTU_Database_Research_Presentation.pdf');
    await pdfPage.pdf({
      path: pdfPath,
      format: 'A4',
      landscape: true,
      printBackground: true,
      preferCSSPageSize: true,
      margin: {
        top: '0mm',
        bottom: '0mm', 
        left: '0mm',
        right: '0mm'
      }
    });

    await pdfBrowser.close();

    console.log(`🎉 PDF exported successfully!`);
    console.log(`📁 Location: ${pdfPath}`);
    console.log(`📊 Total slides: ${screenshots.length}`);
    
    // Also save individual screenshots if needed
    const screenshotsDir = path.join(OUTPUT_DIR, 'screenshots');
    if (!fs.existsSync(screenshotsDir)) {
      fs.mkdirSync(screenshotsDir);
    }
    
    screenshots.forEach((screenshot, index) => {
      const filename = `slide_${String(index + 1).padStart(2, '0')}_${screenshot.slide.replace(/\//g, '_')}.png`;
      fs.writeFileSync(path.join(screenshotsDir, filename), screenshot.buffer);
    });
    
    console.log(`📸 Individual screenshots saved to: ${screenshotsDir}`);

  } catch (error) {
    console.error('❌ Fatal error during PDF generation:', error);
    process.exit(1);
  }
}

// Run the export
console.log('🎬 Starting PDF export process...');
exportToPDF().catch((error) => {
  console.error('❌ Unhandled error:', error);
  process.exit(1);
}); 