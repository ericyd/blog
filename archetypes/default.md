---
{{/* https://gohugo.io/functions/humanize/, https://gohugo.io/functions/title/ */}}
title: "{{ replace .Name "-" " " | humanize }}"
date: {{ .Date }}
draft: true
slug: {{ .Name }}
---
