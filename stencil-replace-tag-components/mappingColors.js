/* eslint-disable no-console */
const fs = require('fs');

const mappingColors = [
	`@mindtickle/tag-input-with-suggestions|@mindtickle/tag-input-with-suggestions|@mindtickle/input-pill-with-auto-suggestions|`,
	`@mindtickle/tags-by-category|@mindtickle/tags-by-category|@mindtickle/pills-by-category|`,
	`@mindtickle/tag-input|@mindtickle/tag-input|@mindtickle/input-pill|`,
	`@mindtickle/token|@mindtickle/token|@mindtickle/badge|`,
	`@mindtickle/tag|@mindtickle/tag|@mindtickle/pill|`,
	`TagsByCategory|import TagsByCategory|PillsByCategory|`,
	`Token, {|import Token, {|{ BadgeWithStatus,|`,
	`Token|import Token|{ BadgeWithStatus }|`,
	`TagInputWithSuggestions|import TagInputWithSuggestions|InputPillWithAutoSuggestions|`,
	`TagInputWithSuggestions|TagInputWithSuggestions|InputPillWithAutoSuggestions|`,
	`NormalTag|import NormalTag|Pill|`,
	`TagInput|import TagInput|InputPill|`,
	`Tag|import Tag|Pill|`,
	`ActionTag|ActionTag|ActionPill|`,
	`AdditionTag|AdditionTag|AdditionPill|`,
	`CheckmarkTag|CheckmarkTag|CheckmarkPill|`,
	`CheckableTag|CheckableTag|CheckablePill|`,
	`DestructiveTag|DestructiveTag|DestructivePill|`,
	`SuggestedTags|SuggestedTags|SuggestedPills|`,
	`CreateTagFromCategory|CreateTagFromCategory|CreatePillFromCategory|`,
	`CREATE_TAG_TYPE|CREATE_TAG_TYPE|CREATE_PILL_TYPE|`,
	`Category|Category|Category|`,
	`CreateTagFromSearch|CreateTagFromSearch|CreatePillFromSearch|`,
	`Token|<Token#/Token>|BadgeWithStatus|TRUE`,
	`TAG_STATES|TAG_STATES|PILL_STATES|TRUE`,
	`TAG_TYPES|TAG_TYPES|PILL_TYPES|TRUE`,
	`TagInput|TagInput|InputPill|TRUE`,
	`TagInputWithSuggestions|TagInputWithSuggestions|InputPillWithAutoSuggestions|TRUE`,
	`TagsByCategory|<TagsByCategory#/TagsByCategory>|PillsByCategory|TRUE`,
	`Tag|<Tag#/Tag>|Pill|TRUE`,
	`NormalTag|<NormalTag#/NormalTag>|Pill|TRUE`,
	`Token|<Token#/Token>|BadgeWithStatus|TRUE`,
	`TagInput|<TagInput#/TagInput>|InputPill|TRUE`
];

const obj = mappingColors.map((o) => {
	const oneOnOneColorsMapping = o.split('|');

	const [componentName, findText, replaceName, isSpecific] =
		oneOnOneColorsMapping;

	return {
		componentName,
		findText,
		replaceName,
		isSpecific
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
