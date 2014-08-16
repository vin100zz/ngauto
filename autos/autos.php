<?php

include_once "db.php";

// SQL
$aMarques = DBAccess::query
(
	"SELECT * FROM marque"
);

print json_encode($aMarques, JSON_PRETTY_PRINT);

?>

