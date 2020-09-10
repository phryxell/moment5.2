# Moment 2

Upprepade uppgifter, som att kompilera SASS till CSS, sammanfoga och minifiera CSS- och Javascript-kod, komprimera bilder, 
transpilera ES6 till ES5-webbläsarkompatibel kod och distribuera produktionsklara filer, tar mycket av utvecklarens tid.
Syftet med att automatisera, bland annat ovan nämda processer, är att effektivisera arbetstiden och underlätta för utvecklaren.

### Dev-dependencies för repot:

 - _gulp-sass_ (npm install node-sass gulp-sass --save-dev) ger användaren möjlighet att skriva SCSS genom SASS och minifiera koden samt kompilera detta till CSS.
 
 - _gulp-autoprefixer_ - Lägger till webbläsarspecifika CSS-prefix.

 - _gulp-sourcemaps_ (krävs ingen "egen" inställning) ger användaren möjlighet att "spåra" från vilken källkodsfil koden ursprungligen kommer ifrån.

 - _gulp-browsersync_ (npm install browser-sync gulp --save-dev) fungerar som en livereload där användaren ser förändringar direkt i webbläsare under arbetsprocessen.

 - _gulp-imagemin_ (npm install --save-dev gulp-imagemin) hjälper användaren att komprimera bilder.

 - _gulp-terser_ (npm install gulp-terser --save-dev) minifierar es6+ kod.

 - _gulp-concat_ (npm install --save-dev gulp-concat) Konkatenerar källkodsfiler till gemensam fil för publicering.


Systemet är uppbyggt att oberoende sass-fil som läggs till så hamnar dessa i en styles.css-fil i mappen för publicering.
All JavaScript-kod hamnar i main.js på samma vis. 
Bilder som läggs till i arbetsfilen komprimeras automatiskt för publiceringsmappen.
HTML-filer förs automatiskt över till publiceringsmappen. I arbetsläge skrivs "gulp" i terminalen, detta medför att
alla funktioner initieras och exekveras samt öppnas en liveserver
där användaren kan se förändringar i realtid. Vid inspekteraläget i konsollen kan användaren
se från vilken källkodsfil respektive kod kommer ifrån.

De funktioner (tasks) som ingår är konkatenering och minifiering av SCSS- samt JS-kod (kompilering för SCSS till CSS), 
komprimering av bilder, möjlighet att se från vilken källkodsfil koden ursprungligen kommer ifrån samt
automatiskt överföring av arbetsfiler till publiceringsmapp.

#### Steg för steg:

```
 - Klona projektet genom **$ git clone https://github.com/phryxell/moment2.git**
 - Dirigera in i arbetsmappen moment2 **$ cd  moment2**
 - Installera alla nödvändiga moduler **$ npm install**
 - Initiera gulpjs i terminalen genom **$ gulp**
 ```
