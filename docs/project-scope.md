# Living Technical Portfolio

Project scope and implementation handoff

- **Version** 1.1
- **Date** 2026-11-14
- **Status** Repository initialization and technology selection

## Release planning update

See [the architecture plan](architecture.md) for the selected stack and current release plan.
The first release includes the online CV. Build-generated PDF work and
the stable PDF download URL are deferred to a later release using Typst.

## 0. PURPOSE

This document defines the scope, requirements, subsystems,
technical challenges, and development process for the
Living Technical Portfolio project.

It is intended for use in future AI conversations to:

- Compare complete technology stacks.
- Define the software architecture.
- Plan development tasks.
- Select development tools.
- Implement and test the system in small stages.

Do not treat proposed technologies as selected technologies.

The README.md file is the public project introduction.
This document is the technical source of requirements.

## 1. PROJECT VISION

Build a living technical portfolio that grows as the owner
learns new technical skills and completes practical work.

The portfolio will demonstrate technical ability through
documented labs, projects, source code, test results, and
other evidence.

The website itself will also be a technical project.

The primary learning interests include:

- Linux and system administration
- Networking and servers
- Automation and scripting
- Programming and software development
- Engineering and system design
- Other technical subjects added over time

The system must support two complementary experiences:

### A. INTERACTIVE EXPERIENCE

An animated, game-like skill explorer with floating or
rotating skill objects.

Selecting a skill opens a large interactive panel that
shows related labs, projects, and evidence.

### B. CONVENTIONAL EXPERIENCE

Normal website pages with direct links to skills, labs,
projects, and the CV.

Both experiences use one shared content source.

## 2. DEVELOPMENT PRINCIPLES

- Start with one GitHub repository.
- Keep the technology stack open until evaluation.
- Use free or inexpensive tools where practical.
- Write content in VS Code and/or Obsidian.
- Prefer portable text files and structured metadata.
- Keep source code and generated output separate.
- Use automated builds and preview deployments.
- Test changes before publishing them.
- Keep the project easy to maintain and extend.
- Avoid unnecessary services and infrastructure.
- Implement the system in small, testable stages.

Use a lightweight V-model approach:

Needs -> Requirements -> Architecture -> Implementation

Verify the work through:

Unit tests -> Integration tests -> System tests ->
User acceptance tests

Use requirement IDs and acceptance criteria where useful.

### AI ASSISTANCE

The owner wants to learn and develop real technical skills.

AI can assist with:

- Research and technology comparisons
- Architecture and task planning
- Initial interface scaffolding
- Code explanations and debugging
- Test design and code review
- Documentation

The owner can personally implement selected subsystems.

The exact division of work is not yet fixed.

AI-generated code must be reviewed, tested, and understood
before adoption.

## 3. SUBSYSTEM: CONTENT MANAGEMENT

### IN SCOPE

- Markdown-based content authoring.
- Structured metadata for content records.
- Editing through VS Code and Obsidian.
- Git version control for content.
- One canonical record per item.
- Draft and published content states.
- Stable IDs and URLs.
- Automatic generation of pages from records.

### REQUIRED CONTENT TYPES

### SKILL
- ID
- Name
- Category
- Status
- Summary
- Description
- Optional tool IDs for skill previews
- Related work derived from work-to-skill links
- Last update

### WORK ENTRY
- ID, slug, title, and kind such as Lab, Study, Project, or Artwork
- Completion and publication status, with dates for sorting
- Optional parent, cover image, course reference, and skill links
- Flexible Markdown write-up with supporting material
- Optional owner-approved proof explanation on each skill link

### PROFILE
- Contact information
- Professional summary
- Education
- Experience
- CV configuration

### TECHNICAL CHALLENGES

- Select metadata format.
- Define schemas and validation rules.
- Define record IDs and URL slugs.
- Resolve relationships between records.
- Manage media files and paths.
- Prevent draft content from being published.

### OUT OF INITIAL SCOPE

- Database-backed content management.
- Custom browser-based content editor.
- Multi-user authoring.
- Real-time content synchronization.

## 4. SUBSYSTEM: SKILLS AND LEARNING PROGRESS

### IN SCOPE

Each skill has one of three states:

### INTERESTED
A subject the owner may learn in the future.

### LEARNING
A subject the owner is actively studying.

### DEMONSTRATED
A skill explicitly marked Demonstrated by the owner and supported
by an approved link from a completed, published work entry.

### REQUIREMENTS

