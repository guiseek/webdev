## Autenticação

```cmd
yarn add @nestjs/passport passport passport-local
yarn add @types/passport-local -D
```

## Criar lib de autenticação para a API

```cmd
ng generate @nrwl/workspace:library auth --directory=api --no-interactive --dry-run
```

## Renomear arquivo barrel

```ts
de `api-auth.ts` para `api-auth.module.ts`

// código
import { Module } from '@nestjs/common';

@Module({
  providers: [],
  exports: [],
})
export class ApiAuthModule {}
```

## Criar auth service

- name: `auth`
- language: `ts`
- path: `src/lib`
- sourceRoot: `libs/api/auth`

```ts
ng generate @nestjs/schematics:service auth --language=ts --path=src/lib --sourceRoot=libs/api/auth --no-interactive --dry-run
```

## Criar lib para usuários

```ts
ng generate @nrwl/workspace:library users --directory=api --no-interactive --dry-run
```

## Renomear arquivo barrel

```ts
de `api-users.ts` para `api-users.module.ts`

// código
import { Module } from '@nestjs/common';

@Module({
  providers: [],
  exports: [],
})
export class ApiUsersModule {}
```

## Criar users service

- name: `users`
- language: `ts`
- path: `src/lib`
- sourceRoot: `libs/api/users`

```ts
ng generate @nestjs/schematics:service users --language=ts --path=src/lib --sourceRoot=libs/api/users --no-interactive --dry-run
```

## users.service

```ts
import { Injectable } from '@nestjs/common';

export type User = any;

@Injectable()
export class UsersService {
  private readonly users: User[];

  constructor() {
    this.users = [
      {
        userId: 1,
        username: 'john',
        password: 'changeme'
      },
      {
        userId: 2,
        username: 'chris',
        password: 'secret'
      },
      {
        userId: 3,
        username: 'maria',
        password: 'guess'
      }
    ];
  }

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find(user => user.username === username);
  }
}
```

## auth.service

```ts
import { Injectable } from '@nestjs/common';
import { UsersService } from '@webdev/api/users';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}
  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }
}
```

## Adicionar módulo de users ao módulo auth

```ts
@Module({
  imports: [ApiUsersModule, PassportModule],
  providers: [AuthService, LocalStrategy],
  exports: []
})
export class ApiAuthModule {}
```

## Criar `auth/local.strategy.ts`

```ts
import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super();
  }

  async validate(username: string, password: string): Promise<any> {
    const user = await this.authService.validateUser(username, password);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
```

## Importar ApiAuthModule no AppModule

```ts
@Module({
  imports: [ApiAuthModule],
  controllers: [AppController],
  providers: [AppService],
})
```

## Criar rota de login no AppController

```ts
  @UseGuards(AuthGuard('local'))
  @Post('auth/login')
  async login(@Request() req) {
    return req.user;
  }
```

## Testar

```cmd
curl -X POST http://localhost:3333/api/auth/login -d '{"username": "john", "password": "changeme"}' -H "Content-Type: application/json"
{"userId":1,"username":"john"}
```

---

# Adicionar JWT

## Add

```ts
yarn add @nestjs/jwt passport-jwt
yarn add @types/passport-jwt -D
```

## Criar `auth/constants.ts`

```ts
// Código
export const jwtConstants = {
  secret: 'secretKey'
};
```

## Importar JwtModule

Vamos importar o JwtModule com suas respectivas configurações e exportar o AuthService, para uso no AppController

```ts
@Module({
  imports: [
    ApiUsersModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' }
    })
  ],
  providers: [AuthService, LocalStrategy],
  exports: [AuthService]
})
export class ApiAuthModule {}
```

## Adicionar `auth.service` no arquivo barrel (`index.ts`) da lib

```ts
export * from './lib/auth/auth.service';
```

## Injetar AuthService no AppController

```ts
@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly authService: AuthService
  ) {}

  @UseGuards(AuthGuard('local'))
  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
    // return req.user;
  }
  // ...
}
```

## Testando... alô, um, dois, três...

```sh
# Request
curl -X POST http://localhost:3333/api/auth/login -d '{"username": "john123", "password": "changeme"}' -H "Content-Type: application/json"

# Response
{"statusCode":401,"error":"Unauthorized"}

---

# Request
curl -X POST http://localhost:3333/api/auth/login -d '{"username": "john", "password": "changeme"}' -H "Content-Type: application/json"

# Response
{"access_token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImpvaG4iLCJzdWIiOjEsImlhdCI6MTU3NTQ1NTA3OCwiZXhwIjoxNTc1NDU1MTM4fQ.MNZxrcyZFjrgka8zKEtf8IA-aO3rDsJCNJVBpPqCU3g"}
```

## Criar `jwt.strategy.ts`

```ts
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { jwtConstants } from '../constants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret
    });
  }

  async validate(payload: any) {
    return { userId: payload.sub, username: payload.username };
  }
}
```

