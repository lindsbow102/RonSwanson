$(document).ready(function() {
    // Hide empty Quotes div until it is populted with quotes
  $("#quotes").hide();

  // Query URL for ajax calls
  const queryUrl = "https://ron-swanson-quotes.herokuapp.com/v2/quotes/20";

  //Search for long quotes (8 or more words)
  $("#submit-long").on("click", function(e) {
    e.preventDefault();

    $("#quotes").empty();
    $("#quotes").show();

    $.ajax({
      method: "GET",
      url: queryUrl
    }).then(response => {
      console.log(response);
      const ltitle = $(`<h1>Long Quotes.  Click on a quote to rate it!</h1>`);
      const hr = $(`<hr>`);
      $("#quotes").append(ltitle, hr);

      for (let i = 0; i < response.length; i++) {
        const quoteArr = response[i].split(" ");
        if (quoteArr.length >= 8) {
          const longQuote = $(
            `<h3 class="rate" data-quote="quote-${[i]}">${quoteArr.join(
              " "
            )}</h3>`
          );
          $("#quotes").append(longQuote);
        }
      }
    });
  });

  //Search for short quotes (7 words or less)
  $("#submit-short").on("click", function(e) {
    e.preventDefault();

    $("#quotes").empty();
    $("#quotes").show();

    $.ajax({
      method: "GET",
      url: queryUrl
    }).then(response => {
      //console.log(response);

      const stitle = $(`<h1>Short Quotes.  Click on a quote to rate it!</h1>`);
      const hr = $(`<hr>`);
      $("#quotes").append(stitle, hr);

      for (let i = 0; i < response.length; i++) {
        const quoteArr = response[i].split(" ");
        console.log(quoteArr);
        if (quoteArr.length <= 7) {
          const shortQuote = $(
            `<h3 class="rate" data-quote="quote-${[i]}">${quoteArr.join(
              " "
            )}</h3>`
          );

          $("#quotes").append(shortQuote);
        }
      }
    });
  });

  // To rate a quote
  $(document).on("click", ".rate", function() {
    //console.log(this);
    //console.log($(this).text());
    prompt(
      `On a scale of 1 to 5, please rate this quote ... "${$(
        this
      ).text()}"`
    );
  });
});
