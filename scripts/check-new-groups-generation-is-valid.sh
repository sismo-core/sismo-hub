#!/bin/bash

# Checks that new group generators are valid 
# to be run by the CI on a new pull request

main() {
  new_group_generators=$(git diff origin/main HEAD -- group-generators/generators/index.ts | grep '^+import ' | awk '{print $2}')
  nb_of_new_group_generators=$(echo $new_group_generators | wc -w)

  if [ $nb_of_new_group_generators -eq 0 ]; then
    echo "No new group generator to check"
    exit 0
  fi

  echo -e "Checking that the following group generators are valid: \n$new_group_generators"

  for group_generator in $new_group_generators; 
    do 
    yarn generate-group $group_generator; 
    if [ $? -ne 0 ]; then
      echo "Group generator '$group_generator' is not valid";
      exit 1
    fi
  done

  exit 0
}

main