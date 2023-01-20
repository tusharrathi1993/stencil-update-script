#!/bin/sh
if ! command -v jq &> /dev/null
then
   echo "........................................"
   echo "Installing jq"
   echo "........................................"
   brew install jq
fi

if [[ "$1" == "" ]]
then
  echo "........................................"
  echo "Please provide client to install... npm | yarn | pnp"
  echo "........................................"
  exit
fi

echo "Using ${1} client"

dependencies=`jq '.dependencies' package.json`

echo $dependencies > mtDep.json
mtDep=`jq 'keys' mtDep.json`

echo $mtDep > mtDep.json
deps=`jq '.[] | select(test("^@mindtickle."))' mtDep.json`
echo $deps > mtDep.json
# | . + "@stencil" -- To append @stencil at the end

echo $MODULE_LIST
MODULE_LIST=$(sed -e 's/"//g' mtDep.json)

MODULE_TO_BE_INSTALL=""

for i in $MODULE_LIST
do  
    echo `npm view ${i} dist-tags --json` > pk.json
    stencilVersion=`jq -r '.stencil' pk.json`
    if [[ "${stencilVersion}" != "null" && "${stencilVersion}" != "" ]]
    then
      echo "$i@$stencilVersion"
      MODULE_TO_BE_INSTALL="${MODULE_TO_BE_INSTALL} ${i}@${stencilVersion}"
    fi
done

echo $MODULE_TO_BE_INSTALL

if [[ $1 == "npm" ]]
then
   echo "........................................"
   echo "Installing using npm client.........."
   echo "........................................"
   npm install ${MODULE_TO_BE_INSTALL}
fi

if [[ $1 == "yarn" ]]
then
   echo "........................................"
   echo "Installing using yarn client.........."
   echo "........................................"
   yarn add ${MODULE_TO_BE_INSTALL}
fi

if [[ $1 == "pnp" ]]
then
   echo "........................................"
   echo "Installing using yarn-pnp client.........."
   echo "........................................"
   yarn up ${MODULE_TO_BE_INSTALL}
fi

echo "........................................"
echo "Congratulations !!!! Successfully updated all DL packages to latest stencil version."
echo "........................................"

rm -rf mtDep.json pk.json update.sh stencil-update-script