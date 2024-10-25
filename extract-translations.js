import path from 'path';
import { fileURLToPath } from 'url';
import { Command } from 'commander';
import { generateJson, getComponentLanguage, getDirectoryNames, getFileNames, writeJsonFile } from './utils.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const commander = new Command();

commander
    .version('1.1.0', '-v, --version')
    .option('-g, --generate <string>', 'Comma separated list of languages')
    .option('-l, --supported-languages', 'List the supported languages')
    .option('-c, --list-components', 'List all the kendo components')
    .option('-r, --results-path', 'The path where the json translation files will be generated', 'results')
    .parse(process.argv);

const options = commander.opts();

const pathToKendoMessages = __dirname + '\\node_modules\\@progress\\kendo-angular-messages\\messages';

if (options.listComponents) {

    var kendoComponentNames = getDirectoryNames(pathToKendoMessages);
    kendoComponentNames.forEach(componentName => console.log(componentName));

} else if (options.supportedLanguages) {
    var supportedLanguages = new Set();

    var kendoComponentNames = getDirectoryNames(pathToKendoMessages);
    
    kendoComponentNames.forEach(componentName => {
        var ymlFileNames = getFileNames(pathToKendoMessages+'\\'+componentName);
        ymlFileNames.forEach(ymlFileName => {
            var supportedLanguage = getComponentLanguage(componentName, ymlFileName);
            supportedLanguages.add(supportedLanguage);
        });
    });
    
    supportedLanguages.forEach(supportedLanguage => console.log(supportedLanguage));
} else if (options.generate) {
    const languages = (options.generate || '').split(',');
    const kendoComponentNames = getDirectoryNames(pathToKendoMessages);
    const results = [];
    
    for (let language of languages) {
        const json = generateJson(pathToKendoMessages, language, kendoComponentNames);
        results.push({
            language,
            json
        });
    }

    results.forEach(result => writeJsonFile(options.resultsPath, result.language, result.json));

    console.log(`${results.length} files generated in folder ${options.resultsPath}`);
}