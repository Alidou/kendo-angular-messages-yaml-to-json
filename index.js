const fs = require('fs');
const yaml = require('js-yaml');
const basePath = __dirname + '\\node_modules\\@progress\\kendo-angular-messages\\messages';
const allModules = fs.readdirSync(basePath, { withFileTypes: true })
    .filter(x => x.isDirectory())
    .map(x => x.name);

const languages = [
    'en-US',
    'fr-BE',
    'nl-BE'
];

const results = extractKendoComponentsTranslationsForLanguages(allModules, languages);
writeJsonFiles(results, languages);

function extractKendoComponentsTranslationsForLanguages(components, languages) {
    let results = {};
    for (let language of languages) {
        results[language] = { kendo: {} };
        let result = extractKendoComponentsTranslationsForLanguage(components, language);
        if (result) {
            results[language] = { kendo: result };
        }
    }
    return results;
}

function extractKendoComponentsTranslationsForLanguage(components, language) {
    let results = {};
    for(let component of components) {
        let content = extractKendoComponentTranslationsForLanguage(component, language);
        if (content) {
            results[component] = content[component];
        }
    }
    return results;
}

function extractKendoComponentTranslationsForLanguage(component, language) {
    let yamlFileName = `${component}.${language}.yml`;
    let path = `${basePath}\\${component}\\${yamlFileName}`;
    let content = convertYamlFileToJsonObject(path);
    content = content ? content.kendo : null;
    return content;
}


function convertYamlFileToJsonObject(path) {
    try {
        const doc = yaml.load(fs.readFileSync(path, 'utf8'));
        return doc;
    } catch (e) {
        return null;
    }
}

function writeJsonFiles(results, languages) {
    for(let language of languages) {
        let result = results[language];
        writeJsonFile(language, result);
    }
}

function writeJsonFile(language, result) {
    let fileName = `results\\${language}.json`;
    fs.writeFileSync(fileName, JSON.stringify(result, null, 4));
}