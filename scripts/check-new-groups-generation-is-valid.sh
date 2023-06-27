#!/bin/bash

# Checks that new group generators are valid 
# to be run by the CI on a new pull request

MAX_NB_OF_GROUP_GENERATORS_TO_CHECK=20

computeNbOfNewGroupGenerators() {
  new_group_generators=$@
  nb_of_new_group_generators=$(echo $new_group_generators | wc -w)

  if [ $nb_of_new_group_generators -eq 0 ]; then
    echo "No new group generator to check"
    exit 0
  fi

  # to avoid spamming the CI with too many group generators in a single PR
  if [ $nb_of_new_group_generators -gt $MAX_NB_OF_GROUP_GENERATORS_TO_CHECK ]; then
    echo "Too many new group generators to check: $nb_of_new_group_generators superior to $MAX_NB_OF_GROUP_GENERATORS_TO_CHECK (max allowed)"
    exit 0
  fi
}

generateGroup() {
  group_generator_name=$1
  echo "Checking that $group_generator_name is valid..."
  
  group_generation_output=$(yarn generate-group $group_generator_name;) 

  if [ $? -ne 0 ]; then
    echo -e "Group generator '$group_generator_name' is not valid\n";
    exit 1
  fi

  group_size=$(echo "$group_generation_output" | grep -o 'containing [0-9]* elements' | awk '{print $2}')
  echo -e "Group generator '$group_generator_name' is valid with $group_size elements✨\n";
}

main() {
  new_group_generators=$(git diff origin/main HEAD -- group-generators/generators/index.ts | grep '^+  "' | awk -F'"' '{print $2}')
  new_group_generators_filenames=$(git diff origin/main HEAD -- group-generators/generators/index.ts | grep '^+import ' | awk -F'"' '{print $2}' | awk -F'/' '{print $2}')

  # Check that there is at least one new group generator
  computeNbOfNewGroupGenerators $new_group_generators

  # generate the groups that the new group generators depend on
  for new_group_generators_filename in $new_group_generators_filenames; 
  do
    filename="group-generators/generators/${new_group_generators_filename}/index.ts"
    dependsOnGroup=$(grep "dependsOn" $filename | grep -o '".*"' | sed 's/"//g' | sed 's/,/ /g')
    if [ -n "$dependsOnGroup" ]; then
      for group in $dependsOnGroup; do
        echo "Group generator in '$filename' depends on '$group'"
        generateGroup $group
      done
    fi
  done

  # check that the new group generators are valid
  for group_generator_name in $new_group_generators; 
  do 
    generateGroup $group_generator_name
  done

  exit 0
}

main