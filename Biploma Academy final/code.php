<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Retrieve form data
    $name = $_POST["name"];
    $email = $_POST["email"];
    $message = $_POST["message"];

    // Process the data (you can customize this part)
    // For example, you can send an email or store the data in a database

    // For demonstration purposes, let's just print the data
    echo "Name: " . $name . "<br>";
    echo "Email: " . $email . "<br>";
    echo "Message: " . $message . "<br>";
} else {
    // Redirect to the contact page if accessed directly
    header("Location: contact.html");
    exit();
}
?>

