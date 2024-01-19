/* eslint-disable no-console */
/* eslint-disable max-params */
/* eslint-disable max-statements */
const fs = require('fs');
const path = require('path');

const replaceColors = require('./colorsOveridden.json');
const importStatement = `import { tokens } from '@mindtickle/styles/lib';`;

// Folder path for iterating files to replace
const args = process.argv;
const folderPath = args[2];
// const folderPath = 'packages/';

// Regex for skipping folders while executing this script
const skipFoldersPattern = new RegExp(
	'icon|lib|__tests__|__test__|images|__snapshots__|node_modules|dist|.git|types|assets|locales|.yarn|__generated__|graphql'
);

// const includeFoldersPattern = new RegExp('packages/');
const regexPattern = new RegExp('.*.js|.*.ts|.*.tsx');
const excludePattern = new RegExp(
	'lib|package.json|.*.md|messages.*|.*.css$|.*.scss$|.*.svg$|yarn.lock|package-lock.json|.*.d.ts$|.*.test.ts$|.*.json$|.*.sh$|.*.env$|.*.graphql$'
);

// Function to find and return the line number containing a specific string
function findLineWithText(filePath, findText, stringToReplace, newString) {
	const data = fs.readFileSync(filePath, 'utf8');

	const lines = data.split('\n');
	const pattern = findText.split('#').join('|');
	const findPattern = new RegExp(`(${pattern})`);

	let changesDone = false;
	const isFontFamilyReplace = newString.includes('fontFamily');
	lines.forEach((line, index) => {
		if (findPattern.test(line)) {
			const lineNumber = index + 1;
			if (lineNumber > 0 && lineNumber <= lines.length) {
				const lineToReplace = lines[lineNumber - 1];
				const regToReplace = isFontFamilyReplace
					? stringToReplace
					: `theme.colors.${stringToReplace}|themes.colors.${stringToReplace}|colors.${stringToReplace}`;

				const regEx = new RegExp(regToReplace, 'g');

				if (regEx.test(line)) {
					const replaceText = isFontFamilyReplace
						? newString
						: `tokens.${newString}`;

					const replacedLine = lineToReplace.replace(regEx, replaceText);
					lines[lineNumber - 1] = replacedLine;
					changesDone = true;
				}
			} else {
				console.error('Invalid line number or file content.');
			}
		}
	});

	if (changesDone && !lines[0].includes(importStatement)) {
		lines.unshift(importStatement);
	}

	const updatedContent = lines.join('\n');

	fs.writeFileSync(filePath, updatedContent);
}

function replaceStringInFiles(directoryPath, regexPattern) {
	try {
		const files = fs.readdirSync(directoryPath);

		files.forEach((file) => {
			const filePath = path.join(directoryPath, file);

			if (skipFoldersPattern.test(directoryPath)) {
				return;
			}

			// if (!includeFoldersPattern.test(filePath)) {
			// 	return;
			// }

			if (excludePattern.test(filePath)) {
				console.log('Skipping file:', filePath);
				return;
			}

			console.log('Iterating over file:', filePath);

			fs.stat(filePath, (err, stats) => {
				if (err) {
					console.error('Error getting file stats:', err);
					return;
				}

				if (stats.isFile()) {
					if (!regexPattern.test(filePath)) {
						console.log('Skipping file', filePath);
						return;
					}

					replaceColors.forEach((color) => {
						const {
							themeName: stringToReplace,
							findText,
							tokenName: newString
						} = color;
						findLineWithText(filePath, findText, stringToReplace, newString);
					});
				} else {
					replaceStringInFiles(filePath, regexPattern);
				}
			});
		});
	} catch (err) {
		console.error('Error reading directory:', err);
	}
}

if (folderPath) {
	replaceStringInFiles(folderPath, regexPattern);
} else {
	console.log(
		'Folder path is empty. Please provide folder path where you want to replace the colors'
	);
}
