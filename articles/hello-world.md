---
title: Hello World
description: A first post introducing this articles section and what to expect here.
date: 2025-11-10
---

# Hello World

Welcome to the articles section of my site. This is where I plan to write about things I find interesting: reliability engineering, infrastructure automation, and the occasional side project deep-dive.

## What to Expect

Posts here will mostly cover topics I run into day-to-day as a Lead SRE:

- Kubernetes operations and debugging
- Infrastructure as code with Terraform
- Automation with Ruby, Python, and JavaScript
- Cloud platforms (AWS and GCP)
- Incident response and postmortems

## A Quick Code Example

Here is a simple shell snippet I use to quickly check which pods are not in a `Running` state across all namespaces:

```bash
kubectl get pods --all-namespaces --field-selector=status.phase!=Running
```

And a Ruby one-liner to parse a log file and extract lines with errors:

```ruby
File.readlines('app.log').select { |l| l.match?(/ERROR|FATAL/) }.each { |l| puts l }
```

## Why Markdown?

The articles on this site are plain Markdown files stored in the repository. No CMS, no database — just files and a small build step that generates an index. It keeps things simple and easy to version-control.

That is about it for now. More posts coming soon.
