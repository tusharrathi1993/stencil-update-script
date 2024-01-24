/* eslint-disable no-console */
const fs = require('fs');

const mappingColors = [
	`AEROSPACE_ORANGE|---|brandTokens.COLOR_BRAND_PRIMARY`,
	`ALTO|border:#border-color:#border-top:#border-bottom:#border-left:#border-right:#borderColor#trailColor=#strokeColor=#borderTop:#borderBottom:#borderLeft:#borderRight:|borderTokens.COLOR_BORDER_DEFAULT`,
	`ALTO|background:#background-color:#backgroundColor:#bgColor:#bgShade:#bg_color:#fill:|bgTokens.COLOR_BG_DISABLED`,
	`ALTO|color:#color =|textTokens.COLOR_TEXT_DISABLED`,
	`ALTO|---|buttonTokens.COLOR_BUTTON_DISABLED`,
	`ALTO|---|chartTokens.COLOR_CHART_ALTO_SUBTLE`,
	`ANZAC|background:#background-color:#backgroundColor:#bgColor:#bgShade:#bg_color:#fill:|moduleTokens.COLOR_MODULE_ASSESSMENT`,
	`ASSESSMENT|background:#background-color:#backgroundColor:#bgColor:#bgShade:#bg_color:#fill:|moduleTokens.COLOR_MODULE_ASSESSMENT`,
	`ATHENSGRAY|background:#background-color:#backgroundColor:#bgColor:#bgShade:#bg_color:#fill:|chartTokens.COLOR_CHART_ALTO`,
	`BALI_HAI|background:#background-color:#backgroundColor:#bgColor:#bgShade:#bg_color:#fill:|moduleTokens.COLOR_MODULE_MISSION`,
	`BILOBA_FLOWER|MEDIA_TYPE|filetypeTokens.COLOR_FILETYPE_IMAGE`,
	`BITTERSWEET|background:#background-color:#backgroundColor:#bgColor:#bgShade:#bg_color:#fill:|bgTokens.COLOR_BG_DANGER_STRONG`,
	`BITTERSWEET|border:#border-color:#border-top:#border-bottom:#border-left:#border-right:#borderColor#trailColor=#strokeColor=#borderTop:#borderBottom:#borderLeft:#borderRight:|borderTokens.COLOR_BORDER_DANGER`,
	`BITTERSWEET|color:#color =|textTokens.COLOR_TEXT_DANGER`,
	`BITTERSWEET|---|iconTokens.COLOR_ICON_DANGER`,
	`BITTERSWEET|---|buttonTokens.COLOR_BUTTON_DANGER`,
	`BITTERSWEET|---|chartTokens.COLOR_CHART_PIPPIN`,
	`BLACK|border:#border-color:#border-top:#border-bottom:#border-left:#border-right:#borderColor#trailColor=#strokeColor=#borderTop:#borderBottom:#borderLeft:#borderRight:|iconTokens.COLOR_ICON_STRONG`,
	`BLACK|background:#background-color:#backgroundColor:#bgColor:#bgShade:#bg_color:#fill:|iconTokens.COLOR_ICON_STRONG`,
	`BROMET|MEDIA_TYPE|filetypeTokens.COLOR_FILETYPE_FEEDBACK`,
	`BUBBLE_GREEN_BORDER|---|deprecatedTokens.COLOR_DEPRECATED_GREEN1`,
	`BUBBLE_GREEN_FILL|---|deprecatedTokens.COLOR_DEPRECATED_GREEN2`,
	`BUBBLE_ORANGE_BORDER|---|brandTokens.COLOR_BRAND_PRIMARY`,
	`BUBBLE_ORANGE_FILL|---|deprecatedTokens.COLOR_DEPRECATED_ORANGE1`,
	`BUBBLE_RED_BORDER|---|deprecatedTokens.COLOR_DEPRECATED_RED1`,
	`BUBBLE_RED_FILL|---|deprecatedTokens.COLOR_DEPRECATED_RED2`,
	`BURNT_SIENNA|MEDIA_TYPE|filetypeTokens.COLOR_FILETYPE_PDF`,
	`CADILLAC_PINK|MEDIA_TYPE|filetypeTokens.COLOR_FILETYPE_SCORM`,
	`CAROLINA_BLUE|color:#color =|textTokens.COLOR_TEXT_INVERSE_SECONDARY`,
	`CAROLINA_BLUE|---|iconTokens.COLOR_ICON_INVERSE_SECONDARY`,
	`CHECKLIST|background:#background-color:#backgroundColor:#bgColor:#bgShade:#bg_color:#fill:|moduleTokens.COLOR_MODULE_CHECKLIST`,
	`COACHING|MEDIA_TYPE|moduleTokens.COLOR_MODULE_COACHING`,
	`COACHING|background:#background-color:#backgroundColor:#bgColor:#bgShade:#bg_color:#fill:|moduleTokens.COLOR_MODULE_QUEST`,
	`CONGRESS_BLUE|---|deprecatedTokens.COLOR_DEPRECATED_NAVBAR1`,
	`COURSE|background:#background-color:#backgroundColor:#bgColor:#bgShade:#bg_color:#fill:|moduleTokens.COLOR_MODULE_COURSE`,
	`DANUBE|background:#background-color:#backgroundColor:#bgColor:#bgShade:#bg_color:#fill:|bgTokens.COLOR_BG_ACCENT`,
	`DANUBE|border:#border-color:#border-top:#border-bottom:#border-left:#border-right:#borderColor#trailColor=#strokeColor=#borderTop:#borderBottom:#borderLeft:#borderRight:|borderTokens.COLOR_BORDER_ACCENT`,
	`DANUBE|color:#color =|textTokens.COLOR_TEXT_ACCENT`,
	`DANUBE|---|iconTokens.COLOR_ICON_ACCENT`,
	`DANUBE|MEDIA_TYPE|filetypeTokens.COLOR_FILETYPE_LINK`,
	`DANUBE|---|buttonTokens.COLOR_BUTTON_ACCENT`,
	`DANUBE|background:#background-color:#backgroundColor:#bgColor:#bgShade:#bg_color:#fill:|moduleTokens.COLOR_MODULE_HUB`,
	`DANUBE|background:#background-color:#backgroundColor:#bgColor:#bgShade:#bg_color:#fill:|moduleTokens.COLOR_MODULE_SERIES`,
	`DARK_BLUE|---|deprecatedTokens.COLOR_DEPRECATED_BLUE2`,
	`DARK_GREY|color:#color =|textTokens.COLOR_TEXT_SECONDARY`,
	`DARK_ORANGE|---|deprecatedTokens.COLOR_DEPRECATED_ORANGE2`,
	`DARK_OUTER_SPACE|border:#border-color:#border-top:#border-bottom:#border-left:#border-right:#borderColor#trailColor=#strokeColor=#borderTop:#borderBottom:#borderLeft:#borderRight:|borderTokens.COLOR_BORDER_STRONG`,
	`DARK_OUTER_SPACE|background:#background-color:#backgroundColor:#bgColor:#bgShade:#bg_color:#fill:|bgTokens.COLOR_BG_STRONG`,
	`DARK_OUTER_SPACE|color:#color =|textTokens.COLOR_TEXT_SECONDARY`,
	`DEEP_CHAMPAGNE|border:#border-color:#border-top:#border-bottom:#border-left:#border-right:#borderColor#trailColor=#strokeColor=#borderTop:#borderBottom:#borderLeft:#borderRight:|borderTokens.COLOR_BORDER_BRAND`,
	`DISABLE|border:#border-color:#border-top:#border-bottom:#border-left:#border-right:#borderColor#trailColor=#strokeColor=#borderTop:#borderBottom:#borderLeft:#borderRight:|borderTokens.COLOR_BORDER_STRONG`,
	`DISABLE|background:#background-color:#backgroundColor:#bgColor:#bgShade:#bg_color:#fill:|bgTokens.COLOR_BG_DISABLED`,
	`DISABLE|color:#color =|textTokens.COLOR_TEXT_SECONDARY`,
	`DISABLE|---|iconTokens.COLOR_ICON_DISABLED`,
	`EBONY_CLAY|---|deprecatedTokens.COLOR_DEPRECATED_NAVBAR2`,
	`ELSALVA|BADGE_TYPES|chartTokens.COLOR_CHART_SALVA`,
	`EMERALD|background:#background-color:#backgroundColor:#bgColor:#bgShade:#bg_color:#fill:|moduleTokens.COLOR_MODULE_COURSE`,
	`FEIJOA|MEDIA_TYPE|filetypeTokens.COLOR_FILETYPE_XLS`,
	`FOUNTAIN_BLUE|background:#background-color:#backgroundColor:#bgColor:#bgShade:#bg_color:#fill:|moduleTokens.COLOR_MODULE_COACHING`,
	`FOUNTAIN_BLUE|background:#background-color:#backgroundColor:#bgColor:#bgShade:#bg_color:#fill:|moduleTokens.COLOR_MODULE_QUEST`,
	`FROG|---|chartTokens.COLOR_CHART_SALVA_SUBTLE`,
	`FROLY|MEDIA_TYPE|filetypeTokens.COLOR_FILETYPE_VIDEO`,
	`GOOGLE|---|deprecatedTokens.COLOR_DEPRECATED_RED3`,
	`GREY|border:#border-color:#border-top:#border-bottom:#border-left:#border-right:#borderColor#trailColor=#strokeColor=#borderTop:#borderBottom:#borderLeft:#borderRight:|borderTokens.COLOR_BORDER_STRONG`,
	`GREY|background:#background-color:#backgroundColor:#bgColor:#bgShade:#bg_color:#fill:|bgTokens.COLOR_BG_STRONG`,
	`HUNTER_GREEN|---|chartTokens.COLOR_CHART_HUNTER`,
	`HUNTER_GREEN|background:#background-color:#backgroundColor:#bgColor:#bgShade:#bg_color:#fill:|chartTokens.COLOR_CHART_HUNTER`,
	`ICON|border:#border-color:#border-top:#border-bottom:#border-left:#border-right:#borderColor#trailColor=#strokeColor=#borderTop:#borderBottom:#borderLeft:#borderRight:|borderTokens.COLOR_BORDER_STRONG`,
	`ICON|background:#background-color:#backgroundColor:#bgColor:#bgShade:#bg_color:#fill:|bgTokens.COLOR_BG_STRONG`,
	`ICON|color:#MEDIA_TYPE|iconTokens.COLOR_ICON_DEFAULT`,
	`INDIGO|background:#background-color:#backgroundColor:#bgColor:#bgShade:#bg_color:#fill:|bgTokens.COLOR_BG_ACCENT`,
	`INDIGO|border:#border-color:#border-top:#border-bottom:#border-left:#border-right:#borderColor#trailColor=#strokeColor=#borderTop:#borderBottom:#borderLeft:#borderRight:|borderTokens.COLOR_BORDER_ACCENT`,
	`INDIGO|color:#color =|textTokens.COLOR_TEXT_ACCENT`,
	`INDIGO|---|iconTokens.COLOR_ICON_ACCENT`,
	`INDIGO|---|filetypeTokens.COLOR_FILETYPE_LINK`,
	`INDIGO|---|buttonTokens.COLOR_BUTTON_ACCENT`,
	`INDIGO|---|moduleTokens.COLOR_MODULE_HUB`,
	`INDIGO|---|moduleTokens.COLOR_MODULE_SERIES`,
	`IVORY|background:#background-color:#backgroundColor:#bgColor:#bgShade:#bg_color:#fill:|bgTokens.COLOR_BG_SECONDARY`,
	`IVORY|border:#border-color:#border-top:#border-bottom:#border-left:#border-right:#borderColor#trailColor=#strokeColor=#borderTop:#borderBottom:#borderLeft:#borderRight:|borderTokens.COLOR_BORDER_TERTIARY`,
	`JODHPUR|---|buttonTokens.COLOR_BUTTON_ACCENT_HOVER`,
	`JORDY_BLUE|background:#background-color:#backgroundColor:#bgColor:#bgShade:#bg_color:#fill:|moduleTokens.COLOR_MODULE_ILT`,
	`KOROMIKO|background:#background-color:#backgroundColor:#bgColor:#bgShade:#bg_color:#fill:|bgTokens.COLOR_BG_WARNING_STRONG`,
	`KOROMIKO|color:#color =|textTokens.COLOR_TEXT_WARNING`,
	`KOROMIKO|---|iconTokens.COLOR_ICON_WARNING`,
	`KOROMIKO|---|chartTokens.COLOR_CHART_KOROMIKO`,
	`LIGHT_BLUE|background:#background-color:#backgroundColor:#bgColor:#bgShade:#bg_color:#fill:|bgTokens.COLOR_BG_SELECTED`,
	`LIGHT_GREY|background:#background-color:#backgroundColor:#bgColor:#bgShade:#bg_color:#fill:|bgTokens.COLOR_BG_DEFAULT`,
	`LIGHT_GREY|border:#border-color:#border-top:#border-bottom:#border-left:#border-right:#borderColor#trailColor=#strokeColor=#borderTop:#borderBottom:#borderLeft:#borderRight:|borderTokens.COLOR_BORDER_TERTIARY`,
	`LIGHT_GREY|color:#color =|textTokens.COLOR_TEXT_INVERSE`,
	`LIGHT_GREY|---|iconTokens.COLOR_ICON_INVERSE`,
	`LIGHT_ORANGE|background:#background-color:#backgroundColor:#bgColor:#bgShade:#bg_color:#fill:|bgTokens.COLOR_BG_WARNING`,
	`LIGHT_ORANGE|---|chartTokens.COLOR_CHART_KOROMIKO_SUBTLE`,
	`MACRONI_CHEESE|background:#background-color:#backgroundColor:#bgColor:#bgShade:#bg_color:#fill:|bgTokens.COLOR_BG_WARNING_STRONG`,
	`MACRONI_CHEESE|color:#color =|textTokens.COLOR_TEXT_WARNING`,
	`MACRONI_CHEESE|---|iconTokens.COLOR_ICON_WARNING`,
	`MACRONI_CHEESE|---|chartTokens.COLOR_CHART_KOROMIKO`,
	`MAGGIE|background:#background-color:#backgroundColor:#bgColor:#bgShade:#bg_color:#fill:|bgTokens.COLOR_BG_WARNING_STRONG`,
	`MAGGIE|color:#color =|textTokens.COLOR_TEXT_WARNING`,
	`MAGGIE|---|iconTokens.COLOR_ICON_WARNING`,
	`MAGGIE|---|chartTokens.COLOR_CHART_KOROMIKO`,
	`MANATEE|border:#border-color:#border-top:#border-bottom:#border-left:#border-right:#borderColor#trailColor=#strokeColor=#borderTop:#borderBottom:#borderLeft:#borderRight:|iconTokens.COLOR_ICON_INVERSE_TERTIARY`,
	`MANATEE|background:#background-color:#backgroundColor:#bgColor:#bgShade:#bg_color:#fill:|iconTokens.COLOR_ICON_INVERSE_TERTIARY`,
	`MANATEE|color:#color =|textTokens.COLOR_TEXT_INVERSE_TERTIARY`,
	`MANATEE|---|iconTokens.COLOR_ICON_INVERSE_TERTIARY`,
	`MINDTICKLE|---|brandTokens.COLOR_BRAND_PRIMARY`,
	`MISSION|background:#background-color:#backgroundColor:#bgColor:#bgShade:#bg_color:#fill:|moduleTokens.COLOR_MODULE_MISSION`,
	`NEPTUNE|border:#border-color:#border-top:#border-bottom:#border-left:#border-right:#borderColor#trailColor=#strokeColor=#borderTop:#borderBottom:#borderLeft:#borderRight:|buttonTokens.COLOR_BUTTON_ACCENT_ACTIVE`,
	`NEPTUNE|background:#background-color:#backgroundColor:#bgColor:#bgShade:#bg_color:#fill:|buttonTokens.COLOR_BUTTON_ACCENT_ACTIVE`,
	`OASIS|background:#background-color:#backgroundColor:#bgColor:#bgShade:#bg_color:#fill:|bgTokens.COLOR_BG_WARNING`,
	`OASIS|---|chartTokens.COLOR_CHART_KOROMIKO_SUBTLE`,
	`OCEAN|background:#background-color:#backgroundColor:#bgColor:#bgShade:#bg_color:#fill:|bgTokens.COLOR_BG_ACCENT`,
	`OCEAN|border:#border-color:#border-top:#border-bottom:#border-left:#border-right:#borderColor#trailColor=#strokeColor=#borderTop:#borderBottom:#borderLeft:#borderRight:|borderTokens.COLOR_BORDER_ACCENT`,
	`OCEAN|color:#color =|textTokens.COLOR_TEXT_ACCENT`,
	`OCEAN|---|iconTokens.COLOR_ICON_ACCENT`,
	`OCEAN|---|filetypeTokens.COLOR_FILETYPE_LINK`,
	`OCEAN|---|buttonTokens.COLOR_BUTTON_ACCENT`,
	`OCEAN|background:#background-color:#backgroundColor:#bgColor:#bgShade:#bg_color:#fill:|moduleTokens.COLOR_MODULE_HUB`,
	`OCEAN|background:#background-color:#backgroundColor:#bgColor:#bgShade:#bg_color:#fill:|moduleTokens.COLOR_MODULE_SERIES`,
	`OUTER_SPACE|background:#background-color:#backgroundColor:#bgColor:#bgShade:#bg_color:#fill:|bgTokens.COLOR_BG_STRONG`,
	`OUTER_SPACE|border:#border-color:#border-top:#border-bottom:#border-left:#border-right:#borderColor#trailColor=#strokeColor=#borderTop:#borderBottom:#borderLeft:#borderRight:|borderTokens.COLOR_BORDER_STRONG`,
	`OUTER_SPACE|color:#color =|textTokens.COLOR_TEXT_TERTIARY`,
	`OUTER_SPACE|---|iconTokens.COLOR_ICON_SECONDARY`,
	`OXFORD_BLUE|---|deprecatedTokens.COLOR_DEPRECATED_NAVBAR4`,
	`PALE_BLUE|background:#background-color:#backgroundColor:#bgColor:#bgShade:#bg_color:#fill:|bgTokens.COLOR_BG_ACCENT_SELECTED`,
	`PALE_GREEN|---|filetypeTokens.COLOR_FILETYPE_QUESTION`,
	`PALE_GREEN|background:#background-color:#backgroundColor:#bgColor:#bgShade:#bg_color:#fill:|filetypeTokens.COLOR_FILETYPE_QUESTION`,
	`PANTONE_BLUE|---|brandTokens.COLOR_BRAND_SECONDARY`,
	`PASTEL_GREEN|background:#background-color:#backgroundColor:#bgColor:#bgShade:#bg_color:#fill:|bgTokens.COLOR_BG_SUCCESS_STRONG`,
	`PASTEL_GREEN|border:#border-color:#border-top:#border-bottom:#border-left:#border-right:#borderColor#trailColor=#strokeColor=#borderTop:#borderBottom:#borderLeft:#borderRight:|borderTokens.COLOR_BORDER_SUCCESS`,
	`PASTEL_GREEN|color:#BADGE_TYPES#color =|textTokens.COLOR_TEXT_SUCCESS`,
	`PASTEL_GREEN|---|iconTokens.COLOR_ICON_SUCCESS`,
	`PASTEL_GREEN|---|buttonTokens.COLOR_BUTTON_SUCCESS`,
	`PASTEL_GREEN|---|chartTokens.COLOR_CHART_TARA`,
	`PEACH_CREAM|border:#border-color:#border-top:#border-bottom:#border-left:#border-right:#borderColor#trailColor=#strokeColor=#borderTop:#borderBottom:#borderLeft:#borderRight:|chartTokens.COLOR_CHART_SALMON_SUBTLE`,
	`PEACH_CREAM|background:#background-color:#backgroundColor:#bgColor:#bgShade:#bg_color:#fill:|chartTokens.COLOR_CHART_SALMON_SUBTLE`,
	`PEACH_ORANGE|background:#background-color:#backgroundColor:#bgColor:#bgShade:#bg_color:#fill:|bgTokens.COLOR_BG_WARNING_STRONG`,
	`PEACH_ORANGE|color:#color =|textTokens.COLOR_TEXT_WARNING`,
	`PEACH_ORANGE|---|iconTokens.COLOR_ICON_WARNING`,
	`PEACH_ORANGE|---|chartTokens.COLOR_CHART_KOROMIKO`,
	`PEARL|background:#background-color#BADGE_TYPES|bgTokens.COLOR_BG_DISABLED`,
	`PEARL|border:#border-color:#border-top:#border-bottom:#border-left:#border-right:#borderColor#trailColor=#strokeColor=#borderTop:#borderBottom:#borderLeft:#borderRight:|borderTokens.COLOR_BORDER_SECONDARY`,
	`PICKLED_BLUEWOOD|background:#background-color:#backgroundColor:#bgColor:#bgShade:#bg_color:#fill:|bgTokens.COLOR_BG_INVERSE_TERTIARY`,
	`PICO_IVORY|background:#background-color:#backgroundColor:#bgColor:#bgShade:#bg_color:#fill:|bgTokens.COLOR_BG_BRAND`,
	`PIPPIN|background:#background-color:#backgroundColor:#bgColor:#bgShade:#bg_color:#fill:|bgTokens.COLOR_BG_DANGER`,
	`PIPPIN|---|chartTokens.COLOR_CHART_PIPPIN_SUBTLE`,
	`PORCELAIN|background:#background-color:#backgroundColor:#bgColor:#bgShade:#bg_color:#fill:|bgTokens.COLOR_BG_TERTIARY`,
	`PORCELAIN|border:#border-color:#border-top:#border-bottom:#border-left:#border-right:#borderColor#trailColor=#strokeColor=#borderTop:#borderBottom:#borderLeft:#borderRight:|borderTokens.COLOR_BORDER_TERTIARY`,
	`Q_UPDATE|background:#background-color:#backgroundColor:#bgColor:#bgShade:#bg_color:#fill:|moduleTokens.COLOR_MODULE_QUICKUPDATE`,
	`QUEST|background:#background-color:#backgroundColor:#bgColor:#bgShade:#bg_color:#fill:|moduleTokens.COLOR_MODULE_COACHING`,
	`QUEST|background:#background-color:#backgroundColor:#bgColor:#bgShade:#bg_color:#fill:|moduleTokens.COLOR_MODULE_QUEST`,
	`RHINO|---|deprecatedTokens.COLOR_DEPRECATED_NAVBAR3`,
	`RONCHI|MEDIA_TYPE|filetypeTokens.COLOR_FILETYPE_AUDIO`,
	`SALESFORCE|---|deprecatedTokens.COLOR_DEPRECATED_BLUE4`,
	`SALMON|background:#background-color:#backgroundColor:#bgColor:#bgShade:#bg_color:#fill:|chartTokens.COLOR_CHART_SALMON`,
	`SANDY_BROWN|MEDIA_TYPE|filetypeTokens.COLOR_FILETYPE_PPT`,
	`SAZERAC|background:#background-color:#backgroundColor:#bgColor:#bgShade:#bg_color:#fill:|bgTokens.COLOR_BG_WARNING`,
	`SAZERAC|---|chartTokens.COLOR_CHART_KOROMIKO_SUBTLE`,
	`SEAGULL|MEDIA_TYPE|filetypeTokens.COLOR_FILETYPE_DOC`,
	`SHARK|border:#border-color:#border-top:#border-bottom:#border-left:#border-right:#borderColor#trailColor=#strokeColor=#borderTop:#borderBottom:#borderLeft:#borderRight:|borderTokens.COLOR_BORDER_STRONG`,
	`SHARK|color:#color =|textTokens.COLOR_TEXT_DEFAULT`,
	`SHARK|background:#background-color:#backgroundColor:#bgColor:#bgShade:#bg_color:#fill:|bgTokens.COLOR_BG_INVERSE_SECONDARY`,
	`SILVER|border:#border-color:#border-top:#border-bottom:#border-left:#border-right:#borderColor#trailColor=#strokeColor=#borderTop:#borderBottom:#borderLeft:#borderRight:|borderTokens.COLOR_BORDER_STRONG`,
	`SILVER|background:#background-color:#backgroundColor:#bgColor:#bgShade:#bg_color:#fill:|bgTokens.COLOR_BG_DISABLED`,
	`SILVER|color:#color =|textTokens.COLOR_TEXT_SECONDARY`,
	`SILVER|---|iconTokens.COLOR_ICON_DISABLED`,
	`SKY|background:#background-color:#backgroundColor:#bgColor:#bgShade:#bg_color:#fill:|bgTokens.COLOR_BG_ACCENT`,
	`SKY|border:#border-color:#border-top:#border-bottom:#border-left:#border-right:#borderColor#trailColor=#strokeColor=#borderTop:#borderBottom:#borderLeft:#borderRight:|borderTokens.COLOR_BORDER_ACCENT`,
	`SKY|color:#color =|textTokens.COLOR_TEXT_ACCENT`,
	`SKY|---|iconTokens.COLOR_ICON_ACCENT`,
	`SKY|---|filetypeTokens.COLOR_FILETYPE_LINK`,
	`SKY|---|buttonTokens.COLOR_BUTTON_ACCENT`,
	`SKY|background:#background-color:#backgroundColor:#bgColor:#bgShade:#bg_color:#fill:|moduleTokens.COLOR_MODULE_HUB`,
	`SKY|background:#background-color:#backgroundColor:#bgColor:#bgShade:#bg_color:#fill:|moduleTokens.COLOR_MODULE_SERIES`,
	`SNOWWHITE|background:#background-color:#backgroundColor:#bgColor:#bgShade:#bg_color:#fill:|bgTokens.COLOR_BG_DEFAULT`,
	`SNOWWHITE|border:#border-color:#border-top:#border-bottom:#border-left:#border-right:#borderColor#trailColor=#strokeColor=#borderTop:#borderBottom:#borderLeft:#borderRight:|borderTokens.COLOR_BORDER_TERTIARY`,
	`SNOWWHITE|color:#color =|textTokens.COLOR_TEXT_INVERSE`,
	`SNOWWHITE|---|iconTokens.COLOR_ICON_INVERSE`,
	`SUNGLO|background:#background-color:#backgroundColor:#bgColor:#bgShade:#bg_color:#fill:|moduleTokens.COLOR_MODULE_QUICKUPDATE`,
	`SUNRISE|---|chartTokens.COLOR_CHART_MAGGIE_SUBTLE`,
	`TAG_HOVER_TEXT_COLOR|color:#color =|textTokens.COLOR_TEXT_ACCENT`,
	`TARA|border:#border-color:#border-top:#border-bottom:#border-left:#border-right:#borderColor#trailColor=#strokeColor=#borderTop:#borderBottom:#borderLeft:#borderRight:|bgTokens.COLOR_BG_SUCCESS`,
	`TARA|background:#background-color:#backgroundColor:#bgColor:#bgShade:#bg_color:#fill:|bgTokens.COLOR_BG_SUCCESS`,
	`TARA|---|chartTokens.COLOR_CHART_TARA_SUBTLE`,
	`TRANSPARENT|border:#border-color:#border-top:#border-bottom:#border-left:#border-right:#borderColor:|bgTokens.COLOR_BG_TRANSPARENT`,
	`TRANSPARENT|background:#background-color:#backgroundColor:#bgColor:#bgShade:#bg_color:#fill:|bgTokens.COLOR_BG_TRANSPARENT`,
	`TRANSPARENT|color:#color =|bgTokens.COLOR_BG_TRANSPARENT`,
	`TROPICAL_BLUE|background:#background-color:#backgroundColor:#bgColor:#bgShade:#bg_color:#fill:|bgTokens.COLOR_BG_ACCENT_SELECTED`,
	`TROPICAL_BLUE|border:#border-color:#border-top:#border-bottom:#border-left:#border-right:#borderColor#trailColor=#strokeColor=#borderTop:#borderBottom:#borderLeft:#borderRight:|bgTokens.COLOR_BG_ACCENT_SELECTED`,
	`WARNING|background:#background-color:#backgroundColor:#bgColor:#bgShade:#bg_color:#fill:|bgTokens.COLOR_BG_WARNING_STRONG`,
	`WARNING|color:#color =|textTokens.COLOR_TEXT_WARNING`,
	`WARNING|---|iconTokens.COLOR_ICON_WARNING`,
	`WARNING|---|chartTokens.COLOR_CHART_KOROMIKO`,
	`WHITE|background:#background-color:#backgroundColor:#bgColor:#bgShade:#bg_color:#fill:|bgTokens.COLOR_BG_DEFAULT`,
	`WHITE|border:#border-color:#border-top:#border-bottom:#border-left:#border-right:#borderColor#trailColor=#strokeColor=#borderTop:#borderBottom:#borderLeft:#borderRight:|borderTokens.COLOR_BORDER_TERTIARY`,
	`WHITE|color:#color =|textTokens.COLOR_TEXT_INVERSE`,
	`WHITE|---|iconTokens.COLOR_ICON_INVERSE`,
	`"Open Sans", sans-serif'|fontFamily|theme.fontFamily.DEFAULT`,
	`'Open Sans', sans-serif|fontFamily|theme.fontFamily.DEFAULT`,
	`"Open Sans"|fontFamily|theme.fontFamily.DEFAULT`,
	`'Open Sans'|fontFamily|theme.fontFamily.DEFAULT`,
	`Open Sans|fontFamily|theme.fontFamily.DEFAULT`,
	`"Roboto"|fontFamily|theme.fontFamily.DEFAULT`,
	`'Roboto'|fontFamily|theme.fontFamily.DEFAULT`,
	`Roboto|fontFamily|theme.fontFamily.DEFAULT`,
	`"Open Sans", sans-serif'|font-family#'"Open Sans", sans-serif'#"Open Sans"#'Open Sans'#Open Sans#"Roboto"#'Roboto'#Roboto|\${theme.fontFamily.DEFAULT}`,
	`'Open Sans', sans-serif|font-family#'"Open Sans", sans-serif'#"Open Sans"#'Open Sans'#Open Sans#"Roboto"#'Roboto'#Roboto|\${theme.fontFamily.DEFAULT}`,
	`"Open Sans"|font-family#'"Open Sans", sans-serif'#"Open Sans"#'Open Sans'#Open Sans#"Roboto"#'Roboto'#Roboto|\${theme.fontFamily.DEFAULT}`,
	`'Open Sans'|font-family#'"Open Sans", sans-serif'#"Open Sans"#'Open Sans'#Open Sans#"Roboto"#'Roboto'#Roboto|\${theme.fontFamily.DEFAULT}`,
	`Open Sans|font-family#'"Open Sans", sans-serif'#"Open Sans"#'Open Sans'#Open Sans#"Roboto"#'Roboto'#Roboto|\${theme.fontFamily.DEFAULT}`,
	`"Roboto"|font-family#'"Open Sans", sans-serif'#"Open Sans"#'Open Sans'#Open Sans#"Roboto"#'Roboto'#Roboto|\${theme.fontFamily.DEFAULT}`,
	`'Roboto'|font-family#'"Open Sans", sans-serif'#"Open Sans"#'Open Sans'#Open Sans#"Roboto"#'Roboto'#Roboto|\${theme.fontFamily.DEFAULT}`,
	`Roboto|font-family#'"Open Sans", sans-serif'#"Open Sans"#'Open Sans'#Open Sans#"Roboto"#'Roboto'#Roboto|\${theme.fontFamily.DEFAULT}`,
	`theme.fontFamily.H1|theme.fontFamily.H1|theme.fontFamily.DEFAULT`,
	`theme.fontFamily.H2|theme.fontFamily.H2|theme.fontFamily.DEFAULT`,
	`theme.fontFamily.H3|theme.fontFamily.H3|theme.fontFamily.DEFAULT`,
	`theme.fontFamily.TEXT|theme.fontFamily.TEXT|theme.fontFamily.DEFAULT`,
	`theme.fontFamily.SMALLTEXT|theme.fontFamily.SMALLTEXT|theme.fontFamily.DEFAULT`,
	`theme.fontFamily.LABEL|theme.fontFamily.LABEL|theme.fontFamily.DEFAULT`,
	`theme.fontFamily.BIG_NUM|theme.fontFamily.BIG_NUM|theme.fontFamily.DEFAULT`,
	`theme.fontFamily.MEDIUM_NUM|theme.fontFamily.MEDIUM_NUM|theme.fontFamily.DEFAULT`,
	`theme.fontFamily.SMALL_NUM|theme.fontFamily.SMALL_NUM|theme.fontFamily.DEFAULT`
];

const obj = mappingColors.map((o) => {
	const oneOnOneColorsMapping = o.split('|');

	const [themeName, findText, tokenName] = oneOnOneColorsMapping;

	return {
		themeName,
		findText,
		tokenName
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

const filePath = './colorsOveridden.json';

writeObjectToFile(filePath, obj);
