<?php

include_once "db.php";

$idVersion = $_REQUEST["id"];

// SQL
$aMarque = DBAccess::querySingle
(
	"SELECT * FROM marque WHERE idMarque=(SELECT idMarque FROM modele WHERE idModele=(SELECT idModele FROM version WHERE idVersion='$idVersion'))"
);
$aModele = DBAccess::querySingle
(
	"SELECT * FROM modele WHERE idModele=(SELECT idModele FROM version WHERE idVersion='$idVersion')"
);
$aVersion = DBAccess::querySingle
(
	"SELECT * FROM version WHERE idVersion='$idVersion'"
);
$aDocumentsVersion = DBAccess::query
(
	"SELECT * FROM documentVersion WHERE idVersion='$idVersion' ORDER BY ordre"
);

$aResponse = array();
$aResponse['marque'] = $aMarque;
$aResponse['modele'] = $aModele;
$aResponse['version'] = $aVersion;
$aResponse['docs'] = $aDocumentsVersion;

print json_encode($aResponse, JSON_PRETTY_PRINT);


?>
