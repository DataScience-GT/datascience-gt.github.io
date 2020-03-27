---
id: deployment
title: The Deployment Process
sidebar_label: The Deployment Process
---

The deployment process currently happens using a Bash script. The script is located in ```scripts/deploy.sh```. The script performs the following actions:

1. Moves into  the ```frontend``` directory.
2. Runs the command ```npm test``` (note that we need to hit the 'a' key to run all tests and ensure that they pass before moving forward).
3. Runs the command ```npm run build```, which creates an optimized production build contained in ```frontend/build```. 
4. Moves into the root directory.
5. Removes all content from the ```public/``` folder (which contains all the assets and build files that will be deployed to Firebase Hosting).
6. Copies everything from ```frontend/build``` into ```public/```.
7. Runs the command ```firebase deploy --only hosting```.

**Note**:  that Step 7 can be modified to deploy any new cloud functions that the portal needs in the future. For more on this, refer to this [page](https://firebase.google.com/docs/hosting/deploying). 