/* eslint-disable no-console */
const fs = require('fs');

const mappingColors = [
	`@mindtickle/tag|@mindtickle/tag|@mindtickle/pill`,
	`@mindtickle/tag-input|@mindtickle/tag-input|@mindtickle/input-pill`,
	`@mindtickle/tag-input-with-suggestions|@mindtickle/tag-input-with-suggestions|@mindtickle/input-pill-with-auto-suggestions`,
	`@mindtickle/tags-by-category|@mindtickle/tags-by-category|@mindtickle/pills-by-category`,
	`@mindtickle/token|@mindtickle/token|@mindtickle/badge`,
	`TagsByCategory|import TagsByCategory|PillsByCategory`,
	`Tag|import Tag|Pill`,
	`Token|import Token|{ BadgeWithStatus }`,
	`TagInput|import TagInput|InputPill`,
	`TagInputWithSuggestions|import TagInputWithSuggestions|InputPillWithAutoSuggestions`,
	`ActionTag|ActionTag|ActionPill`,
	`AdditionTag|AdditionTag|AdditionPill`,
	`CheckmarkTag|CheckmarkTag|CheckmarkPill`,
	`CheckableTag|CheckableTag|CheckablePill`,
	`DestructiveTag|DestructiveTag|DestructivePill`,
	`SuggestedTags|SuggestedTags|SuggestedPills`,
	`CreateTagFromCategory|CreateTagFromCategory|CreatePillFromCategory`,
	`CREATE_TAG_TYPE|CREATE_TAG_TYPE|CREATE_PILL_TYPE`,
	`Category|Category|Category`,
	`CreateTagFromSearch|CreateTagFromSearch|CreatePillFromSearch`,
	`Token|Token|BadgeWithStatus`,
	`TAG_STATES|TAG_STATES|PILL_STATES`,
	`TAG_TYPES|TAG_TYPES|PILL_TYPES`,
	`TagInput|TagInput|InputPill`,
	`TagInputWithSuggestions|TagInputWithSuggestions|InputPillWithAutoSuggestions`
];

const obj = mappingColors.map((o) => {
	const oneOnOneColorsMapping = o.split('|');

	const [componentName, findText, replaceName] = oneOnOneColorsMapping;

	return {
		componentName,
		findText,
		replaceName
	};
});

// Function to create and write an object to a file
function writeObjectToFile(filePath, dataObject) {
	// Convert the object to JSON format
	const jsonData = JSON.stringify(dataObject, null, 2); // null and 2 for prettifying JSON

	// Write the JSON data to the file
	fs.writeFile(filePath, jsonData, 'utf8', (err) => {
		if (err) {
			console.error('Error writing file:', err);
			return;
		}
		console.log('File has been written successfully.');
	});
}

const filePath = './namesMapping.json';

writeObjectToFile(filePath, obj);
