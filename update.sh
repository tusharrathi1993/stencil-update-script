#!/bin/sh

cleanup_before_exit() {
    # Add your command(s) here
    echo "Executing command before exit..."
    # command_to_run_before_exit
    rm -rf mtDep.json pk.json update.sh stencil-update-script
}

trap cleanup_before_exit EXIT

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

  exit 0
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
changeLogMapping=()

kebab_to_camel() {
    componentName=$(split_string "$1" "/")
    local string="$componentName"
    local IFS='-'
    read -ra words <<< "$string"
    printf "%s" "${words[0]}"
    for ((i = 1; i < ${#words[@]}; i++)); do
        printf "%s" "$(tr '[:lower:]' '[:upper:]' <<< ${words[i]:0:1})${words[i]:1}"
    done
    echo ""
}

capitalize_first_letter() {
    local string="$1"
    local first_letter="$(echo "${string:0:1}" | tr '[:lower:]' '[:upper:]')"
    echo "$first_letter${string:1}"
}

split_string() {
    local string="$1"
    local delimiter="$2"
    
    IFS="$delimiter" read -ra parts <<< "$string"
    capitalized_string=$(capitalize_first_letter "${parts[1]}")
    echo $capitalized_string
}

print_horizontal_line() {
    printf "+----------------------+----------------------+----------------------+----------------------+----------------------+----------------------+\n"
}

# Function to print table headers
print_table_headers() {
    printf "| %-50s | %-100s |\n" "Name" "Changelog Link"
    print_horizontal_line
}

# Function to print data rows in the table
print_table_data() {
    local name=$1
    local link=$2
    
    printf "| %-50s | %-100s |\n" "$name" "$link"
    print_horizontal_line
}

echo "........................................"
for i in $MODULE_LIST
do  
   echo `npm view ${i} dist-tags --json` > pk.json
   stencilVersion=`jq -r '.latest' pk.json`
   if [[ $stencilVersion == *"alpha"* && "${stencilVersion}" != "null" && "${stencilVersion}" != "" ]]; 
   then
      
      echo "DL Package with alpha version found for $i@$stencilVersion"
      componentName=$(kebab_to_camel "$i")
      changeLogMapping+=("$i@$stencilVersion https://gitlab.com/mindtickle/design-library/-/blob/$i@$stencilVersion/packages/$componentName/CHANGELOG.md")
      echo "........................................"
      MODULE_TO_BE_INSTALL="${MODULE_TO_BE_INSTALL} ${i}@^${stencilVersion}"
   else
      echo "DL Package with alpha version not found for $i."
   fi
done

# Print table headers
print_table_headers

# Loop through the data and print rows in the table
for entry in "${changeLogMapping[@]}"; do
    read -r name link <<< "$entry"
    print_table_data "$name" "$link"
done

# Print final horizontal line as a separator
print_horizontal_line

echo "........................................"
echo "These packages will be updated to latest version"
echo $MODULE_TO_BE_INSTALL
echo "........................................"

if [[ $1 == "npm" ]]
then
   echo "Installing using npm client.........."
   echo "........................................"
   npm install ${MODULE_TO_BE_INSTALL}
fi

if [[ $1 == "yarn" ]]
then
   echo "Installing using yarn client.........."
   echo "........................................"
   yarn add ${MODULE_TO_BE_INSTALL}
fi

if [[ $1 == "pnp" ]]
then
   echo "Installing using yarn-pnp client.........."
   echo "........................................"
   yarn up ${MODULE_TO_BE_INSTALL}
fi

echo "........................................"
echo "Congratulations !!!! Successfully updated all DL packages to latest stencil version."
echo "........................................"

rm -rf mtDep.json pk.json update.sh stencil-update-script