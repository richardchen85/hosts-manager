#!/bin/bash

cd ../out
FILE=`ls`
for i in $FILE
do
    zip -r $i.zip $i
done
