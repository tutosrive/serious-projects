# Rutas permitidas:

- [x] `/person/`: Genera datos de sólo una persona
- [x] `/person/{count}/{locale}`: Genera cierta cantidad de datos (según **count**) de personas, con la particularidad que dichos datos varían según el `locale`
  - `locale` debe estar en formato:
    - [x] `es-ES`: Para español **España**
    - [x] `es-MX`: Para español **México**
  - `locale` no puede tener otro formato, siempre debe ser de **5** caracteres
  - Ver [`locale` permitidos](https://github.com/DiUS/java-faker/tree/master?tab=readme-ov-file#supported-locales)
- [x] `/person/{locale}/{min-max}/{count}`: Genera cierta cantidad de datos (según **count**) de personas, con la particularidad que dichos datos varían según el `locale`, además de definir un rango de edad para todas las personas que se generen