- Show skill states on the website.
- Link skills to any kind of work entry.
- Support multiple work entries per skill and multiple skills per entry.
- Include every valid demonstrated skill in the CV.
- Exclude interested and learning skills from the
  demonstrated CV skills section.
- Require owner approval and a proof explanation per qualifying skill link.
- Accept the write-up itself as proof. Files and links are optional.
- Validate these conditions before publication.

### TECHNICAL CHALLENGES

- Validate skill status.
- Validate linked evidence.
- Keep CV summaries readable.
- Prevent unsupported skill claims.

### OUT OF SCOPE

- Automatic proficiency scores.
- AI-generated skill ratings.
- Automatic expert or mastery claims.

## 5. SUBSYSTEM: LABS, PROJECTS, AND EVIDENCE

### IN SCOPE

Work entries share one content model. Labs, projects, studies,
and artworks use labels suited to the work. A parent entry can
present the overall story and link to independently authored children.

Write-ups can use Markdown sections for the objective, motivation,
method, tests, results, and lessons learned as useful to the entry.
An entry may combine several images, downloads, links, and explanations.

### SUPPORTED EVIDENCE

- Images and screenshots
- Diagrams
- Source code links
- Configuration files
- Logs
- Test results
- Tables and measurements
- Reports
- External resources

Support nested sections and independently published child entries.
Each public work entry has one canonical direct URL under /work.

### TECHNICAL CHALLENGES

- Many-to-many relationships.
- Nested content representation.
- Media handling.
- Evidence display components.
- Broken links and circular references.
- Large file storage.

### OUT OF INITIAL SCOPE

- Custom simulation tools for every lab.
- Complex interactive demonstrations for all projects.
- Advanced dependency visualization.

## 6. SUBSYSTEM: ANIMATED SKILL EXPLORER

### IN SCOPE

The homepage will include an animated skill explorer.

Skills can appear as moving, floating, or rotating objects.

When a visitor selects a skill:

1. Motion pauses or changes focus.
2. The selected skill becomes prominent.
3. A large information panel opens.
4. Related labs and projects become accessible.
5. Selecting a lab opens a detailed inspection view.

The lab view can include:

- Overview
- Work steps
- Evidence
- Results

Visitors must be able to return to the previous view.

### REQUIREMENTS

- Interactive skill selection.
- Large expandable panels.
- Clear navigation.
- Responsive layout.
- Keyboard access.
- Reduced-motion support.
- Acceptable performance on mobile devices.

### TECHNICAL CHALLENGES

- Select animation technology.
- Manage animation state.
- Manage panel transitions.
- Connect panel state to URLs.
- Handle keyboard and touch input.
- Control performance and power use.

### OPEN DECISIONS

- CSS, SVG, Canvas, WebGL, or hybrid.
- 2D, 2.5D, or 3D presentation.
- Animation and component libraries.

### OUT OF INITIAL SCOPE

- Full VR application.
- Immersive 3D world.
- Complex physics simulation.
- Mandatory 3D navigation.

## 7. SUBSYSTEM: CONVENTIONAL WEBSITE

### IN SCOPE

Suggested routes:

```text
/                  Homepage and explorer
/skills            Skill list
/skills/{slug}     Skill detail
/labs              Lab list
/work              All work
/work/{slug}       Canonical work detail
/projects          Project gallery
/cv                Online CV
/cv.pdf            Latest approved CV PDF
```

### REQUIREMENTS

- Direct links to public content.
- Standard navigation.
- Browser back and forward support.
- Responsive pages.
- Accessible content.
- Shareable URLs.
- Selected projects on the homepage.

### TECHNICAL CHALLENGES

- Static route generation.
- Deep linking.
- Client-side navigation.
- Search engine metadata.
- Shared components and layouts.

### OUT OF INITIAL SCOPE

- Visitor accounts.
- Public comments.
- Social features.
- Personalized visitor dashboards.

## 8. SUBSYSTEM: AUTOMATED CV

### IN SCOPE

Generate an online CV and a downloadable PDF from
the same approved source data.

The CV contains:

- Professional profile
- Contact information
- Education
- Work experience
- Selected projects
- All valid demonstrated skills

The PDF must be generated during the build process.

Do not generate the PDF separately for every visitor.

### REQUIREMENTS

- One source of CV data.
- Automatic selection of demonstrated skills.
- Validation of supporting evidence.
- Readable grouping of skills.
- Stable PDF download URL.
- Consistent online and PDF content.
- Owner approval of professional claims.

### TECHNICAL CHALLENGES

- Select PDF generation technology.
- Convert structured records into CV sections.
- Manage pagination.
- Preserve readable layouts.
- Support clickable portfolio links.
- Generate reproducible output in CI.

