#Setup guide for a newbie

:warning: This guide might only work for the Windows platform
:warning: Tested in Visual Studio 2015 and Atom

#Visual Studio

Install the following packages/extensions in vs2015

* https://vlasovstudio.com/fix-file-encoding/
* http://vswebessentials.com/
* https://github.com/madskristensen/WebCompiler

#Atom

Install the following packages in Atom

* autocomplete-paths@1.0.2
* autocomplete-php@0.3.7
* bottom-dock@0.3.7
* color-picker@2.1.0
* file-icons@1.6.14
* gulp-manager@0.2.18
* language-diff@0.4.0
* language-nunjucks@2.0.0
* linter@1.11.3
* pigments@0.20.0

or do the following command

1. Copy package-list.txt
2. In windows explorer go to %UserProfile%
3. Paste it in this directory
4. Execute the command below:
```
  apm install --packages-file package-list.txt
```

Note: you can also export your own list of atom packages using:
```
  apm list --installed --bare > package-list.txt
```

#Wamp Server

Install WAMP Server

Go to wamp www folder

Type in cmd with administrative privileges

```cmd
  mklink writiely /d "path-to-the-folder-of-writiely"
```

#Dependencies

* Install node js globally

#Npm Packages

From the root of the project folder launch a cmd.exe and run the following tasks:

:information_source: Use --verbose at the end of these commands to see the output of terminal

If gulp is to be installed globally
```terminal
    npm install --global gulp
```
If locally in your project devDependencies
```terminal
    npm install --save-dev gulp
```
Install these packages in order one by one
```terminal
    npm install --save-dev gulp-bower
    npm install --save-dev gulp-concat
    npm install --save-dev karma
    npm install --save-dev gulp-karma
    npm install --save-dev gulp-nunjucks-render
    npm install --save-dev run-sequence
    npm install --save-dev gulp-sass
    npm install --save-dev gulp-minifier
    npm install --save-dev gulp-ext-replace
    npm install --save-dev gulp-rimraf
```
or with verbose...
```terminal
    npm install --save-dev gulp-bower --verbose
    npm install --save-dev gulp-concat --verbose
    npm install --save-dev karma --verbose
    npm install --save-dev gulp-karma --verbose
    npm install --save-dev gulp-nunjucks-render --verbose
    npm install --save-dev run-sequence --verbose
    npm install --save-dev gulp-sass --verbose   
    npm install --save-dev gulp-minifier --verbose
    npm install --save-dev gulp-ext-replace --verbose
    npm install --save-dev gulp-rimraf --verbose
```
