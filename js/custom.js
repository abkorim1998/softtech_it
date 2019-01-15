(function(){
    
    var phppage = "http://127.0.0.1/app/app.php";
    //login & register button dom here
    var loginBtn = document.querySelector("#login_btn");
    var registerBtn = document.querySelector("#register_btn");

    //login releted work & event 
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


    
    //register releted woerk & event
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




    
    // setInterval(function(){},1000)
    //GETIN LOGIN USER INFORMATION AND SEND IT TO THIS APP 
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
                $(".sender_name").attr('id', USER_ID );
                (image !== null) ? $(".user_img>img").attr('src', image ) : $(".user_img>img").attr('src', "img/user-image-.png" ) ;
                
                

            }
      
      
        });

  
    })



    //SENDING MESSEGE TO THE REQUESTED USER TABAL
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


    //GET USER MESSEGE FORM DATABASE AND SEND IT TO THE APP
    $(".user_page_section").on("click",".users_page_messege_btn", function(){
        $('.messege_page').empty();

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

        
        function ms_function(){
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
        }

        $(document).on("pagechange", function (e, data) {
            var ms = setInterval( ms_function , 1000);
            var pageid = data.toPage[0].id;
            if( pageid == "class-page" ){
                var ms = setInterval( ms_function , 1000);
                alert(pageid)
            }else{
                clearInterval(ms);
            }
            
            
        });


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


    //SENDING REQUEST TO DATABASE FOR USER INFOR
    //AND SHOWING ALL USER'S TO THE USER PAGE
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
                        (obj.image !== null ) ? panelBody += "<img src=\""+ obj.image +"\">" :  panelBody += "<img src=\"img/user-image-.png\">";
                        panelBody += "<h4 class=\"user_name\">"+obj.name+"<\/h4>";
                        panelBody += "<p class=\"user_roll\">"+obj.roll+"<\/p>";
                        panelBody += "<p class=\"user_id\">"+obj.USER_ID+"<\/p>";
                        panelBody += "  <div data-demo-html=\"true\" data-demo-css=\"#wrap\">";
                        panelBody += "       <div class=\"ui-grid-a\">";
                        panelBody += "<div class=\"ui-block-b\"><a href=\"#\" class=\"u-p-btn ui-shadow ui-btn ui-corner-all\">profile<\/a><\/div>";
                        panelBody += "<div class=\"ui-block-b\"><a href=\"#\" class=\"u-p-btn ui-shadow ui-btn ui-corner-all\">edit<\/a><\/div>";
                        panelBody += "      <\/div>";
                        panelBody += "  <\/div>";
                        panelBody += "<\/div>";
                        $('.user_page_section').append(panelBody);


                    }else{
                        
                        //THIS IS FOR ALL USER
                        var panelBody = "";
                        panelBody += "<div class=\"container\">";
                        (obj.image !== null ) ? panelBody += "<img src=\""+ obj.image +"\">" :  panelBody += "<img src=\"img/user-image-.png\">";
                        panelBody += "<h4 class=\"user_name\">"+obj.name+"<\/h4>";
                        panelBody += "<p class=\"user_roll\">"+obj.roll+"<\/p>";
                        panelBody += "<p class=\"user_id\">"+obj.USER_ID+"<\/p>";
                        panelBody += "  <div data-demo-html=\"true\" data-demo-css=\"#wrap\">";
                        panelBody += "       <div class=\"ui-grid-a\">";
                        panelBody += "<div class=\"ui-block-a\"><a href=\"#\" class=\"users_page_messege_btn u-p-btn ui-shadow ui-btn ui-corner-all\">Messege<\/a><\/div>";
                        panelBody += "<div class=\"ui-block-b\"><a href=\"#\" class=\"u-p-btn ui-shadow ui-btn ui-corner-all\">profile<\/a><\/div>";
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
    

    
    //SEND BUTTON EVENT
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

    //SEND ICON FOCUS
    document.querySelector('.send_icon').onclick = function() {
        document.getElementById('messege').focus();
    };
    
    //PROFILE IMAGE UPLOADE
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
                $('.user_img>img').attr('src', output)
            }

        })

    })
    
    //sign-out
    $('.sign-out').click(function() {
    location.reload();
    location.href= "#login-page";
    })
   
    
  

    


})();