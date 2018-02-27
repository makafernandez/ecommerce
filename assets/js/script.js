$(document).ready(() => {
  // Incializa componentes de Bootstrap:
  $('.carousel').carousel(); // --> Carousel
});

// PAGE HOME
$(function home() {
  // Grab the template script:
  const source = $('#home-template').html();
  // Compile the template:
  const template = Handlebars.compile(source);

  // Define our data object
  let context = '';
  $.get('https://api.mercadolibre.com/sites/MLC/search?q=smartphone', function(data) {
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

// SEARCH RESULTS:
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
});