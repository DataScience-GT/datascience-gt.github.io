#!/bin/bash

base=$(dirname $0)/../

echo ${pwd}
echo "You are attempting to deploy the Data Science @ GT member portal to the Firebase hosting instance at https://datasciencegt.org"

read -p "Are you certain you want to deploy?" choice
echo

if [ ${choice} = "y" ]; then
    cd ${base}/frontend
    echo "Changed directory to $(pwd)"

    echo "Running tests..."
    npm run test

    echo "Creating production build..."
    npm run build

    cd ./../
    echo "Changed directory to $(pwd)"

    rm -rf public/

    echo "Moving build files into public/ ..."
    mv frontend/build public/

    firebase deploy --only hosting
fi