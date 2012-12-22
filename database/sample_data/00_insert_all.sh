#!/bin/bash

echo ""
echo "Executing all SQL sample data queries."

echo ""
echo "* WARNING                                  *"
echo "* YOU MUST DROP ALL TABLES BEFORE RUNNING  *"
echo "* THIS OR THE IDS WILL NOT MATCH UP.       *"
echo "* TRUNCATING THE TABLES IS NOT SUFFICIENT. *"
echo ""

read -p "Are you sure you want to continue? (y/n)" -n 1 -r
if [[ $REPLY =~ ^[Yy]$ ]]
then
	for f in *.sql
	do
		echo "    - $f"
		mysql -uagility -pagility agility < $f
	done
else
        echo ""
        echo "-- Aborted --"
        echo ""
fi