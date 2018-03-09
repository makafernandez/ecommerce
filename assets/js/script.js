(function($) {
  var app = $.sammy('#main', function() {
    // Todos los productos
    this.get('#/', function(context) {
      $.ajax({
        url: 'https://api.mercadolibre.com/sites/MLC/search?',
        data: {
          q: 'gadgets',
          limit: '48'
        },
        dataType: 'json',
        
        success: function(response) {
          context.log('the page was loaded', response);
          let items = response.results;
          // Grab the template script:
          const source = $('#allproducts-template').html();
          // Compile the template:
          const template = Handlebars.compile(source);
          // Pass our data to the template:
          let html = template(items);
          // Add the compiled html to the page:
          $('#main').html(html);
        }
      });
    });

    // Buscador: 
    let keyword = '';
    $('#searchBtn').click(function() {
      keyword = $('#searchText').val();
      console.log(keyword);
      window.location.href = '#/search-results';
    });

    this.get('#/search-results', function(context) {
      $.ajax({
        url: 'https://api.mercadolibre.com/sites/MLC/search?',
        data: {
          q: `${keyword}`,
          limit: '48'
        },
        dataType: 'json',

        success: function(response) {
          context.log('the page was loaded', response);
          let items = response.results;
          context.log(items);

          // Grab the template script:
          const source = $('#search-template').html();
          // Compile the template:
          const template = Handlebars.compile(source);
          // Pass our data to the template:
          let html = template(context);
          // Add the compiled html to the page:
          $('#main').html(html);
        }
      });
    });

    $(function() {
      app.run('#/');
    });

    /* Define our data object
    let context = '';
    $.get(`https://api.mercadolibre.com/sites/MLC/search?q=${keyword}`, function(data) {
      context = data.results;
      console.log(context);
      // Pass our data to the template:
      let html = template(context);

      // Add the compiled html to the page:
      $('#main').html(html);
      // Manually trigger a hashchange to start the app.
      $(window).trigger('hashchange');
    }); */
  });
})(jQuery);

// Vista Detalle Producto:
$('.productPage').click(function() {
  let id = $(this).attr('id');
  console.log('id');
});

/* // SEARCH RESULTS:
$('#searchBtn').click(function() {
  let keyword = $('#searchText').val();
  console.log(keyword);
  $(function(keyword) {
    // Grab the template script:
    const source = $('#search-template').html();
    // Compile the template:
    const template = Handlebars.compile(source);

    // Define our data object
    let context = '';
    $.get(`https://api.mercadolibre.com/sites/MLC/search?q=${keyword}`, function(data) {
      context = data.results;
      console.log(context);

      // Pass our data to the template:
      let html = template(context);

      // Add the compiled html to the page:
      $('#main').html(html);

      // Manually trigger a hashchange to start the app.
      $(window).trigger('hashchange');
    });
  });
}); */

/* // VISTA PRODUCTO:
function getProductDetail(productID) {
  // Grab the template script:
  const source = $('#product-template').html();
  // Compile the template:
  const template = Handlebars.compile(source);

  // Define our data object
  let context = '';
  $.get(`https://api.mercadolibre.com/items/${productID}`, function(data) {
    context = data.results;
    console.log(context);

    // Pass our data to the template:
    let html = template(context);

    // Add the compiled html to the page:
    $('#main').html(html);

    // Manually trigger a hashchange to start the app.
    $(window).trigger('hashchange');
  });
} */