### CANDIDATE TECHNOLOGIES

- Typst
- LaTeX
- HTML-to-PDF
- Other suitable tools

No PDF technology has been selected.

### OUT OF INITIAL SCOPE

- Visitor-specific PDF generation.
- Multiple job-specific CV templates.
- Public archive of every CV version.
- Online CV editing interface.

## 9. SUBSYSTEM: VALIDATION AND TESTING

### IN SCOPE

Automated checks must detect:

- Missing required fields.
- Duplicate record IDs.
- Broken internal links.
- Missing referenced labs or skills.
- Invalid skill states.
- Demonstrated skills without valid evidence.
- Missing media files where validation is possible.
- Invalid publication states.
- Accidental publication of draft content.

Critical errors must stop publication.

The previous successful production release must remain
available if a new build fails.

### TEST TYPES

- Unit tests
- Integration tests
- Build validation
- Route tests
- CV generation tests
- Accessibility checks
- Responsive layout checks

### TECHNICAL CHALLENGES

- Select testing tools.
- Define error severity.
- Create test fixtures.
- Connect tests to CI.
- Define measurable acceptance criteria.

### OUT OF INITIAL SCOPE

- Enterprise testing infrastructure.
- Continuous browser monitoring.
- Formal certification.

## 10. SUBSYSTEM: BUILD SYSTEM

### IN SCOPE

One repository contains:

- Website source
- Content records
- Build scripts
- Validation tools
- CV template
- Tests
- Deployment configuration

The build process must:

1. Read source records.
2. Validate the content.
3. Resolve relationships.
4. Generate website pages.
5. Generate the CV PDF.
6. Run required checks.
7. Produce deployable static files.

The exact order of independent build and test steps
can be defined during implementation.

### REQUIREMENTS

- Local development and preview.
- Reproducible builds.
- Automated production builds.
- No manual upload for routine changes.
- Generated output separate from source files.

A small change, such as a typo correction, can trigger
a complete rebuild.

### OUT OF INITIAL SCOPE

- Separate website-builder repository.
- Always-running application server.
- Database as a requirement for initial deployment.
- Reverse conversion of built HTML into source content.

## 11. SUBSYSTEM: GIT AND DEVELOPMENT TRACKING

### AGREED DECISIONS

- Use Git for source version control.
- Host the repository on GitHub.
- Start with one repository.
- Use GitHub Issues and GitHub Projects for development.
- Keep the repository private initially.
- Make the repository public when appropriate.

### INITIAL REPOSITORY

portfolio-website/
|
|-- README.md
|-- docs/
|   |-- project-scope.md
|-- .gitignore

This is the initial structure, not the final architecture.

The README describes the project publicly.

The project-scope document defines technical requirements.

Source directories will be added after stack selection.

### DEVELOPMENT TRACKING

Use GitHub Projects as the main development board.

Suggested task states:

- Backlog
- Ready
- In Progress
- Review
- Testing
- Done

Tasks should contain:

- Title
- Description
- Subsystem
- Priority
- Assignee
- Dependencies where needed
- Acceptance criteria
- Verification steps
- Related commits or pull requests

The owner assigns and approves tasks.

AI may propose tasks, subtasks, acceptance criteria,
and verification procedures.

AI may assist with task updates when suitable access
and permissions are available.

### TASK AND COMMIT LINKS

Reference relevant GitHub Issues in commit messages.

Use pull requests to connect implementation work
with requirements and verification results.

Do not mark a task Done before its acceptance
criteria have been met.

For planning tasks, direct commits to main are acceptable.

For implementation, feature branches and pull requests
are preferred.

### PRIVACY

The repository is initially private.

A private GitHub Project does not make issues in a
public repository private.

When the repository becomes public, review the visibility
of issues, comments, and development records.

The task board can remain private.

### OUT OF INITIAL SCOPE

- Custom task-management application.
- Self-hosted issue tracker.
- Separate planning database.
- Complex team-management workflows.

## 12. SUBSYSTEM: CI/CD AND RELEASE MANAGEMENT

### IN SCOPE

- Automatic builds.
- Automated validation.
- Automated tests.
- Preview deployments.
- Production deployment after approval.
- Rollback to a working release.
- Separate preview and production URLs.

### SUGGESTED WORKFLOW

1. Create or select a development task.
2. Define acceptance criteria.
3. Create a feature branch.
4. Implement the change.
5. Run local tests.
6. Commit and push.
7. Open a pull request.
8. Run automated checks.
9. Inspect the preview deployment.
10. Approve and merge.
11. Publish the production version.
12. Mark the task Done after verification.

