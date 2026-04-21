# Configuracion de repositorio
Despues de clonar el repositorio con git clone
<img width="630" height="81" alt="image" src="https://github.com/user-attachments/assets/1f04d0ad-1984-4f7b-8317-1f0401483ea1" />
haces un cd a la carpeta de la pokedex y ahi añadimos el staticwebapp.config.json

probe hacer un frist commit pero no me dejaba habia un error del que no consegui evidencia, pero lo solucione de la siguiente manera

commitizen/cz en el hook de commit.

El bloqueo venía de .husky/prepare-commit-msg, que ejecutaba esto:

```
exec < /dev/tty && node_modules/.bin/cz --hook || true
```
Ese hook te forzaba el flujo “customizado” de mensaje de commit (Commitizen) y en varios casos (por ejemplo git commit -m ... o desde algunas UIs) no dejaba continuar bien.

Cómo lo solucionamos:

Se dejó activo Husky + lint-staged para validar código en pre-commit.
En prepare-commit-msg se agregó esta condición:
```
if [ "$2" = "message" ]; then
  exit 0
fi
```
Con eso, si usaba git commit -m "...", se salta Commitizen y ya no se bloquea el commit.
el problema era el hook “customize” del mensaje, y la solucion que encontre fue permitir un ¨bypass¨ cuando ya mandas el mensaje manualmente.


asi me evite validaciones innecesarias para la cosa tan sencilla que iba a hacer, volviendo al staticwebapp.config.json, lo cree en la carpeta raiz del repo con los encabezados que proporciono el profe ronald

## Encabezados y propósitos
Content-Security-Policy Controla qué recursos puede cargar la app (previene XSS).
Strict-Transport-Security Obliga el uso de HTTPS.
X-Content-Type-Options: nosniff Evita la detección automática de tipos de archivo.
X-Frame-Options: DENY Evita que la app se muestre en iframes externos.
Referrer-Policy: no-referrer Minimiza la fuga de información en cabeceras HTTP.

despues de añadir los headers al json. y validar como se veia el deploy en Azure me di cuenta que no se mostraban las imagenes de los pokemones 

Lo solucionamos corrigiendo rutas de assets que estaban mal en producción.

en environment.prod.ts estaba como
```
imagesPath: '/pokedex-angular/assets/images'
```
y debia estar como 
```
imagesPath: '/assets/images'
```

porque yo saque en un .zip la carpeta pokedex-angular la subi a un repo y hice el git init desde ahi.

entonces con la ruta anterior, en Azure/static hosting buscaba imágenes en una carpeta que no existía y daba 404, por eso no se veían los pokémon.


# Despliegue en Azure

Para desplegar en Azure se necesita una cuenta, hay que entrar a Azure y selecionar el servicio que se quiere

<img width="1366" height="631" alt="image" src="https://github.com/user-attachments/assets/8d87d4ee-db8a-474c-b13b-028f19699430" />

llenas los campos del fomulario y depiglegas con tu cuenta de git, la conectas con azure, selecionas el repositorio la rama

<img width="1366" height="631" alt="image" src="https://github.com/user-attachments/assets/7e505dec-c99c-45d4-9b06-9c12e86ec312" />

le das a revisar y crear y ahi te proporcionara el link.

# Prueba de seguridad y auditoria extra

<img width="1262" height="478" alt="image" src="https://github.com/user-attachments/assets/563b2ab9-89c2-4347-a4a1-530f6cd5ec80" />

<img width="984" height="552" alt="image" src="https://github.com/user-attachments/assets/58966d35-724b-4e66-9491-4a3ab86bc7a8" />




