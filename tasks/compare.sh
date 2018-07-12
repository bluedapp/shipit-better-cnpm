#!/bin/bash

cd $1

flags=$5
cli=$4
cnpm=$3
file=$2
file_diff="$1/cache"
cache_package="$1/cache/package.json"

if [ -d $file_diff ]
	then
		echo "$file_diff exists."
	else
		mkdir $file_diff
		echo "can't find $file_diff, create directory."
fi

if [ -f $cache_package ]
	then
		echo "$file_diff/package.json exists."
	else
		cp -f $file/package.json $file_diff/package.json
		rm -rf $file_diff/node_modules
		cd $file_diff && $cnpm $cli $flags
		echo "can't find $file_diff/package.json, copy file and run $cnpm $cli $flags."
fi

diff $file/package.json $file_diff/package.json

if [ $? -eq 0 ]
	then
		cp -r $file_diff/node_modules/. $file/node_modules/
		echo "copy node_modules to $file."
	else
		cp -f $file/package.json $file_diff/package.json
		rm -rf $file_diff/node_modules
		rm -rf $file_diff/package-lock.json
		cd $file_diff && $cnpm $cli $flags
		cp -r $file_diff/node_modules/. $file/node_modules/
		echo "$cnpm $cli $flags and copy node_modules to $file."
fi