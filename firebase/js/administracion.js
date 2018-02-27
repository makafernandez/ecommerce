// Inicializar la base de datos
var config = {
  apiKey: 'AIzaSyCA_qTHoFGTVKRvPSAMCajPblhVZJ73Zk0',
  authDomain: 'demoapp-30f5d.firebaseapp.com',
  databaseURL: 'https://demoapp-30f5d.firebaseio.com',
  projectId: 'demoapp-30f5d',
  storageBucket: 'demoapp-30f5d.appspot.com',
  messagingSenderId: '992985819602'
};

firebase.initializeApp(config);
var database = firebase.database();

var referencia = database.ref('productos');

var productos = {};

/*
Evento: value

The value event is used to read a static snapshot of the contents at a given database path,
as they existed at the time of the read event. It is triggered once with the initial data and again every time the data changes.
The event callback is passed a snapshot containing all data at that location, including child data. In our code example above,
value returned all of the blog posts in our app. Everytime a new blog post is added, the callback function will return all of the posts.
*/

referencia.on('value', function(datos) {
  // Eliminamos el contenido del listado para actualizarlo.
  $('#listado div.row').remove();

  productos = datos.val();

  // Recorremos los productos y los mostramos
  $.each(productos, function(indice, valor) {
    var prevProducto = '<div class="row" id="' + indice + '"><div class="col-md-3 cabeceraProducto">';

    prevProducto += '<h2>' + valor.articulo + '</h2></div>';

    prevProducto += '<div class="row"><div class="col-md-3 cabeceraProducto">';
    prevProducto += '<h2>' + valor.precio + '</h2></div>';
    prevProducto += '</div>';

    prevProducto += '<div class="row">';
    prevProducto += '<div class="col-md-3 imagenFix">';
    if (valor.imagen == 'NONE')
      prevProducto += '<img alt="Sin Fotografía"/>';
    else
      prevProducto += '<img src="' + valor.imagen + '"/>';
    prevProducto += '</div>';

    prevProducto += '<div class="col-md-3">';
    prevProducto += '<p>' + valor.descripcion + '</p>';
    prevProducto += '</div>';
    prevProducto += '</div>';

    prevProducto += '<div class="row">';

    prevProducto += '<div class="col-md-3">';
    prevProducto += '<button type="button" class="btn btn-warning" onclick="editarProducto(\'' + indice + '\')">Editar Producto</button>';
    prevProducto += '</div>';

    prevProducto += '<div class="col-md-3">';
    prevProducto += '<button type="button" class="btn btn-danger" onclick="borrarProducto(\'' + indice + '\')">Borrar Producto</button>';
    prevProducto += '</div>';

    prevProducto += '</div>';
    prevProducto += '<div class="row espaciador">';
    prevProducto += '</div>';

    $(prevProducto).appendTo('#listado');
  });
}, function(objetoError) {
  console.log('Error de lectura:' + objetoError.code);
});

function editarProducto(id) {
  // Para pasar el ID a otro proceso lo hacemos a través de window.name
  window.name = id;

  // Cargamos la página editarproducto.html
  location.assign('editarproducto.html');
};

function borrarProducto(id) {
  if (confirm('¿Está seguro/a de que quiere borrar este artículo?') == true) {
    referencia.child(id).remove();
  }
};