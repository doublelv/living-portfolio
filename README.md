# Living Technical Portfolio

An interactive portfolio website to present my technical skills, engineering projects, practical labs, and evidence of completed work.

The goal is to create a portfolio that grows with my knowledge and provides a clear record of my technical development.

## Project Overview

The website will combine two ways to explore my work:

- **Interactive Skill Explorer:** An animated, game-like interface where visitors can select skills and inspect related labs, projects, and results.
- **Traditional Portfolio:** Direct access to project pages, technical skills, and a professional CV.

Both interfaces will use the same content.

## Planned Features

### Skills and Work
- Track skills as Interested, Learning, or Demonstrated.
- Document practical exercises and technical projects.
- Link skills to labs, studies, projects, and artwork. Approve proof for each skill separately.
- Display code, screenshots, diagrams, and test results.
- Present larger pieces alongside independently authored child entries.

### Interactive Website
- Animated skill explorer with interactive panels.
- Detailed skill, lab, and project views.
- Direct URLs for individual records.
- Responsive design and accessible navigation.

### Automated CV
- Generate an online CV for the first release.
- Include demonstrated skills backed by approved, completed work.
- Use the same source data as the portfolio.
- Add a downloadable CV generated with Typst in a later release.

### Development and Deployment
- Maintain content using Markdown files in VS Code or Obsidian.
- Validate content and references before publication.
- Use automated builds and deployment.
- Support preview releases before production.
- Track development through GitHub Projects.

## Project Structure

The initial repository will contain the project documentation. The source code and other directories will be added as development progresses.

```text
portfolio-website/
├── README.md
├── docs/
│   └── project-scope.md
└── .gitignore
```

## Technology Stack

The site uses Astro, TypeScript, and Markdown with YAML frontmatter. The [architecture plan](docs/architecture.md) explains the content model, validation, testing, deployment, and implementation sequence.

## Development Approach

The project will follow an iterative development process with defined requirements, implementation tasks, testing, and verification.

AI tools may assist with planning, research, code generation, debugging, and review. The project will also serve as an opportunity to develop my own programming and system design skills.

Development tasks and progress will be tracked using GitHub Projects.

## Local development

Requires Node.js 26.13.1 or newer.

From the repository root, enter the Astro project directory and install dependencies:

```powershell
cd astro
npm ci
```

Run these commands from `astro/`:

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the development server and see changes as you save. |
| `npm run build` | Generate the production build. |
| `npm run preview` | Preview the production build locally after building. |

Open the local URL printed by the dev or preview command.

## Current Status

The Astro project is set up in `astro/`, and the homepage has its first heading. The current milestone is to add a short introduction and verify the homepage in the local production preview.

See the [Project Scope](docs/project-scope.md) for the full requirements and planned features.