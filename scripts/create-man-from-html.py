#!/usr/bin/env python3
#coding: utf-8

import os
from bs4 import BeautifulSoup, Doctype
import subprocess

def extract_content_from_hugohtml(input_file):

    global errors

    ## Open and parse file
    inputhtml = open(input_file, 'r+', encoding="utf8")
    htmlcontent = BeautifulSoup(inputhtml, "html.parser")

    inputhtml.close()

    ## Extract <div class="td-content">
    return htmlcontent.find('div', attrs={"class":"td-content"})

def create_sanitized_html_content(rawhtml):

    global unix_name, section

    ## Create doctype
    ## Create html
    ## Add head and title
    ## Add body
    xhtml_template = '''<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
  <title></title>
</head>
<body>
</body>
</html>'''
    sanitized_html_content = BeautifulSoup(xhtml_template, "lxml")

    ## Add the relevant content from the original html
    sanitized_html_content.body.insert(1, rawhtml)

    ## Add title to head?
    sanitized_html_content.head.title.insert(1, sanitized_html_content.body.h1)

    ## Use absolute links when linking to other parts of the docs
    for entry in sanitized_html_content.find_all('a'):
        if entry['href'].startswith('/docs/'):
            entry['href'] = 'https://axoflow.com' + entry['href']

    ## Add meta info to html that the conversion xslt can use
    ## <xsl:if test="../xhtml:head/xhtml:meta[@name='unix_name']">
    new_tag = sanitized_html_content.new_tag("meta", unix_name=unix_name)
    sanitized_html_content.head.insert(2, new_tag)
    
    new_tag = sanitized_html_content.new_tag("meta", section=section)
    sanitized_html_content.head.insert(2, new_tag)

    ## <xsl:if test="../xhtml:head/xhtml:meta[@name='author']">
    new_tag = sanitized_html_content.new_tag("meta", author="Axoflow")
    sanitized_html_content.head.insert(2, new_tag)

    return sanitized_html_content


def convert_html_to_man(rawhtml, original_file, output_dir):

    global unix_name, section

    # Create output dir
    subprocess.run(["mkdir", '-p', output_dir])

    # Create output filename
    base_filename = os.path.split(os.path.dirname(original_file))[1]
    output_html_file = os.path.join(output_dir, base_filename + '.html')

    # print(output_html_file)

    # Write input html to file
    htmlfile = open(output_html_file, 'w', encoding="utf8")
    htmlfile.write(str(rawhtml))
    htmlfile.truncate()
    htmlfile.close()

    ## use xsltproc xhtml2man as subprocess
    ## $ xsltproc xhtml2man.xslt input.xhtml > output.7
    result = subprocess.run(["xsltproc", 'scripts/xhtml2man.xslt', output_html_file],
                            capture_output = True,
                            text = True)
    # print(result.stdout)
    if len(result.stderr) > 0:
        print('Error converting', original_file, ' : ', result.stderr)

    ## Remove empty lines
    result.stdout = os.linesep.join([s for s in result.stdout.splitlines() if s])

    ## Fix man page header (footer doesn't seem to work, so it's left empty)
    ## .TH [name of program] [section number] [center footer] [left footer] [center header]
    old_header = str(result.stdout.split("\n")[0])
    result.stdout = result.stdout.replace(old_header, '.TH "' + unix_name + '"' + section + ' "" "" ' + unix_name)

    ## FIXME skip linebreaks after bullets

    ## Write output to manpage file
    manfile = open(os.path.join(output_dir, base_filename), 'w', encoding="utf8")
    manfile.write(result.stdout)
    manfile.truncate()
    manfile.close()
    
    ## Delete html file
    subprocess.run(["rm", output_html_file])

global errors, unix_name, section
errors = []
unix_name = ""
section = 0

# Process manpages files
print("Processing manpages files")

input_manpage_dir = "manpages/app-man-syslog-ng"
output_manpage_dir = "manpages/syslog-ng-manpages"

for root, dirs, files in os.walk(input_manpage_dir):
    for file in files:
        input_manpage_dir = os.path.join(os.getcwd(), root, file)
        
        # Create hugo path, cut .tmp and .htm, replace with .md
        processing_html = os.path.join(os.getcwd(), root, file)

        base_filename = os.path.split(os.path.dirname(processing_html))[1]
        # Skip _print directory and the root index.html
        if "_print" in processing_html or 'app-man-syslog-ng' in base_filename:
            continue

        print(processing_html)

        ## Create file metadata
        unix_name = base_filename.split(".")[0]
        section = base_filename.split(".")[1]

        hugo_content_for_man_page = extract_content_from_hugohtml(processing_html)
        if len(hugo_content_for_man_page) < 1:
            print("ERROR Couldn't properly extract content from ", processing_html)
        html_content_for_man_page = create_sanitized_html_content(hugo_content_for_man_page)
        if len(html_content_for_man_page) < 1:
            print("ERROR Creating sanitized content failed ", processing_html)
        # print(html_content_for_man_page)
        convert_html_to_man(html_content_for_man_page, processing_html, output_manpage_dir)

print("Output files")
subprocess.run(["ls", output_manpage_dir])

# print(len(errors))
