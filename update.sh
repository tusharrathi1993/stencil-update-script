#!/bin/bash

# Define color codes
GREEN=$(tput setaf 2)
RED=$(tput setaf 1)
YELLOW=$(tput setaf 3)
NC=$(tput sgr0)

# Function to execute before exit
cleanup_before_exit() {
    # Add your command(s) here
    echo "${GREEN}✨ Executing cleanup before exit... ✨${NC}"
    # command_to_run_before_exit
    rm -rf mtDep.json pk.json update.sh stencil-update-script
}

trap cleanup_before_exit EXIT

if ! command -v jq &> /dev/null
then
   echo "${YELLOW}💡 Installing jq 💡${NC}"
   brew install jq
fi

echo "${GREEN}🚀 Select a client to update packages: 🚀${NC}"
echo "${YELLOW}🔵 npm"
echo "${YELLOW}🟢 yarn"
echo "${YELLOW}🔴 pnp"
read -p "Enter your client to install packages: " clientToUse

if [[ $clientToUse != "yarn" && $clientToUse != "npm" && $clientToUse != "pnp" ]]; then
  echo "${RED}⚠️ Please provide client to install... npm | yarn | pnp ⚠️${NC}"
  exit 0
fi

echo "Using ${clientToUse} client"

dependencies=`jq '.dependencies' package.json`

echo $dependencies > mtDep.json
mtDep=`jq 'keys' mtDep.json`

echo $mtDep > mtDep.json
deps=`jq '.[] | select(test("^@mindtickle."))' mtDep.json`
echo $deps > mtDep.json

MODULE_LIST=$(sed -e 's/"//g' mtDep.json)

MODULE_TO_BE_INSTALL=""
MODULE_TO_BE_REMOVED=""
changeLogMapping=()

pacakgesToBeReplaced=("@mindtickle/tag @mindtickle/pill" "@mindtickle/tag-input @mindtickle/input-pill" "@mindtickle/tag-input-with-suggestions @mindtickle/input-pill-with-auto-suggestions" "@mindtickle/tags-by-category @mindtickle/pills-by-category" "@mindtickle/token @mindtickle/badge")

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
    printf "| %-50s | %-100s |\n" "${GREEN}🔍 Name${NC}" "${YELLOW}📄 Changelog Link${NC}"
    print_horizontal_line
}

# Function to print data rows in the table
print_table_data() {
    local name=$1
    local link=$2
    
    printf "| %-50s | %-100s |\n" "${GREEN}${name}${NC}" "${YELLOW}${link}${NC}"
}

get_replaced_package_name() {
    for entry in "${pacakgesToBeReplaced[@]}"; do
        read -r old new <<< "$entry"
        if [ "$old" == "$1" ]; then
            echo $new
            return
        fi
    done

    echo $1
    return
}

get_removed_package_name() {
    for entry in "${pacakgesToBeReplaced[@]}"; do
        read -r old new <<< "$entry"
        if [ "$old" == "$1" ]; then
            echo $old
            return
        fi
    done
}

echo "${GREEN}🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟${NC}"
for i in $MODULE_LIST
do  
   package=$(get_replaced_package_name "$i")
   MODULE_TO_BE_REMOVED="${MODULE_TO_BE_REMOVED} $(get_removed_package_name "$i")"
   
   echo "${YELLOW}📦 Fetching package information for $package${NC}"
   npm view ${package} dist-tags --json > pk.json
   stencilVersion=$(jq -r '.latest' pk.json)
   if [[ $stencilVersion == *"alpha"* && "${stencilVersion}" != "null" && "${stencilVersion}" != "" ]]; 
   then
      echo "${GREEN}🚀 DL Package with alpha version found for $package@$stencilVersion${NC}"
      componentName=$(kebab_to_camel "$package")
      changeLogMapping+=("$package@$stencilVersion https://gitlab.com/mindtickle/design-library/-/blob/$package@$stencilVersion/packages/$componentName/CHANGELOG.md")
      echo "${YELLOW}-------------------------------------------------------${NC}"
      MODULE_TO_BE_INSTALL="${MODULE_TO_BE_INSTALL} ${package}@^${stencilVersion}"
   else
      echo "${RED}🛑 DL Package with alpha version not found for $package.${NC}"
      echo "${YELLOW}-------------------------------------------------------${NC}"
   fi
done

if [[ $clientToUse == "npm" ]]
then
   echo "${RED}🔧 Installing using npm client...${NC}"
   echo "${GREEN}🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟${NC}"
   npm install ${MODULE_TO_BE_INSTALL}

   if [ -n "$(echo "$MODULE_TO_BE_REMOVED" | tr -d '[:blank:]')" ]; then
        npm uninstall ${MODULE_TO_BE_REMOVED}
   fi
fi

if [[ $clientToUse == "yarn" ]]
then
   echo "${RED}🔧 Installing using yarn client...${NC}"
   echo "${GREEN}🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟${NC}"
   yarn add ${MODULE_TO_BE_INSTALL}
   if [ -n "$(echo "$MODULE_TO_BE_REMOVED" | tr -d '[:blank:]')" ]; then
        yarn remove ${MODULE_TO_BE_REMOVED}
   fi
fi

if [[ $clientToUse == "pnp" ]]
then
   echo "${RED}🔧 Installing using yarn-pnp client...${NC}"
   echo "${GREEN}🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟${NC}"
   yarn up ${MODULE_TO_BE_INSTALL}
   if [ -n "$(echo "$MODULE_TO_BE_REMOVED" | tr -d '[:blank:]')" ]; then
        yarn remove ${MODULE_TO_BE_REMOVED}
   fi
fi

# Print table headers
echo ""
print_horizontal_line
print_table_headers

# Loop through the data and print rows in the table
for entry in "${changeLogMapping[@]}"; do
    read -r name link <<< "$entry"
    print_table_data "$name" "$link"
done

print_horizontal_line

echo ""
echo "${GREEN}🎉 Congratulations! Successfully updated below DL packages to the latest stencil version.${NC}"
IFS=' ' read -ra modulesToInstall <<< "$MODULE_TO_BE_INSTALL"
for module in "${modulesToInstall[@]}"; do
    echo "   $module"
done

echo ""
if [[ -n "$(echo "$MODULE_TO_BE_REMOVED" | tr -d '[:blank:]')" ]]; then
    echo "${RED}📦 These packages will be removed and replaced with respective components from the application${NC}"

    IFS=' ' read -ra modulesToRemove <<< "$MODULE_TO_BE_REMOVED"
    for moduleRemove in "${modulesToRemove[@]}"; do
        echo "   $moduleRemove"
    done
    echo ""
fi


# Extract resolutions dependencies and filter by '@mindtickle.' prefix
jq -e '.resolutions' package.json > /dev/null
if [ $? -eq 0 ]; then
    resolutionsDependencies=$(jq -r '.resolutions | keys_unsorted | .[]' package.json | grep '^@mindtickle.')
    # Remove double quotes from the result
    resolutionsDependencies=$(echo "$resolutionsDependencies" | tr '\n' ' ')

    echo -e "🛑 ${YELLOW}You might need to check these dependencies present in the resolutions field coming from DL${NC}"

    IFS=' ' read -ra resolutionModule <<< "$resolutionsDependencies"
    for module in "${resolutionModule[@]}"; do
        echo "${RED}   $module${NC}"
    done
fi
echo ""