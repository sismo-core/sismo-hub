#!/bin/bash

# Checks that new group generators check conditions
# to be auto merge

MAX_GENERATION_TIME=600 # in seconds
MAX_ACCOUNTS=100000

start_time=$(date +%s)
group_generation_output=$(yarn check-new-groups-generation)
end_time=$(date +%s)

generation_time=$((end_time - start_time))
if [ "$generation_time" -gt "$MAX_GENERATION_TIME" ]; then
    echo "Generation of groups took more than $MAX_GENERATION_TIME seconds"
    exit 1
fi

total_accounts=$(echo "$group_generation_output" | grep -o 'with [0-9]* elements' | awk '{sum += $2} END {print sum}')
total_accounts=${total_accounts:-0}

if [ "$total_accounts" -gt "$MAX_ACCOUNTS" ]; then
    echo "Too many accounts to be auto-merged."
    exit 1
fi

group_generation_output=$(echo "$group_generation_output" | tail -n +2)
echo $group_generation_output

if [[ $group_generation_output != *"No new group generator to check"* ]]; then
  echo -e "New groups check all conditions to be merged ✨\n";
fi