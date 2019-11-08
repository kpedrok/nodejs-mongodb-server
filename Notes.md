# Structure
- Container
- Row
- Col




# What is class=“mb-0” in Bootstrap 4?
Bootstrap has a wide range of responsive margin and padding utility classes. They work for all breakpoints:
xs (<=576px), sm (>=576px), md (>=768px), lg (>=992px) or xl (>=1200px))
## The classes are used in the format: 
{property}{sides}-{size} for xs & {property}{sides}-{breakpoint}-{size} for sm, md, lg, and xl.

- m - sets margin 
- p - sets padding 
- t - sets margin-top or padding-top 
- b - sets margin-bottom or padding-bottom 
- l - sets margin-left or padding-left 
- r - sets margin-right or padding-right 
- x - sets both padding-left and padding-right or margin-left and margin-right 
- y - sets both padding-top and padding-bottom or margin-top and margin-bottom 
- blank - sets a margin or padding on all 4 sides of the element 
---
- 0 - sets margin or padding to 0 
- 1 - sets margin or padding to .25rem (4px if font-size is 16px) 
- 2 - sets margin or padding to .5rem (8px if font-size is 16px) 
- 3 - sets margin or padding to 1rem (16px if font-size is 16px) 
- 4 - sets margin or padding to 1.5rem (24px if font-size is 16px) 
- 5 - sets margin or padding to 3rem (48px if font-size is 16px) 
- auto - sets margin to auto



## Toolip -> Popover > Modal

## JQuery 
- https://www.w3schools.com/jquery/default.asp
- https://jquery.com/



## convert Scss
add to script "scss": "node-sass -o css/ css/"
npm run scss



## 
paralel fix https://stackoverflow.com/questions/53461626/problem-running-parallelshell-nodejs-script

linux formart
    "watch:scss": "onchange 'css/*.scss' -- npm run scss",
    "watch:all": "parallelshell 'npm run watch:scss' 'npm run lite'"

windows format
    "watch:scss": "onchange \"css/*.scss\" -- npm run scss",
    "watch:all": "parallelshell \"npm run watch:scss\" \"npm run lite\""