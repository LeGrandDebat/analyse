Les analyses se font sous forme de requêtes sur la base de données.
Les données obtenus à l'adresse https://granddebat.fr/pages/donnees-ouvertes sont importées dans une base de données mongondb, sous plusieurs collections: ecologie, fiscalite, democratie, etat, evenement.
Les données sont structurées sous format Json, et donc faciles à importer sous mongodb. Si vous souhaiter importer les données dans votre propre base de données, les étapes sont les suivantes:
1. Installer Mondodb, la version la plus récente.
2. Sous linux, ouvrir un terminal, et pour importer la bdd sous la collection ecologie, entrer:
	 ```
	 mongoimport --db legranddebat --collection ecologie --jsonArray LA_TRANSITION_ECOLOGIQUE.json
	 ```
3. Vous devrier voir la collection ecologie listant plusieurs objets.
4. L'étapes suivante est de relier la bdd avec une api Rest, pour faciliter la création de requêtes (et aussi parce que ça avait l'air cool de procéder comme ça!).
