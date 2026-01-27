#!/bin/bash

cd /Users/masha/Downloads/startbootstrap-bare-gh-pages/videos

for i in {1..50}; do
    echo -n "Обработка видео $i... "
    ~/bin/ffmpeg -i "$i.mp4" -c:v copy -an -y "${i}_temp.mp4" 2>/dev/null
    mv "${i}_temp.mp4" "$i.mp4"
    echo "✓"
done

echo "Готово! Звук удален из всех видео."
