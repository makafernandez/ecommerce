(function($) {
  var app = $.sammy('#main', function() {
    // VISTA HOME
    this.get('#/', function(context) {
      $.ajax({
        url: 'https://api.mercadolibre.com/sites/MLC/search?',
        data: {
          q: 'hogar',
          condition: 'new',
          limit: '48'
        },
        dataType: 'json',
        
        success: function(response) {
          context.log('the page was loaded', response);
          app.items = response.results;
          // Grab the template script:
          const source = $('#home').html();
          // Compile the template:
          const template = Handlebars.compile(source);
          // Pass our data to the template:
          let html = template(app.items);
          // Add the compiled html to the page:
          $('#main').html(html);
        }
      });
    });

    // VISTA CATEGORIA
    this.get('#/category/:id', function(context) {
      app.item = this.params['id'];
      $.ajax({
        url: 'https://api.mercadolibre.com/sites/MLC/search?',
        data: {
          q: `${app.item}`,
          limit: '48'
        },
        dataType: 'json',
        
        success: function(response) {
          context.log('the page was loaded', response);
          let items = response;
          // Grab the template script:
          const source = $('#category').html();
          // Compile the template:
          const template = Handlebars.compile(source);
          // Pass our data to the template:
          let html = template(items);
          // Add the compiled html to the page:
          $('#main').html(html);
        }
      });
    });

    // VISTA ITEM
    this.get('#/item/:id', function(context) {
      app.item = this.params['id'];
      $.ajax({
        url: `https://api.mercadolibre.com/items/${app.item}`,
        dataType: 'json',

        success: function(response) {
          context.log('the page was loaded', response);
          app.item = response;
          // Grab the template script:
          const source = $('#item').html();
          // Compile the template:
          const template = Handlebars.compile(source);
          // Pass our data to the template:
          let html = template(app.item);
          // Add the compiled html to the page:
          $('#main').html(html);
        }
      });
    });

    // VISTA RESULTADOS DE BÚSQUEDA
    let keyword = '';
    $('#searchBtn').click(function() {
      keyword = $('#searchText').val();
      console.log(keyword);
      location.hash = '/search';
    });  
    this.get('#/search', function(context) {
      app.item = keyword;
      $.ajax({
        url: 'https://api.mercadolibre.com/sites/MLC/search?',
        data: {
          q: app.item,
          condition: 'new',
          limit: '48'
        },
        dataType: 'json',

        success: function(response) {
          context.log('the page was loaded', response);
          $('#searchForm')[0].reset();
          app.items = response.results;
          // Grab the template script:
          const source = $('#search').html();
          // Compile the template:
          const template = Handlebars.compile(source);
          // Pass our data to the template:
          let html = template(app.items);
          // Add the compiled html to the page:
          $('#main').html(html);
        }
      });
    });
  });
  app.run('#/');
})(jQuery);

