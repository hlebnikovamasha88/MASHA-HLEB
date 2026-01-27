#!/usr/bin/env python3
from moviepy.editor import VideoFileClip
import os
from pathlib import Path

video_dir = Path('/Users/masha/Downloads/startbootstrap-bare-gh-pages/videos')
video_files = sorted([f for f in video_dir.glob('*.mp4') if f.name[0].isdigit()])

print(f"Found {len(video_files)} video files to process")

for i, video_file in enumerate(video_files, 1):
    try:
        print(f"[{i}/{len(video_files)}] Processing {video_file.name}...", end=' ')
        
        # Load video
        clip = VideoFileClip(str(video_file))
        
        # Remove audio
        clip_no_audio = clip.without_audio()
        
        # Overwrite original file
        clip_no_audio.write_videofile(str(video_file), verbose=False, logger=None, codec='libx264', audio=False)
        
        print("✓")
    except Exception as e:
        print(f"✗ Error: {e}")

print("Done! All videos have been processed.")
