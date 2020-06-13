$(function(){
  // Getting location data from server by sending coordinates
  let options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
  };

  function success(pos) {
    var crd = pos.coords;
    $.get('/getlocation',{
      latLong: `${pos.coords.latitude},${pos.coords.longitude}`
    }, function(data,status){
        if (data.msg === 'Success'){
          $('#cityId').val(data.city);
          $('#stateId').val(data.state);
        }
    })
  }

  function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }

  navigator.geolocation.getCurrentPosition(success, error, options);

  $("form[name='address']").validate({
    // Specify validation rules
    rules: {

      fullName: "required",
      mobileNumber: {
          required:true,
          maxlength:10,
          minlength:10
      },
      street: {
        required: true,
        minlength: 10,
        maxlength:100
      },
      city: {
        required: true,
        minlength: 3
      },
      state:{
        required: true,
        maxlength:25
      },
      pinCode: {
        required:true,
        maxlength:6,
        minlength:6
      }
    },
      // Specify validation error messages
    messages: {
      fullName: "Please enter valid Full Name",
      mobileNumber: "Mobile number should be of 10 digits",
      city :  "Please enter minimum 3 characters ",
      state :  "Please enter valid state name minimum 2 maximum 25 characters long",
      pinCode :  "Pincode should be of 6 digits",
    },
    submitHandler: function(form) {
      print(form, $("form[name='address']"))
      $("form[name='address']").submit(function(e){
        e.preventDefault();

      });
    }

  });
  // {
  //         fullName: $('#fullNameId').val(),
  //         mobileNumber: $('#mobileNumberId').val(),
  //         street: $('#streetId').val(),
  //         city: $('#fullNameId').val(),
  //         state: $('#stateId').val(),
  //         pinCode: $('#pinId').val(),
  //       }
  // $("form[name='address']").submit(function(event) {
  //   // Cancels the form's submit action.
  //   event.preventDefault();
  //   let url = $(this).attr('action');
  //
  //   $.ajax({
  //     url: url,
  //     dataType: 'json',
  //     type: 'post',
  //     contentType: 'application/x-www-form-urlencoded',
  //     data: $(this).serialize(),
  //     success: function( data, textStatus ){
  //         console.log( data )
  //     },
  //     error: function( jqXhr, textStatus, errorThrown ){
  //         console.log( errorThrown );
  //     }
  //   });
  // });
});
