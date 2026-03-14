# Personal Homepage

A simple, clean personal homepage for Allister Antosik - Lead SRE with a background in Software Engineering.

The site automatically showcases GitHub starred repositories, updated nightly.

## Setup

1. Create a new repository named `yourusername.github.io` on GitHub
2. Push this code to the repository
3. Go to repository Settings > Pages
4. Under "Source", select the main branch
5. Your site will be live. 

## Automated Project Updates

The projects section is automatically updated from GitHub starred repositories:

- **Schedule**: Runs daily at midnight UTC
- **Trigger**: Can also be manually triggered from the Actions tab
- **Source**: Fetches all starred repositories from GitHub
- **Filtering**: Automatically excludes forks and archived repositories
- **Workflow**: `.github/workflows/update-starred-repos.yml`

The workflow commits changes directly to the repository when new starred repos are detected.
