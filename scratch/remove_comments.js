import fs from 'fs';
import path from 'path';

const removeComments = (code) => {
    // Regex to remove multi-line comments
    code = code.replace(/\/\*[\s\S]*?\*\//g, '');
    
    // Regex to remove single-line comments
    // Matches // but not if preceded by : (to avoid http://)
    // This is still a bit risky for JSX strings with // but usually safe for standard code.
    // A better way is to split by lines and handle it.
    const lines = code.split('\n');
    const cleanedLines = lines.map(line => {
        // Find // that is not inside a string
        // For simplicity, we just check if it looks like a comment.
        // If it starts with // or has whitespace then //
        const trimmed = line.trim();
        if (trimmed.startsWith('//')) {
            return '';
        }
        // If there's a // after some code, be careful.
        // We'll only remove it if it's preceded by space and not preceded by :
        const commentIndex = line.indexOf('//');
        if (commentIndex > 0) {
            const before = line.substring(0, commentIndex);
            // Check if before has even number of quotes (naive check)
            const doubleQuotes = (before.match(/"/g) || []).length;
            const singleQuotes = (before.match(/'/g) || []).length;
            const backticks = (before.match(/`/g) || []).length;
            
            if (doubleQuotes % 2 === 0 && singleQuotes % 2 === 0 && backticks % 2 === 0) {
                if (!before.trim().endsWith(':')) {
                    return before.trimEnd();
                }
            }
        }
        return line;
    });
    
    return cleanedLines.join('\n').replace(/\n\s*\n\n/g, '\n\n'); // Clean up extra newlines
};

const processDirectory = (dir) => {
    const files = fs.readdirSync(dir);
    files.forEach(file => {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            processDirectory(fullPath);
        } else if (fullPath.endsWith('.jsx') || fullPath.endsWith('.js')) {
            console.log(`Processing ${fullPath}...`);
            const content = fs.readFileSync(fullPath, 'utf8');
            const cleaned = removeComments(content);
            fs.writeFileSync(fullPath, cleaned);
        }
    });
};

const targetDir = '/home/pc-4/Desktop/all-in/src/components';
processDirectory(targetDir);
console.log('Done!');