## Adicionar JwtStrategy como provider

```ts
// api-auth.module.ts
// ...
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy
  ],
// ...
```

## Criar rota para recuperar usuário logado

```ts
// app.controller.ts
// ...
  @UseGuards(AuthGuard('jwt'))
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
// ...
```

## Testando

```sh
# Request
curl http://localhost:3333/api/profile

# Response
{"statusCode":401,"error":"Unauthorized"}
```

## Criar auth service

```sh
# Request
curl -X POST http://localhost:3333/api/auth/login -d '{"username": "john", "password": "changeme"}' -H "Content-Type: application/json"

# Response
{"access_token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImpvaG4iLCJzdWIiOjEsImlhdCI6MTU3NTQ1NTY1NywiZXhwIjoxNTc1NDU1NzE3fQ.ESXRSPbxK1eTrSGTRSvkpBN5FLx7czuj0HLrD0s06U8"}

# Request
curl http://localhost:3000/profile -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImpvaG4iLCJzdWIiOjEsImlhdCI6MTU3NTQ1NTY1NywiZXhwIjoxNTc1NDU1NzE3fQ.ESXRSPbxK1eTrSGTRSvkpBN5FLx7czuj0HLrD0s06U8"

# Response
{"userId":1,"username":"john"}
```

## Registrar jwt como estratégia padrão

```ts
// api-auth.module.ts
// ...
PassportModule.register({ defaultStrategy: 'jwt' }),
// ...
```

---

# Criar usuário

## Class validator para uso na DTO (Data Transfer Object)

```sh
yarn add class-validator
```

## Class transformer validação

```sh
yarn add class-transformer
```

## DTO

```ts
// dtos/create-user.dto.ts
import { IsEmail, IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(12)
  username: string;

  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(12)
  password: string;
}
```

## Users Controller

- name: `users`
- language: `ts`
- path: `src/lib`
- sourceRoot: `libs/api/users`

```sh
ng generate @nestjs/schematics:controller users --language=ts --path=src/lib --sourceRoot=libs/api/users --no-interactive --dry-run
```

## Users Controller

```ts
import { Controller, Post, Body } from '@nestjs/common';
import { CreateUserDto } from '../dtos/create-user.dto';

@Controller('users')
export class UsersController {
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }
}
```

## Adicionar validação como global

```ts
// main.ts

// ...
app.useGlobalPipes(new ValidationPipe());
// ...
```

## Testando

```sh
# Request
curl -X POST http://localhost:3333/api/users -d '' -H "Content-Type: application/json"

# Response
{
  "statusCode": 400,
  "error": "Bad Request",
  "message": [
    {
      "target": {},
      "property": "email",
      "children": [],
      "constraints": {
        "isEmail": "email must be an email"
      }
    },
    {
      "target": {},
      "property": "username",
      "children": [],
      "constraints": {
        "maxLength": "username must be shorter than or equal to 12 characters",
        "minLength": "username must be longer than or equal to 6 characters",
        "isNotEmpty": "username should not be empty"
      }
    },
    {
      "target": {},
      "property": "password",
      "children": [],
      "constraints": {
        "maxLength": "password must be shorter than or equal to 12 characters",
        "minLength": "password must be longer than or equal to 6 characters",
        "isNotEmpty": "password should not be empty"
      }
    }
  ]
}
```



FRONT

Adicionar RouterModule no app.module

rouetr-outlet

```sh
ng generate @nrwl/angular:library auth --parentModule=apps/desktop/src/app/app.module.ts --routing --style=scss
```

```sh
ng generate @schematics/angular:component login --project=auth --style=scss --no-interactive --dry-run
```

UTILS

```sh
ng generate @nrwl/workspace:library utils
```

```sh
ng generate @nrwl/angular:library ui --prefix=ui --style=scss --no-interactive --dry-run
```

```sh
ng generate @schematics/angular:component confirm-dialog --project=ui --entryComponent --export --skipTests --style=scss --no-interactive --dry-run
```

---

## *Adicionar o `UiModule` ao ItemModule*

---

# Decorators

## Confirmação

```ts
import { Injector } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '@webdev/ui';

/**
 *
 * @param message
 */
export function Confirm(message: string) {
  /**
   * @param target é a classe, no nosso claso o componente ListaComponent
   * @param key é o método qual o decorator está interceptando
   * @param descriptor pode ser usado para observar, modificar ou substituir as definições de um acessador
  */
  return function (target: Object, key: string | symbol, descriptor: PropertyDescriptor) {
    const original = descriptor.value;

    const injector = Injector.create({ providers: [{ provide: MatDialog, deps: [] }] });
    const dialog: MatDialog = injector.get(MatDialog);

    descriptor.value = function (...args: any[]) {

      const ref = this.dialog.open(ConfirmDialogComponent, {
        data: message.replace('{item}', args[1].nome)
      })
      ref.afterClosed().subscribe(
        (result) => {
          if (result) return original.apply(this, args)
          return null
        }
      )
    };

    return descriptor;
  };
}
```

