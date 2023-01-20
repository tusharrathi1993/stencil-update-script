#!/bin/sh
if ! command -v jq &> /dev/null
then
    echo "Installing jq"
    brew install jq
fi

if [[ "$1" == "" ]]
then
  echo "Please provide client to install... npm | yarn | pnp"
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
    echo `npm view @mindtickle/action-link dist-tags --json` > pk.json
    stencilVersion=`jq -r '.stencil' pk.json`
    if [[ "${stencilVersion}" != "null" && "${stencilVersion}" != "" ]]
    then
      echo "$i@$stencilVersion"
      MODULE_STR="${MODULE_TO_BE_INSTALL} ${i}@${stencilVersion}"
    fi
done

echo $MODULE_TO_BE_INSTALL

if [[ $1 == "npm" ]]
then
   echo "Installing using npm client.........."
   npm install ${MODULE_STR}
fi

if [[ $1 == "yarn" ]]
then
   echo "Installing using yarn client.........."
   yarn add ${MODULE_STR}
fi

if [[ $1 == "pnp" ]]
then
   echo "Installing using yarn-pnp client.........."
   yarn add ${MODULE_STR}
fi

