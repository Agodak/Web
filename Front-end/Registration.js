$(document).ready(function ()
{
	$("#btnSignupForm").click( function()
	{
		event.preventDefault();
		var data ={};
		$("#signupForm").serializeArray().map(function(x){data[x.name] = x.value;});
		console.log(data);
		$("#result").empty();
		$.ajax(
		{
			type: "POST",
			crossDomain: true,
			url: $("#signupForm").attr('action'),
			contentType: "application/json",
			data: JSON.stringify(data),
			success: function( responseData, textStatus, jqXHR )
			{
				//Code to process the response
				$("#result").html("<p style='color:green;'>Your data was updated successfully.</p>");
				window.location = "file:///C:/Users/gegead/Downloads/Front-end-master/Front-end-master/landing.html#"
			},
			error: function(jqXHR, textStatus, errorThrown)
			{
				$("#result").html("<p style='color:red;'>An error has occurred, " + errorThrown + ".</p>");
			}
		});
		return false;
	});
});