import fs from 'node:fs';
import { load } from 'js-yaml';

export function getDirectoryNames(path) {
    const directoryNames = fs.readdirSync(path, { withFileTypes: true })
        .filter(x => x.isDirectory())
        .map(x => x.name);

    return directoryNames;
}

export function getFileNames(path) {
    const fileNames = fs.readdirSync(path, { withFileTypes: true })
        .filter(x => x.isFile())
        .map(x => x.name);

    return fileNames;
}

export function getComponentLanguage(component, ymlFileName) {
    return ymlFileName.replace(component+'.', '').replace('.yml', '');
}

export function yamlFileToJson(path) {
    try {
        const doc = load(fs.readFileSync(path, 'utf8'));
        return doc;
    } catch (e) {
        return null;
    }
}

export function generateJson(pathToKendoMessages, language, componentNames) {
    const json = { kendo: {} };
        
    for(let component of componentNames) {
        json.kendo[component] = {};
        
        let yamlFilePath = `${pathToKendoMessages}\\${component}\\${component}.${language}.yml`;
        let content = yamlFileToJson(yamlFilePath);
        if (content && content.kendo) {
            json.kendo[component] = content.kendo[component];
        }
    }

    return json;
}

export function writeJsonFile(path, language, content) {
    let fileName = `${path}\\${language}.json`;
    fs.writeFileSync(fileName, JSON.stringify(content, null, 4));
}