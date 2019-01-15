<?php

//for Allow server requers 
header('Access-Control-Allow-Origin: *');
//database bonnection
require_once('connection.php');




//get register info a sent to MYsQul database
if( isset( $_POST['register'] ) ){
    $name       = $_POST["j_name"];
    $roll       = $_POST["j_roll"];
    $phone      = $_POST["j_phone"];
    $email      = $_POST["j_email"];
    $password   = md5($_POST["j_password"]);
    
    $emailexistes = mysqli_query( $connect, "SELECT * FROM students WHERE email = '$email'");
    if( mysqli_num_rows( $emailexistes ) == 0 ){

        $sucss = mysqli_query( $connect, "INSERT INTO students(roll,fname,phone,email,cpassword) VALUES('$roll','$name','$phone','$email','$password')");
        if( !$sucss ){
            echo 'Register faild';
        }else{
            echo 'you have been regiter successfully';
        }

    }else{
        echo "email alredy have our server please login";
    }

    

}


//get login info parmid or not user to login
if(isset($_POST['login'])){

    $email      = $_POST["email"];
    $password   = $_POST["password"];

    $loginquery = mysqli_query( $connect, "SELECT cpassword FROM students WHERE email = '$email' " );
        $result = mysqli_fetch_assoc( $loginquery );

        if( md5($password) == $result['cpassword'] ){
            
            echo "yes";


        }else{
            echo 'your password is incaret';
        }
}


//get user information from database and send to app
if(isset($_POST['user_info'])){

    $email      = $_POST["email"];
    $password   = $_POST["password"];

    $get_users_info = mysqli_query($connect, "SELECT * FROM students WHERE email ='$email' ");

    $json_array = array();

    while( $row = mysqli_fetch_assoc( $get_users_info ))
    {
        $json_array[] = array(
            "name" => $row['fname'],
            "roll" => $row['roll'],
            "USER_ID" => $row['id'],
            "phone" => $row['phone'],
            "password" => $row['cpassword'],
            "email" => $row['email'],
            "image" => $row['images'],
        );
    }

    echo json_encode($json_array);
}


//GET ALL USER INFORMATION FROM DATABASE & SEND TO APP
if( isset( $_POST['getin_user'] ))
{
    $get_all_users = mysqli_query($connect, "SELECT * FROM students");
    
    $json_array = array();

    while($row = mysqli_fetch_assoc($get_all_users))
    {
        $json_array[] = array(
            "name" => $row['fname'],
            "roll" => $row['roll'],
            "USER_ID" => $row['id'],
            "image" => $row['images'],
        );
    }
    echo json_encode($json_array);
}





//CREATE TABLE FOR USER MESSEGES
if(isset($_POST['create_table'])){

    //SENDER & RECEIVER DATA
    $sender_name = $_POST['sender_name'];
    $receiver_name = $_POST['receiver_name'];

    //Removes special chars from name 
    function clean($string) {
        $string = str_replace(' ', '', $string); // Replaces all spaces with hyphens.
        return preg_replace('/[^A-Za-z0-9\-]/', '', $string); // Removes special chars.
    }

    //TABLE NAME
    //THE TABLE WILL BE CREATED BY FIRST MESSAGE BUTTON CLICEAR NAME
    $s_to_r_table = clean($sender_name.'to'.$receiver_name);
    $r_to_s_table = clean($receiver_name.'to'.$sender_name);

    //CHACK WHAT TABLE CREATED
    $s_to_r_query = mysqli_query($connect, "SELECT * FROM $s_to_r_table");
    $r_to_s_query = mysqli_query($connect, "SELECT * FROM $r_to_s_table ");

    if(empty($s_to_r_query) & empty($r_to_s_query)){

        $user_ms_table = mysqli_query( $connect, "CREATE TABLE $s_to_r_table (
            ms_id int(11) AUTO_INCREMENT,
            sender_name TEXT,
            ms_message TEXT,
            ms_time TEXT,
            
            PRIMARY KEY(ms_id)
        )");

        if( ! $user_ms_table ){

            echo '&#10006; table not created there is a problem';
            
        }
        else{

            echo '&#x2714; Info table has been created successrully';
        
        }

    }
    
}





//RECEVING DATA FROM APP AND INSURT INTO RIGHT TABLE
if( isset( $_POST['ms_has_send'] ) ){ 

    //SENDER & RECIVER INFO
    //MS SEND TIME
    $ms_time            = $_POST['ms_time'];
    $messege            = $_POST["messege"];
    $sender_name        = $_POST['sender_name'];
    $receiver_name      = $_POST['receiver_name'];


    //REMOVES SPECIAL CHARS FORM NAME
    function clean( $string ) {
        $string = str_replace(' ', '', $string); // Replaces all spaces with hyphens.
        return preg_replace('/[^A-Za-z0-9\-]/', '', $string); // Removes special chars.
    }

    //TABLE NAME
    //THE TABLE WILL BE CREATED BY FIRST MESSAGE BUTTON CLICEAR NAME
    $s_to_r_table = clean($sender_name.'to'.$receiver_name);
    $r_to_s_table = clean($receiver_name.'to'.$sender_name);

    //CHACK WHAT TABLE CREATED
    $s_to_r_query = mysqli_query($connect, "SELECT * FROM $s_to_r_table");
    $r_to_s_query = mysqli_query($connect, "SELECT * FROM $r_to_s_table");


    if(!empty($s_to_r_query)){

        $ms_sucss = mysqli_query( $connect, "INSERT INTO $s_to_r_table(sender_name,ms_message,ms_time) VALUES('$sender_name','$messege','$ms_time')");
        if( !$ms_sucss ){
            echo 'messege send faild';
        }else{
            echo 'you messege has been send successfully';
        }
        
    }else{
        
        $ms_sucss = mysqli_query( $connect, "INSERT INTO $r_to_s_table(sender_name,ms_message,ms_time) VALUES('$sender_name','$messege','$ms_time')");
        if( !$ms_sucss ){
            echo 'messege send faild';
        }else{
            echo 'you messege has been send successfully';
        }
    }
    


}



