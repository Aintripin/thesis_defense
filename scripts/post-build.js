import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const esTarget = process.env.VITE_ES_TARGET || 'es2020';
const distDir = path.join(__dirname, '../dist');
const sourcePath = path.join(distDir, 'index.html');
const targetPath = path.join(distDir, `presentation_${esTarget.toUpperCase()}.html`);

try {
  if (fs.existsSync(sourcePath)) {
    // Read the current index.html content
    const content = fs.readFileSync(sourcePath, 'utf8');
    
    // Write to the target ES-specific filename
    fs.writeFileSync(targetPath, content);
    console.log(`✅ Created: presentation_${esTarget.toUpperCase()}.html`);
    
    // Keep index.html as the latest build for compatibility
    console.log(`📋 index.html preserved as latest build`);
    
    // Also create a generic copy if this is ES2020 (most common)
    if (esTarget === 'es2020') {
      const genericPath = path.join(distDir, 'presentation.html');
      fs.writeFileSync(genericPath, content);
      console.log(`📄 Created generic: presentation.html`);
    }
  } else {
    console.error('❌ index.html not found in dist directory');
    process.exit(1);
  }
} catch (error) {
  console.error('❌ Error during post-build:', error);
  process.exit(1);
} 