The final workflow can be simplified for small changes.

### TECHNICAL CHALLENGES

- Select CI/CD tools.
- Configure preview deployments.
- Define production approval rules.
- Manage build permissions and secrets.
- Configure rollback.
- Prevent failed builds from replacing production.

### CANDIDATE TOOLS

- GitHub Actions
- Hosting-provider build pipelines
- Hybrid approach

No final CI/CD implementation has been selected.

## 13. SUBSYSTEM: HOSTING AND DOMAIN

### IN SCOPE

- Free or inexpensive static hosting.
- HTTPS.
- GitHub integration.
- Preview deployments.
- Production deployment.
- Optional custom domain.
- Hosting of generated PDF and media.

### CANDIDATE HOSTS

- GitHub Pages
- Cloudflare Pages
- Vercel
- Other suitable static hosting providers

The hosting service has not been selected.

Start with a free provider address.

A custom domain can be purchased later.

### TECHNICAL CHALLENGES

- Free-plan restrictions.
- Build and bandwidth limits.
- Static site compatibility.
- Preview support.
- Custom domain configuration.
- Deployment caching.

### OUT OF INITIAL SCOPE

- Paid application server.
- Managed production database.
- Visitor authentication infrastructure.
- Dedicated hosting hardware.

## 14. SUBSYSTEM: ACCESSIBILITY AND SECURITY

### IN SCOPE

- Responsive layouts.
- Keyboard navigation.
- Visible focus indicators.
- Reduced-motion support.
- Readable contrast.
- Accessible conventional pages.
- Image and media optimization.
- Safe Markdown rendering.
- Safe external links.
- Protection of private files and credentials.

The animated explorer must not be the only way to
access important content.

### TECHNICAL CHALLENGES

- Define performance targets.
- Test accessibility.
- Optimize animation.
- Manage large media.
- Prevent private content from entering public builds.

### OUT OF INITIAL SCOPE

- Complex authentication.
- User-generated public content.
- Enterprise security infrastructure.

## 15. FUTURE FEATURES - NOT INITIAL SCOPE

The following features are possible future additions:

- Full VR portfolio.
- Interactive 3D environments.
- Reusable portfolio-builder application.
- Separate portfolio-engine repository.
- Advanced content search.
- Learning activity timeline.
- Interactive simulations for individual labs.
- Complex skill dependency graphs.
- Multiple CV layouts.
- Job-specific CV generation.
- Public PDF version archive.
- Browser-based content management.
- Visitor accounts.
- Comments and social features.
- Automated skill proficiency estimation.

Do not select a more complex technology stack only
to support these optional features.

## 16. NON-NEGOTIABLE REQUIREMENTS

R-01  One shared source for website and CV content.

R-02  Content editing through VS Code and/or Obsidian.

R-03  Stable IDs and linked content records.

R-04  Interested, Learning, and Demonstrated skill states.

R-05  Demonstrated skills require approved public proof.

R-06  All valid demonstrated skills appear in the CV.

R-07  Animated interactive skill explorer.

R-08  Conventional pages with direct URLs.

R-09  Detailed labs, projects, and evidence.

R-10  Automated online CV and build-generated PDF.

R-11  Stable PDF download URL.

R-12  One repository initially.

R-13  Local preview and automated builds.

R-14  Preview deployments before production.

R-15  Failed builds must not replace working production.

R-16  Accessible navigation and mobile support.

R-17  Free or low-cost hosting.

R-18  Draft content must not appear in production.

R-19  No mandatory production database or backend server.

R-20  GitHub-based development tracking.

R-21  Tasks have acceptance criteria and verification states.

## 17. ACCEPTANCE AND VERIFICATION SCENARIOS

### T-01
Create a published lab and confirm that its direct URL works.

### T-02
Link one lab to two skills and confirm both use the
same canonical record.

### T-03
Open a skill directly through its URL.

### T-04
Select an animated skill and confirm that the
appropriate information panel opens.

### T-05
Open a lab and inspect its steps, evidence, and results.

### T-06
Mark a skill Learning and confirm that it is excluded
from demonstrated CV skills.

### T-07
Mark a skill Demonstrated without valid evidence.
Confirm that validation fails.

### T-08
Approve a completed, published work entry's link to one skill.
Confirm that only that link qualifies and its demonstrated skill
appears in the online CV. Verify PDF inclusion in the Typst release.

### T-09
Create a draft lab and confirm that it is not published.

### T-10
Introduce duplicate IDs and broken references.
Confirm that validation reports the errors.

