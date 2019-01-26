<?php 
//for Allow server requers 
require_once('connection.php');

    // if(isset($_POST['createdb'])){
        //create database and table
      

        if(!$connect){
            die('connent erros'.mysqli_error());
        }
        else{
            
            //creating students table
            $studentsTable = mysqli_query($connect, 'CREATE TABLE students(
                id int(11) AUTO_INCREMENT,
                roll  varchar(255) ,
                fname varchar(255) ,
                phone varchar(255) ,
                email varchar(255) ,
                images varchar(255) ,
                cpassword varchar(255) ,
                PRIMARY KEY(id)
            )');
            if(!$studentsTable){
                echo '&#10006; students table not created there is a problem <br>';
            }
            else{
                echo '&#x2714; students table has been created successrully <br>';
            }
			
			//creating posts table
            $postsTable = mysqli_query($connect, 'CREATE TABLE posts(
                post_id int(11) AUTO_INCREMENT,
                user  varchar(255) ,
                title varchar(255) ,
                content varchar(255) ,
                thumbnail varchar(255) ,
                fils varchar(255) ,
                PRIMARY KEY(post_id)
            )');
            if(!$postsTable){
                echo '&#10006; posts table not created there is a problem <br>';
            }
            else{
                echo '&#x2714; posts table has been created successrully <br>';
            }


            
            
        }
    
    // }
    

   

    
       
      

   
?>

