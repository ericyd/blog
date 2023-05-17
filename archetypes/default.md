---
{{/* https://gohugo.io/functions/humanize/, https://gohugo.io/functions/title/ */}}
title: "{{ replace .Name "-" " " | humanize }}"
created: {{ .Date }}
date: 
draft: true
slug: {{ .Name }}
description: 
tags: []
---
