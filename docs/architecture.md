# Living Technical Portfolio architecture

This plan records the initial stack and how the pieces fit together. The first release contains conventional portfolio pages, an animated skill explorer, and an online CV. Typst is the selected engine for a later downloadable CV. The [project scope](project-scope.md) defines the original requirements and verification scenarios. The release decisions below apply where the two documents differ.

## Release boundaries

- **First release.** Publish skills, labs, projects, and supporting evidence. Visitors can browse direct pages or use the homepage explorer. The online CV includes all demonstrated skills that satisfy the approval and evidence rules.
- **Later release.** Add the Typst template, build-generated PDF, stable `/cv.pdf` URL, and PDF verification. R-10 applies to the online CV now and to PDF generation later. R-11 and T-16 move to that later release. T-08 verifies the online CV now and gains a PDF assertion when the PDF ships.
- **Hosting and privacy.** Use a public static site and the existing public GitHub repository. Keep sensitive source material outside the repository. A draft flag controls site publication, while GitHub repository visibility controls access to committed files and their history.

## Technology decisions

| Area | Choice | Reason and trade-off |
| --- | --- | --- |
| Website and routes | Astro in static output mode, with `.astro` pages, layouts, and components | Astro writes finished HTML at build time. The site can run on static hosting, and individual pages work with JavaScript disabled. Content updates require a rebuild. |
| Language and tooling | TypeScript, a supported Node.js LTS release, and npm | Use TypeScript for build rules and browser interaction. The browser runs compiled JavaScript, while Node runs local tooling and the build. Pin a compatible Node version during setup and commit the npm lockfile. |
| Content and authoring | Plain Markdown with YAML frontmatter in VS Code or Obsidian | The prose and structured fields live together in portable text files. Field validation catches mistakes such as a misspelled status or a missing title. Use standard Markdown links and images so content works in both editors and the site. |
| Validation | Astro build-time content collections and Zod, plus TypeScript rules across records | Zod checks individual records. A focused TypeScript module checks relationships, publication, and CV eligibility. These rules are specific to the portfolio and need their own tests. |
| Styling and interactivity | Plain CSS, semantic HTML, and a small browser TypeScript module | Native buttons and links provide a foundation for keyboard and touch access. CSS handles layout, motion, and panel transitions. Custom state stays manageable while the explorer has a skill and an optional work entry selected. |
| Media | Astro image processing for local screenshots, referenced files for small evidence, external HTTPS storage when needed for large evidence | This keeps the initial build self-contained and image sizes manageable. External files add link maintenance and depend on another service. |
| Verification | Astro type checking, Vitest, Playwright, and axe-core | Unit tests cover rules and edge cases. Browser tests exercise compiled pages and navigation. Automated accessibility checks complement manual keyboard, screen-reader, and phone testing. |
| CI and hosting | GitHub Actions, Cloudflare Pages Direct Upload, and Wrangler | Actions builds and verifies the files before Wrangler deploys them. This requires configuring preview URLs and credentials in the workflow. Start with a provider URL and add a custom domain later if desired. |
| Future PDF | Typst CLI reading JSON generated from the approved CV data | A dedicated template gives control over pagination and layout. Maintaining a second presentation is the cost. Build and test this when the PDF issue is opened. |