### T-11
Edit a Markdown file and confirm the local preview updates.

### T-12
Push a change and inspect the preview deployment.

### T-13
Approve a change and confirm production deployment.

### T-14
Cause a build failure and confirm that the previous
production release remains available.

### T-15
Test keyboard navigation, reduced motion, and mobile layout.

### T-16
Download the generated CV PDF and compare it with
the published source records.

### T-17
Confirm that no credentials or private drafts enter
the production build.

### T-18
Create a GitHub task with acceptance criteria.

### T-19
Link a commit or pull request to the task.

### T-20
Verify the implementation before marking the task Done.

## 18. SUGGESTED IMPLEMENTATION ORDER

### STAGE 0 - PROJECT INITIALIZATION

- Create local Git repository.
- Create GitHub repository.
- Add README and scope document.
- Configure GitHub Projects.
- Create initial planning tasks.

### STAGE 1 - TECHNOLOGY SELECTION

- Compare complete technology stacks.
- Select frontend architecture.
- Select content format and validation approach.
- Select PDF generation technology.
- Select hosting and CI/CD tools.
- Define development responsibilities.

### STAGE 2 - PROJECT FOUNDATION

- Set up the development environment.
- Create initial application structure.
- Run the first local website.
- Configure testing and build commands.
- Configure preview deployments.

### STAGE 3 - CONTENT SYSTEM

- Define record schemas.
- Implement content loading.
- Implement relationship resolution.
- Implement validation.
- Add sample records and tests.

### STAGE 4 - CONVENTIONAL WEBSITE

- Build navigation.
- Build skill pages.
- Build lab pages.
- Build project pages.
- Implement direct routes.

### STAGE 5 - AUTOMATED CV

- Build online CV.
- Implement skill selection rules.
- Create PDF template.
- Integrate PDF generation into builds.

### STAGE 6 - INTERACTIVE EXPLORER

- Create animated skill objects.
- Implement selection and focus.
- Implement expanded panels.
- Connect panels to content records.
- Support mobile and reduced motion.

### STAGE 7 - QUALITY AND PUBLICATION

- Improve evidence viewers.
- Run accessibility checks.
- Run system tests.
- Publish real skills and labs.
- Review production readiness.
- Publish the first public release.

This order is a proposal.

A small animation prototype can be created earlier
to test the chosen graphics technology.

## 19. OPEN TECHNOLOGY DECISIONS

### D-01
Frontend framework and static site generation.

### D-02
Animation technology and rendering approach.

### D-03
Markdown format and metadata representation.

### D-04
Content schemas and validation library.

### D-05
PDF generation engine.

### D-06
Hosting provider.

### D-07
CI/CD architecture.

### D-08
UI component and animation libraries.

### D-09
CV layout and pagination.

### D-10
Media and evidence storage.

### D-11
Testing frameworks and quality thresholds.

### D-12
Division of implementation work between owner and AI.

### D-13
Minimum viable product and release priorities.

Evaluate each stack using:

- Compliance with required features.
- Free-plan compatibility.
- Ease of local development.
- Markdown authoring experience.
- Interactive animation capabilities.
- Automated PDF generation.
- GitHub integration.
- Preview deployment support.
- Accessibility.
- Mobile performance.
- Maintenance effort.
- Learning difficulty.
- Time to first working release.
- Long-term extensibility.

## 20. INSTRUCTIONS FOR THE NEXT AI CHAT

Use this document as the technical project baseline.

The repository is in its initial planning stage.

The README and project scope are the initial documents.

GitHub Issues and Projects are the selected development
tracking system.

The technology stack has not yet been selected.

### FIRST:

1. Review the project requirements.
2. Identify architecture-critical decisions.
3. Propose 3-4 complete technology stack options.
4. Compare their strengths, weaknesses, costs,
   learning difficulty, and maintenance requirements.
5. Recommend a suitable stack.
6. Explain the reasons for the recommendation.

Do not immediately generate the entire application.

### AFTER STACK SELECTION:

1. Define subsystem boundaries.
2. Define data flow and interfaces.
3. Define the content schemas.
4. Define the repository structure.
5. Create initial GitHub development tasks.
6. Define acceptance criteria and tests.
7. Define the build and deployment workflow.
8. Start implementation in small stages.

The owner wants to learn and understand the system.

AI may assist with implementation, but should explain
important decisions and avoid creating large amounts
of unreviewed code.

Use GitHub Projects to track development progress.

Preserve agreed requirements.

If a proposed architecture requires changing scope,
explain the change and request approval first.