//RECEVING DATA FROM DATABASE AND SHOWING INTO THE APP
if( isset( $_POST["show_messege"] ) ){

    $sender_name = $_POST['sender_name'];
    $receiver_name = $_POST['receiver_name'];


    //REMOVES SPECIAL CHARS FORM NAME
    function clean( $string ) {
        $string = str_replace(' ', '', $string); // Replaces all spaces with hyphens.
        return preg_replace('/[^A-Za-z0-9\-]/', '', $string); // Removes special chars.
    }


    //TABLE NAME
    //THE TABLE WILL BE CREATED BY FIRST MESSAGE BUTTON CLICEAR NAME
    $s_to_r_table = clean($sender_name.'to'.$receiver_name);
    $r_to_s_table = clean($receiver_name.'to'.$sender_name);

    //CHACK WHAT TABLE CREATED
    $s_to_r_query = mysqli_query($connect, "SELECT * FROM $s_to_r_table");
    $r_to_s_query = mysqli_query($connect, "SELECT * FROM $r_to_s_table");

    $sender   = mysqli_query( $connect, "SELECT * FROM students WHERE fname = '$sender_name'");
    $receiver = mysqli_query( $connect, "SELECT * FROM students WHERE fname = '$receiver_name'");        

    $sender_image;
    while( $row = mysqli_fetch_assoc( $sender ) ){ 
		if($row['images'] !== null ){
			$sender_image = $row['images']; 
		}else{
			
			$sender_image = "img/user-image-.png";
		}
	}

    $receiver_image;
    while( $row = mysqli_fetch_assoc( $receiver ) ){
		
		if($row['images'] !== null ){
			$receiver_image = $row['images']; 
		}else{
			
			$receiver_image = "img/user-image-.png";
		}
	}


    if(!empty($s_to_r_query)){

        //RECEVING SENDER MESSEGESES
        $sender_query = "SELECT * FROM ( SELECT * FROM $s_to_r_table ORDER BY ms_id DESC LIMIT 5 ) sub ORDER BY ms_id ASC";
        $sender_messeges = mysqli_query( $connect, $sender_query );

        foreach ($sender_messeges as $sender_ms ):?>
            
            <?php if ($sender_name == $sender_ms['sender_name'] ) {?>
                
                <div class="container darker">
                <img src="<?php echo $sender_image ?>" alt="Avatar" class="right">
                <p><?php echo $sender_ms['ms_message'] ?></p>
                <span class="time-left"><?php echo $sender_ms['ms_time'] ?></span>
                </div>
                
            <?php }else {?>

           
                <div class="container">
                <img src="<?php echo $receiver_image ?>" alt="Avatar">
                <p><?php echo $sender_ms['ms_message'] ?></p>
                <span class="time-right"><?php echo $sender_ms['ms_time'] ?></span>
                </div>
            

               
        <?php } endforeach;
        
    }else{
        
        //RECEVING SENDER MESSEGESES
        $sender_query = "SELECT * FROM ( SELECT * FROM $r_to_s_table ORDER BY ms_id DESC LIMIT 5 ) sub ORDER BY ms_id ASC";
        $sender_messeges = mysqli_query( $connect, $sender_query );

        foreach ($sender_messeges as $sender_ms ):?>
            
            <?php if ($sender_name == $sender_ms['sender_name'] ) {?>
                
                <div class="container darker">
                <img src="<?php echo $sender_image ?>" alt="Avatar" class="right">
                <p><?php echo $sender_ms['ms_message'] ?></p>
                <span class="time-left"><?php echo $sender_ms['ms_time'] ?></span>
                </div>
                
            <?php }else {?>

           
                <div class="container">
                <img src="<?php echo $receiver_image ?>" alt="Avatar">
                <p><?php echo $sender_ms['ms_message'] ?></p>
                <span class="time-right"><?php echo $sender_ms['ms_time'] ?></span>
                </div>
            

               
        <?php } endforeach;

       
    }
   
    
    
}


//PROFILE IMAGE UPLOADED
if(isset($_POST['uploded'])){
    
    
    $sender_name     = $_POST["sender_name"];
    $destination     = "upload/".$_FILES["file"]["name"];
    $filename        = $_FILES["file"]["tmp_name"];
    $path            = str_replace('\\', '/', dirname(__FILE__))."/".$destination ;
    

    if(move_uploaded_file($filename, $destination)){

        $sucss = mysqli_query( $connect, "UPDATE students SET images = '$path' WHERE fname = '$sender_name'");
        $sql   = mysqli_query( $connect, "SELECT * FROM students WHERE fname = '$sender_name'");
        


        while( $row = mysqli_fetch_assoc( $sql )){ 
        
             echo $row['images']; 
            

        } 

    }

}
