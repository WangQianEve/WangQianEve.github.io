#!/usr/bin/python

import sys, os
import re

def main(path):
	p = re.compile('.+\.png')
	v = re.compile('.+\.mov')
	for file in os.listdir(path):
		file = path + '/' + file
		if p.match(file):
			os.system('cwebp -q 80 %s -o %s.webp' % (file, file[:-4]))
			os.system('rm ' + file)
			print(file)
		if v.match(file):
			os.system('ffmpeg -i %s %s.mp4' % (file, file[:-4]))
			os.system('rm ' + file)
			print(file)

def file(path, file):
	file = path + '/'+ file
	os.system('ffmpeg -i %s %s.mp4' % (file, file[:-4]))
	if (file[-4:] != '.mp4'):
		os.system('rm ' + file)
	print(file)


if __name__ == "__main__":
   main(sys.argv[1])
   if (len(sys.argv) > 2):
   		file(sys.argv[1], sys.argv[2])