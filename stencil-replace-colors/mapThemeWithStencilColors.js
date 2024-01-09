const fs = require('fs');

// Define the file path
const filePath = './antTheme.ts';
const colorMap = require('./colorMap');

const colorKeys = Object.keys(colorMap);

const colorKeysReplacement = colorKeys.map(key => {
  // console.log('key>>>', key);
  let regExp = new RegExp(`${key}'.*`, 'i');
  return {
    pattern: regExp, // Regex pattern to match console.log statements
    replace: `${key}': ${colorMap[key]},`, // Replace console.log with console.error
  };
});

// Read the file
fs.readFile(filePath, 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading file:', err);
    return;
  }

  // Split the file content into lines
  const lines = data.split('\n');

  // Iterate through each line and perform replacements
  const modifiedLines = lines.map(line => {
    let modifiedLine = line;
    // Check for each replacement pattern
    colorKeysReplacement.forEach(({ pattern, replace }) => {
      if (pattern.test(modifiedLine)) {
        // If the pattern matches, perform the replacement
        modifiedLine = modifiedLine.replace(pattern, replace);
      }
    });
    return modifiedLine;
  });

  // Join the modified lines back into a string
  const modifiedContent = modifiedLines.join('\n');

  // Write the modified content back to the file
  fs.writeFile(filePath, modifiedContent, 'utf8', err => {
    if (err) {
      console.error('Error writing to file:', err);
      return;
    }
    console.log('File updated successfully.');
  });
});
