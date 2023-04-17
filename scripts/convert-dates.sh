#!/bin/sh

for post in content/*; do
  echo $post
  basic_date=$(head -10 "$post" | grep 'date:\s.*' | sed  's/date: //')
  # echo $basic_date
  published_date=$(gdate -d "$basic_date" +%FT%TZ)
  gsed -i "s/$basic_date/$published_date/" $post
  # echo $published_date
done