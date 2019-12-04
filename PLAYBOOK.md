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

<!--
## Criar lib de autenticação para a API
```cmd
ng generate @nrwl/workspace:library auth --directory=api --no-interactive --dry-run
```
 -->
