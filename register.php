<?php
// uncomment bellow line inn production
// error_reporting(0);

// Include config file
require_once "connection.php";


$name = $email = $cnt = $location = $type = "";

// var_dump("Hi");
// extract value from api 
function get_value($key)
{
	if (isset($_POST[$key])) {
		return trim($_POST[$key]);
	}
	return "";
}

// echo "hi";
// Processing form data when form is submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
	// Validate name
	$name =	get_value("name");
	$email =	get_value("email");
	$cnt = get_value("cnt");
	$location = get_value("location");
	$type = get_value("type");
	

	// verify for not null values 
	if ($name == "" || $email == "") {
		echo json_encode(array(
			'status' => false,
			'message' => 'Please provide vavlid name and email.'
		));
	}

	// Check input errors before inserting in database
	$sql = "INSERT INTO registration ( Name, Email, Mobile, Location, Type ) VALUES ('" . $name . "','" . $email . "','" . $cnt . "','" . $location . "','" . $type . "')";

	$pdo_statement = $conn->prepare($sql);

	$result = $pdo_statement->execute();

	if (!$result) {
		$response = array(
			'status' => false,
			'message' => 'An error occured...'
		);
	} else {
		$response = array(
			'status' => true,
			'message' => 'Success',
		);
	}

	echo json_encode($response);
}
