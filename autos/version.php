<?php

include_once "db.php";

$idVersion = $_REQUEST["id"];
$index = $_REQUEST["index"];

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

$aResponse['back'] = ($index <= 0 ? "no" : "yes");
$aResponse['next'] = ($index >= count($aDocumentsVersion)-1 ? "no" : "yes");

if(isset($aDocumentsVersion[$index]))
{
	$aDocumentsVersion[$index]['img'] = getImage("img/version/" . $aDocumentsVersion[$index]['idDocumentVersion']);

	$aResponse['doc'] = $aDocumentsVersion[$index];
}

print json_encode($aResponse, JSON_PRETTY_PRINT);


?>
