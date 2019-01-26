(function(){
    
var phppage = "https://softtech-it.000webhostapp.com/app.php";
//login & register button dom here
var loginBtn = document.querySelector("#login_btn");
var registerBtn = document.querySelector("#register_btn");



//-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_
//----------------------------------------\\ LOGIN RELETED WORKE & EVENT       //--------------------------------
//-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_   
loginBtn.addEventListener("click", function(){
    var email = document.getElementById("login_email").value;
    var password = document.getElementById("login_password").value;
    var login = ""

    if(email === "" || password === "" ){
        alert("your fild is emty")
    }else {

        //send login info into server
        $.ajax({
            url     : phppage,
            type    : "POST",
            success : function(output){

                if(output==="yes"){
                    location.href = "#Dashboard";
                }else{
                    location.href = "#login-page";
                    alert("woring information")
                }
                
            },
            data        : {
                login   : login,
                email   : email,
                password: password,
            },
        })

        
    }
})




//-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_
//----------------------------------------\\ REGISTER RELETED WORKE & EVENT       //--------------------------------
//-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_   
registerBtn.addEventListener("click", function(){
    var name = document.getElementById("re_name").value;
    var roll = document.getElementById("re_roll").value;
    var phone = document.getElementById("re_phone").value;
    var email = document.getElementById("re_email").value;
    var password = document.getElementById("re_password").value;
    var register = ""

    if( name === "" || roll === "" || phone === "" || email === "" || password === "" ){
        alert("your fild is empty")
    }else{

        //send register info into server
        $.ajax({
            url     : phppage,
            type    : "POST",
            success : function(output){
                alert(output);
                location.href = "#login-page";
            },
            data : {
                register      : register,
                j_name        : name,
                j_roll        : roll,
                j_phone       : phone,
                j_email       : email,
                j_password    : password,
            }

        })
        
    }
})








//-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_
//----------------------------------------\\ GETIN LOGIN USER INFORMATION       //--------------------------------
//----------------------------------------\\ AND SEND IT TO THIS APP  //----------------------------------------
//-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_   
$( "#login_btn" ).click(function() {

    //showing user information to user's dashbord
    var email = document.getElementById("login_email").value;
    var password = document.getElementById("login_password").value;


    $.ajax({
        url : phppage,
        type : 'POST',
        dataType: "json",
        data : {
            user_info : '',
            email : email,
            password : password,
        },
        success : function(data){
            
            //DATA GETING IN JSON FORMAT
            USER_ID     = data[0].USER_ID;
            name        = data[0].name;
            roll        = data[0].roll;
            phone       = data[0].phone;
            email       = data[0].email;
            image       = data[0].image;
            password    = data[0].password;
                    

            //APPLYING DATA TO THE APP
            $(".user_name").text("Name : "+ name);
            $(".user_roll").text("Roll Number : "+ roll);
            $(".user_phone").text("Phone Number : "+ phone);
            $(".user_email").text("Email : "+ email);
            $(".user_password").text("Password : "+ password);
            $(".sender_name").text(name);
            $(".writer-name").text(name);
            $(".sender_name").attr('id', USER_ID );
            (image !== null) ? $("#Dashboard .user_img>img").attr('src', image ) : $("#Dashboard .user_img>img").attr('src', "img/user-image-.png" ) ;
            
            

        }
    
    
    });


})






//-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_
//----------------------------------------\\ SENDING MESSEGE TO       //--------------------------------
//----------------------------------------\\ THE REQUESTED USER TABAL //----------------------------------------
//-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_
$("#send_messege_btn").click( function(){
    
    //DATA TO SEND TO THE SERVER
    var sender_name    = $(".sender_name").text();
    var receiver_name = $(".receiver_name").text();
    var messege = $("#messege").val();

    // CLEAR-EMPTY MESSEGE INPUT 
    $('#messege').val("");

    //TIME 
    var time = new Date();
    var timedate =  time.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', second: 'numeric',  hour12: true })
    

    //REQUEST TO INSART MESSEGES TO THE CONNECTED TABLE 
    $.ajax({
        url: phppage,
        type: "POST",
        data: {
            ms_has_send     : "",
            sender_name     : sender_name,
            receiver_name   : receiver_name,
            messege         : messege,
            ms_time         : timedate,
        },
        success: function(output){
            console.log(output);
            setTimeout(function(){
                $('.messege_page').scrollTop($('.messege_page')[0].scrollHeight);
            },60)
        }
    
    })

    
    

});








//-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_
//--------------------------------------\\ GET USER MESSEGE FORM DATABASE //--------------------------------
//----------------------------------------\\ AND SEND IT TO THE APP //----------------------------------------
//-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_
$(".user_page_section").on("click",".users_page_messege_btn", function(){

    // //SHOWING USER NAME INTO HEADING IN MESSEGE PAGE
    var x = $(this).parents(".container");
    var user_name = $(x).find('.user_name').text();
    $(".receiver_name").text(user_name);

    // //SENDER NAME & RECEVER NAME 
    var sender_name    = $(".sender_name").text();
    var receiver_name = $(".receiver_name").text();

    //REDIRECT TO MESSEGES 
    location.href = "#class-page";

    //REQUEST TO SERVER FOR SHOWING USER MESSEGES
    setInterval(function(){
            $.ajax({
                    url : phppage,
                    type: "POST",
                    // dataType: "json",
                    data: {
                        show_messege :"",
                        sender_name    :sender_name,
                        receiver_name  :receiver_name,
                    },
                    success: function ( data ){
                        
                        $('.messege_page').html( data );
                    
                    },
        
            })
    },1000)


    //REQUEST FOR CREATING DATABASE
    $.ajax({
        url : phppage,
        type: "POST",
        data: {
            create_table   :"",
            sender_name    :sender_name,
            receiver_name  :receiver_name,
        },
        success: function ( data ){
            
            console.log(data);
        
        },
    })

});

    



//-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_
//--------------------------\\ SENDING REQUEST TO DATABASE FOR USER INFOR //-----------------------------
//--------------------------\\ AND SHOWING ALL USER'S TO THE USER PAGE //-----------------------------
//-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_
$('.user_page_btn').click(function(){
    
    $.ajax({
        url : phppage,
        type: "POST",
        dataType: "json",
        data: {
            getin_user: "",
        },
        success: function ( data ){
            
            var sender_name    = $(".sender_name").text();

            //GETING DATA FROM DATABASE AND APPLY FOR USER PAGE
            for(var i = 0; i < data.length; i++) {


                //DATA GETING IN JSON FORMAT
                var obj = data[i];
                if(sender_name == obj.name){


                    // THIS IS FOR THE LOGIN USER
                    var panelBody = "";
                    panelBody += "<div class=\"container\">";
                    panelBody += "<h4 class=\"login_user\">IT'S YOUR PROFILE</h4>";
                    panelBody += "<hr>";
                    panelBody += "<div class=\"user-image-div\">";
                    (obj.image !== null ) ? panelBody += "<img src=\""+ obj.image +"\">" :  panelBody += "<img src=\"img/user-image-.png\">";
                    panelBody += "</div>";
                    panelBody += "<h4 class=\"user_name\">"+obj.name+"<\/h4>";
                    panelBody += "<p class=\"user_roll\">Roll no :<strong>"+obj.roll+"</strong><\/p>";
                    panelBody += "<p class=\"user_phone\">Phone :<strong>"+obj.phone+"</strong><\/p>";
                    panelBody += "  <div data-demo-html=\"true\" data-demo-css=\"#wrap\">";
                    panelBody += "       <div class=\"ui-grid-a\">";
                    panelBody += "<div class=\"ui-block-b\"><a href=\"#\" class=\"u-p-btn profile-btn ui-shadow ui-btn ui-corner-all\">profile<\/a><\/div>";
                    panelBody += "<div class=\"ui-block-b\"><a href=\"#\" class=\"u-p-btn ui-shadow ui-btn ui-corner-all\">edit<\/a><\/div>";
                    panelBody += "      <\/div>";
                    panelBody += "  <\/div>";
                    panelBody += "<\/div>";
                    $('.user_page_section').append(panelBody);


                }else{
                    
                    //THIS IS FOR ALL USER
                    var panelBody = "";
                    panelBody += "<div class=\"container\">";
                    panelBody += "<div class=\"user-image-div\">";
                    (obj.image !== null ) ? panelBody += "<img src=\""+ obj.image +"\">" :  panelBody += "<img src=\"img/user-image-.png\">";
                    panelBody += "</div>";
                    panelBody += "<h4 class=\"user_name\">"+obj.name+"<\/h4>";
                    panelBody += "<p class=\"user_roll\">Roll no :<strong>"+obj.roll+"</strong><\/p>";
                    panelBody += "<p class=\"user_phone\">Phone :<strong>"+obj.phone+"</strong><\/p>";
                    panelBody += "  <div data-demo-html=\"true\" data-demo-css=\"#wrap\">";
                    panelBody += "       <div class=\"ui-grid-a\">";
                    panelBody += "<div class=\"ui-block-a\"><a href=\"#\" class=\"users_page_messege_btn u-p-btn ui-shadow ui-btn ui-corner-all\">Messege<\/a><\/div>";
                    panelBody += "<div class=\"ui-block-b\"><a href=\"#\" class=\"u-p-btn profile-btn ui-shadow ui-btn ui-corner-all\">profile<\/a><\/div>";
                    panelBody += "      <\/div>";
                    panelBody += "  <\/div>";
                    panelBody += "<\/div>";
                    $('.user_page_section').append(panelBody);
                
                }
                
            }
        },

    });

    $('.user_page_section').empty();
    
    
    

})



//-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_
//--------------------------\\ SEND BUTTON EVENT //-----------------------------
//-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_    
$( ".navigation_icon" ).click(function() {

    var sendr_name = $( ".sender_name_panel" ).css( "display" );

    if(sendr_name == "inline-block"){
        $( ".sender_name_panel" ).css( "display","none" );
        $( ".messege_area" ).css( "display","none" );
        $( ".navigation_icon" ).addClass( "navigation_icon_hide" );
        $('.messege_page').css('height','500px')
    }else{
        $( ".sender_name_panel" ).css( "display","inline-block" );
        $( ".messege_area" ).css( "display","block" );
        $( ".navigation_icon" ).removeClass( "navigation_icon_hide" );
        $('.messege_page').css('height','400px');
    }

    //CHAT BOX SCROLL TO BOTTOM
    setTimeout(function(){
        $('.messege_page').scrollTop($('.messege_page')[0].scrollHeight);
    },60)


});


//-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_
//--------------------------\\ SEND ICON FOCUS //-----------------------------
//-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_
document.querySelector('.send_icon').onclick = function() {
    document.getElementById('messege').focus();
};
   
    
    
//-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_
//--------------------------\\ PROFILE IMAGE UPLOADE //-----------------------------
//-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_
$("#file").on("change", function(){
    var uploded = "";
    var sender_name    = $(".sender_name").text();
    var file_data = $('#file').prop('files')[0];
    var form_data = new FormData();  // Create a FormData object
    form_data.append('file', file_data);  // Append all element in FormData  object
    form_data.append('sender_name', sender_name);  // Append all element in FormData  object
    form_data.append('uploded', uploded)
    $.ajax({
        url         : phppage,
        type        : "POST",
        contentType : false,
        processData : false,
        data        : form_data,
        success     : function(output){
            $('#Dashboard .user_img>img').attr('src', output)
        }

    })

})
    



//-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_
//--------------------------\\ SING OUT $ EXIT FOR THE APP //-----------------------------
//-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_
$('.sign-out').click(function() {
    location.reload();
    location.href= "#login-page";
})
    



//-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_
//--------------------------\\ PROFILE BUTTON ON USER PAGE //-----------------------------
//-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_
$(".user_page_section").on("click",".profile-btn", function(){

    $('.profile-posts').empty();
    
    // //SHOWING USER NAME INTO HEADING IN MESSEGE PAGE
    var x = $(this).parents(".container");
    var user_name = $(x).find('.user_name').text();

    location.href = "#profile-page";
    
    //if is current user
    var login_user = $(".sender_name").text();
    if(login_user !== user_name){
        $('#profil-page-ms-btn').text('Message');
    }else{
        $('#profil-page-ms-btn').text('Edit');
        $('#profil-page-ms-btn').attr('href','');
    }

    $.ajax({
        url : phppage,
        type: "POST",
        dataType: "json",
        data: {
            getin_user_profile: "",
            profile_user_name: user_name,
        },
        success: function ( data ){
            name        = data[0].name;
            image       = data[0].image;
            $('#profile-page .user_img>img').attr('src', image);
            $('#profile-page .user_img>img').attr('name', name);
            $('#profile-page-heaader-h1').text(name+"'s profile");

        },

    });



    $.ajax({
        url         : phppage,
        type        : "POST",
        dataType    : "json",
        data        : {
            get_posts : "",
            user_name : user_name, 
        },
        success     : function(output){

            for(var i = 0; i < output.length; i++){

            var obj = output[i];
            var defult_img = "style=\"background-image: url(./img/post-bg.jpg)\"";
            var dinamic_img = "style=\"background-image: url("+obj.thumbnail+")\"";
            var postBody = "";
            postBody += "<div class=\"news_info\">";
            (obj.thumbnail !== "" ) ? postBody += "<div  id=\"post-bg\" "+dinamic_img+" class=\"heading\">" : postBody += "<div  id=\"post-bg\" "+defult_img+" class=\"heading\">"; 
            postBody += "<div class=\"layer\"><div class=\"post-title\">"+obj.title+"<\/div><\/div>";
            postBody += "<\/div>";
            postBody += "<hr>";
            postBody += "<p>"+obj.content+"<\/p>";
            (obj.fils !== "") ? postBody += "<a href=\""+obj.fils+"\"><e>click to download file</e><\/a>" : "";
            postBody += "<\/div>";
            $('.profile-posts').append(postBody);

            }

            
        }

    });


    
});



//-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_
//--------------------------\\ HIDE OR SHOW PROFIL PHOTO UPLOAD INPUT FILD //-----------------------------
//-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_
$('#u-image').dblclick(function(){

    var inp = $('#file').css('display');
    if( inp == "none" ){
        $('#file').css('display','block');
    }else{
        $('#file').css('display','none');
    }

});

//-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_
//--------------------------\\ SHOW SELECTED IMAGE NAME ON POST FORM //-----------------------------
//-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_
$('#images').on("change", function(){
    var image_name = $("#images").prop('files')[0];
    $('.slected-file').append("<li>"+image_name.name+"</li>");
    $('.post_image_uplod_input').css('display','block');

});
$('#files').on("change", function(){
    var file_name = $("#files").prop('files')[0];
    $('.slected-file').append("<li>"+file_name.name+"</li>");
    $('.post_file_uplod_input').css('display','block');
});



//-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_
//--------------------------\\ POSTS SENDING TO THE SERVER //-----------------------------
//-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_
$(".posts-submit-btn").click(function(){
    //hide file input
    var h_img = $('.post_image_uplod_input').css('display');
    var h_file = $('.post_file_uplod_input').css('display');
    if(h_img == "block"){
        $('.post_image_uplod_input').css('display','none');
    }
    if(h_file == "block"){
        $('.post_file_uplod_input').css('display','none');
    }

    var post_submit = "";
    var sender_name    = $(".sender_name").text();
    var image_data = $('#images').prop('files')[0];
    var file_data = $('#files').prop('files')[0];
    var title = $('.post-submit-form #title').val();
    var content = $('.post-submit-form #content').val();

    //clear form input data
    $('.post-submit-form #content').val('');
    $('.post-submit-form #title').val('');
    $('.slected-file').empty();

    var form_data = new FormData();  // Create a FormData object

    //adding element to the formdata() object
    if($("#images").get(0).files.length !== 0){
        form_data.append('image', image_data);
    }
    if($("#files").get(0).files.length !== 0){
        form_data.append('files', file_data);  
    }
    form_data.append('sender_name', sender_name);  
    form_data.append('title', title);
    form_data.append('content', content);
    form_data.append('post_submit', post_submit);
    
    //sending to server
    if( title.length !== 0 ){
        $.ajax({
            url         : phppage,
            type        : "POST",
            contentType : false,
            processData : false,
            data        : form_data,
            success     : function(output){
                console.log(output);
                $('input[type=file]').val(null);
            }

        })
    }else{
        alert('Title is required');
    }
    

})




//-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_
//--------------------------\\ GATING POSTS FOR POSTS PAGE //-----------------------------
//-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_
$('.posts-btn').click(function(){
    
    $('.user_posts_section').empty();

    var user_name   = $(".sender_name").text();

    $.ajax({
        url         : phppage,
        type        : "POST",
        dataType    : "json",
        data        : {
            get_posts : "",
            user_name : user_name, 
        },
        success     : function(output){

          for(var i = 0; i < output.length; i++){

            var obj = output[i];
            var defult_img = "style=\"background-image: url(./img/post-bg.jpg)\"";
            var dinamic_img = "style=\"background-image: url("+obj.thumbnail+")\"";
            var postBody = "";
            postBody += "<div class=\"news_info\">";
            (obj.thumbnail !== "" ) ? postBody += "<div  id=\"post-bg\" "+dinamic_img+" class=\"heading\">" : postBody += "<div  id=\"post-bg\" "+defult_img+" class=\"heading\">"; 
            postBody += "<div class=\"layer\"><div class=\"post-title\">"+obj.title+"<\/div><\/div>";
            postBody += "<\/div>";
            postBody += "<hr>";
            postBody += "<p>"+obj.content+"<\/p>";
            (obj.fils !== "") ? postBody += "<a href=\""+obj.fils+"\"><e>click to download file</e><\/a>" : "";
            postBody += "<\/div>";
            $('.user_posts_section').append(postBody);

          }

            
        }

    });

   


});


//-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_
//--------------------------\\ GATING GELLARY IMAGE FOR GELLARY PAGE //-----------------------------
//-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_
$('.photo-btn').click(function(){

    var user_name   = $('#profile-page .user_img>img').attr('name');

    $.ajax({
        url         : phppage,
        type        : "POST",
        dataType    : "json",
        data        : {
            get_user_img : "",
            user_name : user_name, 
        },
        success     : function(output){
        
          for(var i = 0; i < output.length; i++){
            var  obj = output[i];
            var galleyBody = "";
            (obj.thumbnail !== "") ? galleyBody += "<img src=\""+obj.thumbnail+"\">" : "";
            $('.galley-section').append(galleyBody);
          }
            
        }

    });


});




//POST BUTTON EVENT
$( ".post_icon" ).click(function() {

    var sendr_name = $( ".post_form" ).css( "display" );

    if(sendr_name == "block"){

        $( ".sender_name_panel" ).css( "display","none" );
        $( ".post_form" ).css( "display","none" );
        $( ".overlycolor" ).removeClass( "overlystle" );

    }else{

        $( ".sender_name_panel" ).css( "display","inline-block" );
        $( ".post_form" ).css( "display","block" );
        $( ".overlycolor" ).addClass( "overlystle" );
        
    }

});













})();