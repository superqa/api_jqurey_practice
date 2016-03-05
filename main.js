$( document ).ready(function() {
    console.log("The document is ready!");

    $(".get-data").click(getData);
    $(".add-request-data").click(toggleTextarea);

    function toggleTextarea () {
      $(".request-data").toggle();
    }

    function getData () {
      var url = $(".api-input").val();
      var action = $(".action").val();

      if (!url || url.indexOf("http") === -1) {
        $(".notice").text("Please provide a valid input");
        $(".notice").fadeIn().fadeOut(6000);
        return;
      }
      $(".result").show();

      $.ajax({
        url: url,
        action: action,
        success: displayData,
        error: handleError
      });
    }

    function displayData (data) {
      var users = data.users ? data.users : data.user;

      console.log("printing id ", users);
      var results = $(".result");
      var $ul = $("<ul></ul>");

      if (users._id) {
        console.log("getting here ...")
        $ul.append("<li>" + users.email + "id =>" + users._id.toString() + "</li>");
      } else {
        users.forEach(function (user) {
          $ul.append("<li>" + user.email + "id =>" + user._id.toString() + "</li>");
        });
      }

      results.empty();
      results.append($ul);

    }
    function handleError (data) {
      $(".result").empty();
      $(".notice").text(JSON.parse(data.responseText).message);
      $(".notice").fadeIn().fadeOut(6000);
    }
});
