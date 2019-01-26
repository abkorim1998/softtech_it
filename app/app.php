<?php


header('Access-Control-Allow-Origin: *'); //for Allow server requers 
require_once('connection.php'); //database Connection

$httpLocation = "";
$localHostlocation = str_replace('\\', '/', dirname(__FILE__))."/";
$urlPath = !empty($httpLocation)  ? $httpLocation : $localHostlocation ;



//-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_
//-------------------------|| GET REGISTER INFORMATION THEN ||----------------------------
//-------------------------|| SENT TO MYSQUL DATABASE    ||-----------------------------
//-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_

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




//-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_
//-------------------------|| GET LOGIN INFORMATION THEN ||----------------------------
//-------------------------|| PARMTED OR NOT TO LOGIN    ||-----------------------------
//-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_

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






//-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_
//-------------------------|| GET USER INFORMATION       ||----------------------------
//-------------------------|| FROM DATABASE & SEND TO APP    ||-----------------------------
//-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_

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



//-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_
//-------------------------|| GET ALL USER INFORMATION       ||----------------------------
//-------------------------|| FROM DATABASE & SEND TO APP    ||-----------------------------
//-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_

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
			"phone" => $row['phone'],
			"email" => $row['email'],
            "image" => $row['images'],
        );
    }
    echo json_encode($json_array);
}







//-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_
//-------------------------||    GET PROFIL INFO       ||----------------------------
//-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_

if( isset( $_POST['getin_user_profile'] ))
{
	$name = $_POST['profile_user_name'];
	
    $get_all_users = mysqli_query($connect, "SELECT * FROM students WHERE fname ='$name' ");
    
    $json_array = array();

    while($row = mysqli_fetch_assoc($get_all_users))
    {
        $json_array[] = array(
            "name" => $row['fname'],
            /* "roll" => $row['roll'],
            "USER_ID" => $row['id'],
			"phone" => $row['phone'],
			"email" => $row['email'], */
            "image" => $row['images'],
        );
    }
    echo json_encode($json_array);
}





//-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_
//-------------------------|| CREATE TABLE FOR       ||----------------------------
//-------------------------|| USER MESSEGES          ||-----------------------------
//-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_

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




//-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_
//-------------------------|| RECEVING DATA FROM APP  ||----------------------------
//-------------------------|| AND INSURT INTO RIGHT TABLE ||-----------------------------
//-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_

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



//-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_
//-------------------------|| RECEVING DATA FROM DATABASE ||----------------------------
//-------------------------|| AND SHOWING INTO THE APP ||-----------------------------
//-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_

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





//-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_
//--------------------------\\ PROFILE IMAGE UPLOADED //-----------------------------
//-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_

if(isset($_POST['uploded'])){
    
    
    $sender_name     = $_POST["sender_name"];

    $fileTmpName        = $_FILES["file"]["tmp_name"];
    $fileName           = $_FILES["file"]["name"];
    $fileExt            = explode('.', $fileName);
    $fileActualExt      = strtolower(end($fileExt));
    $fileNewName        = uniqid('', true).".".$fileActualExt;

    $destination     = "upload/".$fileNewName;
    
    $path            = $urlPath.$destination ; //for database record
    

    if(move_uploaded_file($fileTmpName, $destination)){

        $sucss = mysqli_query( $connect, "UPDATE students SET images = '$path' WHERE fname = '$sender_name'");
        $sql   = mysqli_query( $connect, "SELECT * FROM students WHERE fname = '$sender_name'");
        

        while( $row = mysqli_fetch_assoc( $sql )){ 
        
             echo $row['images']; 
            

        } 

    }

}





//-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_
//--------------------------\\ POSTS SUBMIT //-----------------------------
//-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_

if(isset($_POST['post_submit'])){
    
    
    $sender_name     = $_POST["sender_name"];
    $content     = $_POST["content"];
    $title     = $_POST["title"];
    
    //file detelts
    if(isset($_FILES["files"])){
        $fileTmpName        = $_FILES["files"]["tmp_name"];
        $fileName           = $_FILES['files']['name'];
        $fileExt            = explode(".", $fileName);
        $fileActualExt      = strtolower(end($fileExt));
        $fileNewName        = uniqid('', true).".".$fileActualExt;
        $file_desti         = "upload/".$fileNewName;
        $file_path          = $urlPath.$file_desti; //for database record
        move_uploaded_file($fileTmpName, $file_desti);
    }
    

    // image
    if(isset($_FILES["image"])){
        $imgTampName        = $_FILES["image"]["tmp_name"];
        $imgName            = $_FILES["image"]["name"]; 
        $imgExt             = explode(".", $imgName);
        $imgActualExt       = strtolower(end($imgExt));
        $allowed = array("jpg", "jpeg", "png");
        if(in_array($imgActualExt, $allowed)){
            $imgNewName         = uniqid("", true).".".$imgActualExt;
            $image_desti        = "upload/".$imgNewName;
            $image_path         = $urlPath.$image_desti; //for database record
            move_uploaded_file($imgTampName, $image_desti);
        }else{
            echo "This image not supported";
        }
    }

    //validation
    $image  = isset($image_path) ? $image_path : null ;
    $file   = isset($file_path) ? $file_path : null ;
    $tit    = htmlspecialchars($title);
    $cont    = htmlspecialchars($content);


    $query = "INSERT INTO posts(user,title,content,thumbnail,fils) VALUES('$sender_name','$tit','$cont','$image','$file')";
    $sucss = mysqli_query( $connect, $query);

    if($sucss){
        echo "Good job, post submited";
    }else{
        echo "there is a problem";
    }

    

}



//-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_
//--------------------------\\ Geting Posts Form Database for page //-----------------------------
//-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_
if(isset($_POST['get_posts'])){

    $user = $_POST['user_name'];

    $query = "SELECT * FROM posts WHERE user = '$user' ORDER BY post_id DESC";

    $sql = mysqli_query( $connect, $query );

    $json_array = array();
    while($row = mysqli_fetch_assoc($sql))
    {
        $json_array[] = array(

            "title"        => $row['title'],
            "content"      => $row['content'],
            "thumbnail"    => $row['thumbnail'],
			"fils"         => $row['fils'],

        );
    }

    echo json_encode($json_array);

}



//-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_
//--------------------------\\ Geting User Imag Form  //-----------------------------
//--------------------------\\ Database for Gallary page //-----------------------------
//-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_
if(isset($_POST['get_user_img'])){

    $user = $_POST['user_name'];

    $query = "SELECT * FROM posts WHERE user = '$user'";

    $sql = mysqli_query( $connect, $query );

    $json_array = array();
    while($row = mysqli_fetch_assoc($sql))
    {
        $json_array[] = array(

            // "title"        => $row['title'],
            // "content"      => $row['content'],
            "thumbnail"    => $row['thumbnail'],
			// "fils"         => $row['fils'],

        );
    }

    echo json_encode($json_array);

}