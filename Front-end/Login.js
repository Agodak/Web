var loggedIn = 0;
var auth;

$(document).ready(function(){
	
	
	//first hide the blog thumbnail template
	//$("#thumb").hide();
	
    $('Login').click(function(){
		
		
		//user is trying a login attempt
		//send an AJAX request to the server
		//if login success hide the modal, display contents
		//if login invalid, give feedback
		
		event.preventDefault();
		var data ={};
		$("#loginForm").serializeArray().map(function(x){data[x.name] = x.value;});
		console.log(data);
		$("#loginResult").empty();
		$.ajax(
		{
			type: "POST",
			crossDomain: true,
			url: $("#LoginForm").attr('action'),
			xhrFields: {
				withCredentials: true
			},
			headers: {
				'Authorization': 'Basic ' + btoa(data.username + ":" + data.password)
			},
			contentType: "application/json",
			data: JSON.stringify(data), //becuase we set type to json the data will be parsed for us, 
			//so no need to parse JSON the data to consume it
			success: function( responseData, textStatus, jqXHR )
			{
				//Code to process the response
				
				//save auth data in global variable for future requests
				auth = {username:data.username, password:data.password};
				
				$("#loginResult").html("<p style='color:green;'>login success.</p>");
				//$("#loginModal").modal("hide");
				//hideLoginButton();
				//requestBlogs();
				loggedIn = 1;
				
			},
			error: function(jqXHR, textStatus, errorThrown)
			{
				$("#loginResult").html("<p style='color:red;'>An error has occurred, " + errorThrown + ".</p>");
			}
		});
		return false;
		
	});
});

/*function hideLoginButton(){
	$("#btnLogin").hide();
}
function requestBlogs(){
	$.ajax(
	{
		type: "GET",
		crossDomain: true,
		url: 'http://localhost:8080/blogs',
		xhrFields: {
			withCredentials: true
		},
		headers: {
			'Authorization': 'Basic ' + btoa(auth.username + ":" + auth.password)
		},
		contentType: "application/json",
		success: function( responseData, textStatus, jqXHR )
		{
			//Code to process the response
			console.log(responseData);
			populateThumbnails(responseData);
		},
		error: function(jqXHR, textStatus, errorThrown)
		{
			console.log("the following error has occured:" + errorThrown)
		}
	});
}
function populateThumbnails(data){ 
    
    //NOTE: as we have specified in the AJAX request that dataType is application/json
	//then we do not need to parse it as it will be already parsed for user
	//we only parse if we set data type to text/html
    
    //the array is stored in data.thumbnails
    //for each elelemnt of the array
    data.forEach(function(thumb){
        
        //clone the thumbnail code
        $clone = $("#thumb").clone();
        
        //modify the cloned thumb to add the data from json object
        $clone.find("#thumbTitle").text(thumb.title);
        $clone.find("#thumbImage").attr("src", thumb.photo);
        $clone.find("#thumbTitle").attr("href", "/blog/" + thumb.ID );
        $clone.find("#authorName1").text(thumb.authorId);
        $clone.find("#authorName2").text(thumb.authorId);
        $clone.find("#authorJob").text("Blogger");
        $clone.find("#authorPic").attr("src", "./resources/images/profile.jpg");
        $clone.find("#likesNumber").text(5);
        $clone.find("#commentsNumber").text(10);
       
        //append the cloned tag to the thumbnail container
        $("#thumbsContainer").append($clone);
		$clone.show();
        
    });
    
	//prevent clicking links to load a new page
    $('a').on('click', function(e){  
	   e.preventDefault( ); 
	   let url = $(this).attr('href');
	   
	   let urlParts = url.split("/");
	   
	   let blogId = urlParts[urlParts.length - 1]
	   //TODO: when clicking a blog, display only that blog and hide all thumbnails
	   
	   showOneBlog(blogId);
	   
	});	
    
    return false;
}

function showOneBlog(blogId){
	console.log(blogId);
}
*/
