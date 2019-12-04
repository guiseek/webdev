# Webdev

### Adicionar configurações do banco nos arquivos de environments

```ts
export const environment = {
  production: false,
  db: {
    name: 'webdev',
    user: 'webdev',
    pass: 'gFi4CL68H6BC7v!'
  }
};

export const getMongoURI = `mongodb://${environment.db.user}:${environment.db.pass}@ds047440.mlab.com:47440/${environment.db.name}`;
```

---

### Adicionar packages relacionados ao MongoDB

```cmd
yarn add @nestjs/mongoose mongoose
```

### Criar lib para autenticação para a API

```cmd
ng generate @nrwl/workspace:library auth --directory=api --no-interactive --dry-run
```