## Vamos ver um exemplo de acessadores

Vamos criar um decorator que adiciona uma taxa a um valor total, pra isso vamos adicionar a propriedade `preco` a interface `Item`.
Agora adicionamos o campo `preco` ao form, e no html.

## Decorator

```ts
export function ComTaxa(rate: number) {
  return function (target: any, key: string, descriptor: PropertyDescriptor) {
    const original = descriptor.get;

    descriptor.get = function () {
      const result = original.apply(this);
      return (result * (1 + rate)).toFixed(2);
    };

    return descriptor;
  };
}
```


## E usamos no componente `ListaComponent`

```ts
@ComTaxa(0.15)
get total() {
  return this.lista.reduce((prev, cur) => (prev + cur.preco), 0)
}
```

## Guards
```ts
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router
  ) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const logged = !!localStorage.getItem('access_token');
    if (!logged) {
      this.router.navigateByUrl('/auth');
    }
    return logged;
  }

}
```

## Interceptor
```ts
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Injectable, NgModule } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class HttpsRequestInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    const dupReq = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${localStorage.getItem('access_token')}`),
    });
    return next.handle(dupReq).pipe(
      tap((ev: HttpEvent<any>) => {
        if (ev instanceof HttpResponse) {
          console.log('tratando respostas', ev);
        }
        if (ev instanceof HttpErrorResponse) {
          console.log('tratando erros', ev);
          // router
        }
      })
    )
  }
}

@NgModule({
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpsRequestInterceptor,
      multi: true,
    },
  ],
})

export class Interceptor { }
```

### Adicionar no módulo `Auth`

### Shell
```sh
ng generate @nrwl/angular:library feature/shell --lazy --parentModule=apps/desktop/src/app/app.module.ts --routing --no-interactive --dry-run
```
---

# Angular CLI
O Angular CLI é muito poderoso!

Servindo o app junto com a API em 1 comando.

## Serve with api
```ts
// angular.json

// ...
,
        "serve-with-api": {
          "builder": "@angular-devkit/architect:allOf",
          "options": {
            "targets": [
              {
                "target": "desktop:serve"
              },
              {
                "target": "api:serve"
              }
            ]
          }
        },
        "extract-i18n": {
// ...
```

```ts
// package.json
"desk-api": "ng run desktop:serve-with-api",
```


---

# PWA - Progressive Web App

```sh
ng add @angular/pwa --project mobile
```

## Ações
```sh
// Output
success Saved lockfile.
success Saved 3 new dependencies.
info Direct dependencies
└─ @angular/pwa@0.803.20
info All dependencies
├─ @angular/pwa@0.803.20
├─ parse5-html-rewriting-stream@5.1.0
└─ parse5-sax-parser@5.1.1
✨  Done in 15.53s.
Installed packages for tooling via yarn.
CREATE apps/mobile/ngsw-config.json (624 bytes)
CREATE apps/mobile/src/manifest.webmanifest (1069 bytes)
CREATE apps/mobile/src/assets/icons/icon-128x128.png (1253 bytes)
CREATE apps/mobile/src/assets/icons/icon-144x144.png (1394 bytes)
CREATE apps/mobile/src/assets/icons/icon-152x152.png (1427 bytes)
CREATE apps/mobile/src/assets/icons/icon-192x192.png (1790 bytes)
CREATE apps/mobile/src/assets/icons/icon-384x384.png (3557 bytes)
CREATE apps/mobile/src/assets/icons/icon-512x512.png (5008 bytes)
CREATE apps/mobile/src/assets/icons/icon-72x72.png (792 bytes)
CREATE apps/mobile/src/assets/icons/icon-96x96.png (958 bytes)
UPDATE angular.json (16698 bytes)
UPDATE package.json (2709 bytes)
UPDATE apps/mobile/src/app/app.module.ts (733 bytes)
UPDATE apps/mobile/src/index.html (504 bytes)
```


## Adicionar Material no App Mobile

```scss
// styles.scss

/* You can add global styles to this file, and also import other style files */
@import '@angular/material/prebuilt-themes/deeppurple-amber.css';
@import '~@angular/material/theming';

html, body {
    height: 100%;
    font-family: Roboto;
}
```

## Adicionar static material no index.html
```html
<link href="https://fonts.googleapis.com/css?family=Roboto:300,400,500" rel="stylesheet">
<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">

```

# Build prod do mobile

e...

```sh
http-server dist/apps/mobile -p 80
```

<img src="pwa-install.png"/>>

<!--
## Criar lib de autenticação para a API
```cmd
ng generate @nrwl/workspace:library auth --directory=api --no-interactive --dry-run
```
 -->
