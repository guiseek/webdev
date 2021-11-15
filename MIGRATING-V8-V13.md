```sh
gh repo clone webdev
code webdev
npm i
git add .
git commit -m "lock"
npm run update
cp tsconfig.json tsconfig.base.json
nx format
nx -v
nx dep-graph -v
nx serve api
nx serve app
nx serve desktop
nx serve mobile
ng update
10002  nvm use 16.10
git add .
git commit -m "nx workspace update"
ng update
nvm install 16.10
ng update
ng update @angular/cli@9 @angular/core@9
ng update
ng update @angular/cdk@9 @angular/material@9
git add .
git commit -m "cdk material to 9"
ng update
ng update @angular/cli@10 @angular/core@10
npm i typescript@3.8
git add .
git commit -m "typescript"
ng update @angular/cli@10 @angular/core@10
npm i @nestjs/schematics
git add .
git commit -m "nestjs@schematics"
ng update @angular/cli@10 @angular/core@10
npm i @nestjs/core@7 @nestjs/common@7 @nestjs/platform-express@7.0.0 @nestjs/jwt@6.1.2 @nestjs/schematics@7 @nestjs/testing@7 --legacy-peer-deps
nx serve api
git add .
git log
git commit -m "nestjs api to 7"
ng update @angular/cli@10 @angular/core@10
npm i 
npm i typescript@4
git add .
git commit --amend --no-edit --no-verify
ng update @angular/cli@10 @angular/core@10
ng update
npm i
rm package-lock.json
npm i --legacy-peer-deps
npm start
git add .
git commit --amend --no-edit --no-verify
ng update @angular/pwa@0.1001.7
nx serve desktop
nx serve api
git add .
git commit -m "angular pwa to 10, working (Y)"
ng update
ng update @angular/cdk@10 @angular/material@10
git add .
git commit -m "cdk material to 10"
ng update
ng update @angular/cli@11 @angular/core@11
npm i --legacy-peer-deps
ng update @angular/cli@11 @angular/core@11
ng update
ng update @angular/cdk@11 @angular/material@11
nx serve desktop
git add .
git commit -m "cdk material to 11"
ng update
ng update @angular/cli@12 @angular/core@12
npm i --legacy-peer-deps
git add .
git log
git commit --amend --no-edit --no-verify
ng update
ng update @angular/cdk@12 @angular/material@12
nx run-many --target serve --projects=api,desktop --parallel
git add .
git commit -m "core cli to 12"
ng update
ng update @angular/cli @angular/core
npm i --legacy-peer-deps
ng update @angular/cli @angular/core
ng update
ng update @angular/cdk @angular/material
nx run-many --target serve --projects=api,desktop --parallel
nx serve desktop
nx serve desktop --verbose
ng update
nx migrate latest
npm install
nx migrate latest
nx run-many --target serve --projects=api,desktop --parallel
npm i @nrwl/linter -D
nx generate @nrwl/angular:convert-tslint-to-eslint --project=desktop
nx generate @nrwl/angular:convert-tslint-to-eslint --project=mobile
nx run-many --target serve --projects=api,desktop --parallel
git add .
git commit -m "desktop, mobile, api config"
ng generate @nrwl/nest:convert-tslint-to-eslint --project=api
nx serve api
nx lint api
./node_modules/.bin/ngcc
nx generate @nrwl/angular:convert-tslint-to-eslint --project=auth
nx generate @nrwl/angular:convert-tslint-to-eslint --project=feature-shell
nx generate @nrwl/angular:convert-tslint-to-eslint --project=item
nx generate @nrwl/angular:convert-tslint-to-eslint --project=ui
nx generate @nrwl/angular:convert-tslint-to-eslint --project=utils
nx generate @nrwl/nest:convert-tslint-to-eslint --project=api-auth
nx generate @nrwl/nest:convert-tslint-to-eslint --project=api-users
nx generate @nrwl/angular:convert-tslint-to-eslint --project=api-interfaces
nx lint
ng update @angular-eslint/eslint-plugin @angular-eslint/eslint-plugin-template @angular-eslint/template-parser
git add .
git commit -m "eslint config libs"
ng update @angular-eslint/eslint-plugin @angular-eslint/eslint-plugin-template @angular-eslint/template-parser
nx lint
```