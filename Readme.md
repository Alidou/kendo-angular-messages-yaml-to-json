# Description
This package converts the YAML files present in the package @progress/kendo-angular-messages and converts them to JSON files.

# Message Transalation Service
Using the NgxTranslateMessageService, the json values can be read by ngx-translate to provide dynamic translations of the kendo components.

See https://www.telerik.com/kendo-angular-ui/components/globalization/localization/messages/#toc-implementing-the-custom-service

# Pre-requisite
1. Make sure you have have NodeJS installed
2. Install this package dependencies:
```
npm install
```
# List supported languages

Run command:
```
node extract-translations --supported-languages
```

# Generate language files

Run command:
```
node extract-translations --generate=en-US,fr-BE,nl-BE --results-path=results
```

**The specified languages must be in the list of supported languages.**

The generated files will be inside the ***--results-path*** folder (default: results). <br> 
You can copy and Paste their content in your project.

# List supported kendo components

Run command:
```
node extract-translations --list-components