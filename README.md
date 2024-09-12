
# Restaurante


**Restaurante** es una aplicación de gestión de pedidos diseñada para facilitar la administración de pedidos en restaurantes, permitiendo a los administradores registrar, modificar y eliminar pedidos de manera eficiente. De momento los pedidos se almacenan de forma local en el navegador.

## Características
- **Registro de pedido**: Permite registrar el pedido con el nombre del cliente.
- **Agregar producto**: Permite agregar productos al pedido.
- **Eliminar producto**: Los productos del pedido se pueden eliminar.
- **Incrementar y Decrementar cantidad**: Permite aumentar y disminuir la cantidad del producto que estan en el pedido.
- **Calcula el total**: Calcula el total a pagar del pedido.
- **Validación**: Comprueba que no se introduzcan datos vacíos al crear una pedido.
- **Persistencia de datos**: Los pedidos se guardan en el almacenamiento local, manteniéndolas disponibles entre sesiones.
- **Imprimir ticket**: Imprime ticket con los detalles del pedido.


## Demo

![]('')
![]('')


## 🛠 Tecnologías
- **Angular**: Versión 18
- **SCSS**: Para el diseño y los estilos de la aplicación


## Instalación

Para ejecutar la aplicación localmente, siga estos pasos:

1. Clona el repositorio:
```bash
git clone https://github.com/puriihuaman/restaurante
```
2. Navegue hasta el directorio del proyecto:
```bash
cd restaurante
```
3. Instale las dependencias:
```bash
npm install
```
4. Inicie el servidor de desarrollo:
```golpecito
ng serve
```
5. Abra su navegador y vaya a http://localhost:4200.
## Variables de entorno

Para ejecutar este proyecto, asegúrate de agregar las siguientes variables de entorno en tu configuración:

- `storageName`: Nombre utilizado para almacenar los datos en el almacenamiento local.


## Uso

- **Agregar cliente**: Ingrese el nombre del cliente y haga clic en "Crear pedido".
- **Seleccione un cliente**: Seleccione un pedido(cliente) para agregar productos que el cliente elija.
- **Aumentar cantidad**: Incremente la cantidad del producto si el cliente desea más de un producto.
- **Realizar cobro**: Efectúe el cobro del pedido.
- **Imprimir ticket**: Para imprimir un ticket haga clic en "Imprimir".

## Contribución

¡Las contribuciones son bienvenidas! Si deseas colaborar, siéntete libre de hacer un fork del repositorio y enviar un pull request. No dudes en compartir tus ideas y mejoras.

## Contacto

Para más información, puedes ponerte en contacto conmigo a través de https://www.linkedin.com/in/puriihuaman/.

