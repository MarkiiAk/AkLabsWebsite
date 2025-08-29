$(function () {
  $("#contact-form").on("submit", function (event) {
    event.preventDefault(); // prevent reload
    // Please See Documentation for more information. Here I Will  use EmailJS
    var formData = new FormData(this);
    formData.append("service_id", "service_4wgrfv5"); //YOUR_SERVICE_ID
    formData.append("template_id", "template_kmtspqa"); //YOUR_TEMPLATE_ID
    formData.append("user_id", "T3DvtUOlr5Y_9zyjY"); //YOUR_PUBLIC_KEY

    $.ajax("https://api.emailjs.com/api/v1.0/email/send-form", {
      type: "POST",
      data: formData,
      contentType: false, // auto-detection
      processData: false, // no need to parse formData to string
    })
      .done(function () {
        $("#emailjs-response, #emailjs-response_rtl").text(
          "Your Message Send successful!"
        );
        // Clear the form.
        $(
          "#contact-form input,#contact-form textarea,#contact-form_rtl input,#contact-form_rtl textarea"
        ).val("");
      })
      .fail(function (error) {
        $("#emailjs-response, #emailjs-response_rtl").text(
          "Oops! An error occured and your message could not be sent."
        );
      });
  });
});
