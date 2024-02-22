# Step 1
# Install this package globally

# For node version 12.x
npm i npm-check-updates@11.8.5 -g

# For node version 14.x onwards
npm i npm-check-updates@latest -g
 
# ------------------------------------------------

# Step 2

# Then run this command. This will speed up your dependency update time by almost 10x in all applications saving time to do more things
ncu "/^@mindtickle\/.*$/" -p yarn --filterVersion /^(.*alpha).*$/ -t latest --deep --concurrency 12 --dep dev,peer,prod

# ------------------------------------------------

# Step 3
# Based on your npm client, just run install command

eg: yarn install / npm install / yarn