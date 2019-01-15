<?php 
//for Allow server requers 
require_once('connection.php');

    // if(isset($_POST['createdb'])){
        //create database and table
      

        if(!$connect){
            die('connent erros'.mysqli_error());
        }
        else{
            
            //creating table 1 "students"
            $cratetble1 = mysqli_query($connect, 'CREATE TABLE students(
                id int(11) AUTO_INCREMENT,
                roll  varchar(255) ,
                fname varchar(255) ,
                phone varchar(255) ,
                email varchar(255) ,
                images varchar(255) ,
                cpassword varchar(255) ,
                PRIMARY KEY(id)
            )');
            if(!$cratetble1){
                echo '&#10006; table not created there is a problem';
            }
            else{
                echo '&#x2714; Users table has been created successrully <br>';
            }

            
            
        }
    
    // }
    

   

    
       
      

   
?>

