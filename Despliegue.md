# Despliegue

## Requisitos

- Node.js LTS
- `npm`
- repositorio en GitHub
- Azure Static Web Apps conectado al repositorio

## Comandos

Instalar dependencias:

```bash
npm install
```

Probar en local:

```bash
npm start
```

Validar antes de desplegar:

```bash
npm run lint
npm run build
```

Subir cambios:

```bash
git add .
git commit -m "fix: despliegue azure"
git push origin main
```

## Configuración importante

### `angular.json`

La salida de producción es:

```json
"outputPath": "dist/pokedex-angular"
```

Para copiar `staticwebapp.config.json` correctamente se usa:

```json
{
  "glob": "staticwebapp.config.json",
  "input": ".",
  "output": "/"
}
```

### `staticwebapp.config.json`

Se usa para:

- seguridad
- `navigationFallback`
- evitar que Azure reescriba archivos de `/assets`

### `environment.prod.ts`

Para Azure la ruta correcta de imágenes es:

```ts
imagesPath: '/assets/images'
```

No debe usarse:

```ts
imagesPath: '/pokedex-angular/assets/images'
```

porque eso era para GitHub Pages.

## Proceso de despliegue

1. Revisar cambios:

```bash
git status
```

2. Instalar dependencias:

```bash
npm install
```

3. Validar proyecto:

```bash
npm run lint
npm run build
```

4. Confirmar que exista `dist/pokedex-angular`

```bash
ls dist/pokedex-angular
```

5. Subir cambios al repositorio:

```bash
git add .
git commit -m "fix: despliegue azure"
git push origin main
```

6. Esperar el despliegue automático en Azure Static Web Apps.

## Errores y soluciones

### 1. No dejaba hacer commit

Error:

```text
Parsing error: Unexpected character '@'
```

Causa:

- `eslint` estaba intentando leer archivos `.scss`

Solución:

- separar `prettier` y `eslint` en `.lintstagedrc`

### 2. `commitizen` interrumpía `git commit -m`

Causa:

- el hook `prepare-commit-msg` abría el asistente interactivo siempre

Solución:

```sh
if [ "$2" = "message" ]; then
  exit 0
fi
```

### 3. No se podían sincronizar cambios

Error:

```text
ahead 2, behind 1
```

Solución:

```bash
git fetch origin
git rebase origin/main
git push origin main
```

### 4. Error de autenticación al hacer push

Error:

```text
error: unable to read askpass response from '/usr/bin/ksshaskpass'
```

Solución:

```bash
gh auth login
```

o configurar SSH:

```bash
git remote set-url origin git@github.com:AkaMario/PokeDex.git
```

### 5. Las imágenes no cargaban en Azure

Causa:

- rutas de imágenes configuradas para GitHub Pages
- uso de `./assets/...` en algunos templates

Solución:

- cambiar a `/assets/images` en producción
- usar `assets/images/...` en los templates

### 6. Error con `staticwebapp.config.json`

Error:

```text
The staticwebapp.config.json asset path must start with the project source root.
```

Solución:

- declararlo en `angular.json` con `glob`, `input` y `output`

## Verificación final

Después del despliegue comprobar:

- la app abre correctamente
- las imágenes cargan
- las rutas `/`, `/about` y `/pokemon/1` funcionan
- no hay errores 404 en `/assets/...`
- no hay errores en la consola del navegador