[Astro content collections](https://docs.astro.build/en/guides/content-collections/) · [Astro static routing](https://docs.astro.build/en/guides/routing/) · [Cloudflare Pages Direct Upload](https://developers.cloudflare.com/pages/get-started/direct-upload/) · [Typst JSON input](https://typst.app/docs/reference/data-loading/json/)

## How data moves through the site

```text
Markdown + YAML + referenced evidence files
                |
                v
Astro content collections + Zod field validation
                |
                v
TypeScript rules check identities, references, and publication
                |
                v
Published records and resolved links
        |                |                  |
        v                v                  v
Astro detail pages   Explorer data      Approved CV data
        |                |                  |
        v                v                  v
Static HTML         Browser interaction   Online CV HTML

Later, the same approved CV data can also feed Typst.
```

Build-time code can read source records. Browser code receives only the public fields needed for the current page or explorer. The host serves the finished HTML, CSS, JavaScript, and selected media. Visitors can open any conventional page directly, without a database or a running application server.

## Content contracts

Frontmatter holds short, structured fields. Markdown holds narrative content, including lab steps and results. Lists of related records store stable IDs. The build looks those IDs up and produces public URLs.

| Record | Required structure and editorial rules |
| --- | --- |
| **Skill** | Stable ID, slug, title, category, short summary, learning status, publication state, and last-updated date. Use the body for the description. Optionally list tool IDs such as `blender` or `docker`. Derive related work from the links authored on work entries. |
| **Work entry** | Stable ID, slug, title, kind (`lab`, `study`, `project`, or `artwork`), completion status, publication state, and update date. Completed entries have a completion date. Optional fields include a card summary, cover with alt text, course title and link, parent entry ID, sibling order, and skill links. |
| **Skill link** | On a work entry, record the target skill ID once. A link can optionally contain a proof claim with explicit owner approval, a short explanation, and an optional reference to a heading or supporting file. |
| **Supporting material** | A work entry can mix text, images, captions, code blocks, downloadable files, and external links in any order. Keep write-ups and their local assets together. Independently authored or published Markdown material can be a child work entry. |
| **Profile** | One canonical record for the professional summary, approved public contact links, education, experience, and selected project IDs. Dates and list order are explicit. Include only information approved for public display. |

### IDs, slugs, and relationships

- IDs such as `skill-linux` are unique across the repository and stay stable when the name, filename, or URL changes. Slugs such as `linux` are unique within a record type and use lowercase words separated by hyphens. Add a redirect if a published slug changes.
- A work entry can link to multiple skills. Derive each skill's work list from direct links, one card per entry. Approval applies to a single work-to-skill link. Parents, children, and other skills on the same entry each need their own explicit links and approvals.
- Use one optional parent ID for independently authored work inside a larger piece. Keep the hierarchy acyclic and require a public child's parent to be public. Show children in editorial order when supplied, with a stable date and ID fallback. Use Markdown headings for parts that belong on the same page.
- Represent publication separately from completion and learning state. A completed work entry can still be a draft. An interested or learning skill can be published with zero work entries.

### Publication and validation

1. Validate record shape, enum values, IDs, and slugs. Report failures with the source path and offending field or reference.
2. Build an index by ID. Check missing targets, wrong record types, duplicate references, invalid parent chains, and absent local evidence files.
3. Derive the public set once. Exclude draft entries and their unreferenced assets from pages, explorer data, and CV data. Filter reverse relationship lists to public items. Explicit links from published Markdown to unpublished routes fail the generated-site check. Public CV selections and public parent references must resolve to public entries.
4. The owner explicitly sets a skill to `demonstrated`. The build requires at least one skill link with owner approval and a nonempty explanation on a completed, published work entry. The explanation can cite the write-up itself, a heading, or a public asset. An attachment is optional. Check any supplied proof target and fail a build if the published demonstrated skill has no qualifying link. Include every eligible skill in the CV, grouped by category. Interested and learning skills stay out of the demonstrated section.
5. Generate routes, explorer data, and CV data from the public set. Check the built output for broken internal routes and missing assets. Treat transient external-link failures as warnings. Validate link schemes and keep raw HTML in Markdown disabled or stripped by the rendering configuration.

Use synthetic records to test draft handling. Keep confidential files out of Git and keep source evidence outside any directory copied wholesale into the deployment. Resolve local references inside the intended content directory and emit only assets referenced by published records.

### Authoring example

Create `skills/3d-modelling.md` with a summary such as “Hard-surface modelling and scene composition in Blender,” the `blender` tool ID, and `learning` status. Publish it whenever the description is ready. Later, create a composition entry and add the prop, sculpt, and lighting studies as children where they warrant separate pages. For example, the prop entry's frontmatter could contain:

```yaml
id: work-prop-modelling
slug: prop-modelling
title: Prop modelling for the character composition
kind: study
parent: work-character-composition
status: completed
publication: published
updatedOn: '2026-11-21'
completedOn: '2026-11-21'
skills:
  - skill: skill-3d-modelling
    proof:
      approved: true
      explanation: I built the prop mesh and explain how the wireframe supports the final silhouette.
```

Write the story below the frontmatter. Add a wireframe, final render, and an optional Blender file as Markdown images or links. The skill's related work list updates from the work entry. When you explicitly change the skill's status to `demonstrated`, the build can use the approved link to validate it.

A Docker Compose lab uses the same structure with `kind: lab`. Its write-up can explain how two services communicate and how you verified the connection, then link the Compose file and show screenshots. An optional course reference gives context. The skill panel can show the Docker icon and sort the lab alongside your other containerisation work.

## Pages and explorer

| URL | Responsibility |
| --- | --- |
| `/` | Portfolio introduction, selected projects, and interactive skill explorer. |
| `/skills`, `/skills/<slug>` | Browse skills, see short previews, and inspect related work and approved proof. |
| `/work`, `/work/<slug>` | Browse all published work and open its canonical page. |
| `/labs`, `/projects` | Filter the same collection to labs or projects. Cards link to the canonical work page. |
| `/cv` | Display the approved profile, experience, education, selected projects, and demonstrated skills. |

Use a shared Astro layout for navigation, headings, page titles, descriptions, canonical URLs, and common styles. Work pages support an optional wide cover, regular Markdown prose, and full-width process images where useful. Goal, motivation, method, results, and lessons are optional headings. A designed poster can supplement the write-up. Keep essential text available as readable page text.

Hover and keyboard focus reveal a short skill preview with the summary and optional tool icons. Map tool IDs to curated icon assets and visible tool names. Click, Enter, or tap opens the full skill panel, where the preview information is also available. List directly linked public work newest first by completion date when available, otherwise update date, with ID as a tie-breaker. Label in-progress entries and show which completed entries carry approved proof for this skill.

The homepage has three states: overview, selected skill, and selected work within a skill. Use `/?skill=3d-modelling&work=prop-modelling` to restore a selection after refresh or when sharing a link. Push selections into browser history and restore them on Back and Forward. Invalid or unrelated work falls back to the valid skill panel. The work panel shows a summary, the applicable proof explanation, and a link to the full page. Provide explicit controls to return to the skill or overview on direct entry.

Use HTML buttons for selections and links for navigation. Start with an inline panel and CSS transforms for floating objects. Pause motion on focus or selection, while offscreen, or while the tab is hidden. Offer a pause control and honor `prefers-reduced-motion`. Keep keyboard order stable, restore focus when a panel closes, and make each action work by tap. On small screens, arrange the same controls in a layout that fits the viewport.

## Repository layout

These are target paths for implementation issues.

```text
living-portfolio/
  docs/
    project-scope.md
    architecture.md
  src/
    content.config.ts        Astro collection definitions
    content/                 Skills, work entries with assets, and profile records
    lib/content/             Relationships, validation, and published views
    lib/cv/                  Approved CV data used by the online page
    pages/                   Routes and static page generation
    layouts/                 Shared navigation and page metadata
    components/              Reusable UI and evidence rendering
    scripts/explorer.ts      Browser interaction and URL state
    styles/                  Shared and explorer CSS
  tests/
    unit/                    Record and relationship rules
    fixtures/                Small synthetic record sets
    e2e/                     Browser behavior and accessibility checks
  .github/workflows/          Verification, previews, and production deployment
  package.json
  package-lock.json
  astro.config.mjs
```

Astro writes the release to `dist/`. Keep generated files and installed dependencies outside Git. Add directories as their first use arrives.

## Build and release workflow

1. **Local development.** `npm ci` installs the locked dependencies. `npm run dev` starts Astro's development server. The production build runs the same record validation used by CI.
2. **Pull request verification.** Run Astro type checking, Vitest, the production build, internal link and publication checks, and Playwright against the generated site. Upload a preview for trusted branches after checks pass and share its URL on the pull request. Fork pull requests run verification with no deployment credentials.
3. **Production approval.** Review the preview and merge to `main` as the initial approval step. The workflow builds and checks that commit, then deploys the exact verified output. Use a narrowly scoped Cloudflare deploy token stored in GitHub secrets. Keep verification jobs independent of deployment secrets and serialize production deployments.
4. **Failure and rollback.** A validation, test, or build failure ends the workflow before upload. Verify that the last working production deployment remains available. If a successful deployment later proves faulty, roll back to a previously successful production deployment and fix the source on `main`.
5. **Caching and limits.** Use hashed filenames for generated assets and leave HTML caching at the host defaults initially. Confirm direct URL loading and freshness after deployment. Verify provider limits before publishing large evidence. A custom domain, if added, becomes the canonical base URL.

[Cloudflare Pages limits](https://developers.cloudflare.com/pages/platform/limits/) · [Cloudflare Pages rollbacks](https://developers.cloudflare.com/pages/configuration/rollbacks/)

## Implementation sequence and verification

| Issue | Deliverable and acceptance check |
| --- | --- |
| **1. Scaffold the Astro site and verify a local build** | A single homepage, shared layout, pinned Node version, npm lockfile, and documented local commands. From a clean checkout, install dependencies, start the dev server, run the type check, build, and open the generated homepage locally. The homepage also works with JavaScript disabled. |
| **2. Implement the content collections and publication rules** | Link one finished study to two skills and approve proof for one link. Verify that a creative study can qualify, approval applies only to its skill, and unpublishing the sole qualifying entry blocks a demonstrated claim. Test broken references, duplicate IDs, draft filtering, and parent cycles. Covers T-02, T-07, T-09, and T-10. |
| **3. Build conventional pages and evidence components** | Both skill pages link to the same canonical work page. A parent composition shows its children in order. Write-ups render Markdown, images, and downloads, and draft URLs and assets are absent. Covers T-01, T-03, T-05, T-09, T-11, and T-17. |
| **4. Build the online CV** | Confirm that learning skills are excluded and every eligible demonstrated skill is included. The site uses one approved CV data view. Covers T-06 and the online portion of T-08. |
| **5. Build and test the explorer** | Hover and focus show the preview. Click, keyboard activation, and tap open the skill with newest-first related work and skill-specific proof labels. Verify Back, Forward, reload, visible focus, reduced motion, and the layout on a real phone. Profile a representative scene and set a performance budget from its baseline. Covers T-04 and T-15. |
| **6. Wire up previews and production** | A trusted pull request gets a preview URL. Merging an approved change publishes it. A failed build leaves the previous release available. Rehearse rollback before the public release. Covers T-12 through T-14. |
| **Future. Add the Typst CV PDF** | Compile a template from the approved CV data in the build and publish it at `/cv.pdf`. Check pagination on a multi-page sample, working absolute links, and content agreement with the online CV. Covers deferred R-10, R-11, T-08, and T-16. |

Deployment setup can proceed once the scaffold has a working build. The release still needs to pass the full set of checks for the implemented features. Each GitHub issue should link to its pull request and record what was verified before moving to Done, covering T-18 through T-20.

## Closing the stack selection issue

Link this document in **Choose the tech stack** and revise the issue checklist to cover selection and architecture. Move the prototype, browser tests, and deployment verification into their implementation issues. Record the release decision to defer PDF work and keep Typst selected for it.

The architecture leaves visual design, exact dependency versions, and measured performance targets to the issues where they can be verified. The owner can decide how much implementation to do personally when starting the scaffold issue.
