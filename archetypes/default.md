---
{{/* https://gohugo.io/functions/humanize/, https://gohugo.io/functions/title/ */}}
title: "{{ replace .Name "-" " " | title }}"
created: {{ .Date }}
date: 
draft: true
slug: {{ .Name }}
description: 
tags: []
---
