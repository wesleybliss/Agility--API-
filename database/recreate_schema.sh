#!/bin/bash

myex() {
	mysql -uagility -pagility $1 -e "$2"
}

echo ""
echo "Recreate Agility Database Schema"

echo ""
echo "* WARNING                                *"
echo "* This will DROP the entire database and *"
echo "* recreate it from the SQL schema file.  *"
echo ""

read -p "Are you sure you want to continue? (y/n)" -n 1 -r
if [[ $REPLY =~ ^[Yy]$ ]]
then
	echo ""
	echo "    - Dropping all tables"
	#TABLES=$(mysql -uagility -pagility agility -e 'SHOW TABLES' | awk '{ print $1}' | grep -v '^Tables')
	#for t in $TABLES
	#do
	#	echo "           - $t"
	#	myex "DROP TABLE $t"
	#done
	myex "" "DROP DATABASE IF EXISTS agility;"
	#myex "" "CREATE DATABASE IF NOT EXISTS agility;"
	echo "    - Recreating table structures"
	mysql -uagility -pagility < Agility.schema.sql
else
	echo ""
	echo "-- Aborted --"
	echo ""
fi