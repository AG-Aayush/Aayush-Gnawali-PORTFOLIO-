# DevOps Runbook for This Portfolio

This guide sets up the DevOps foundation before the RAG pipeline. The goal is not to add tools for decoration. The goal is to make every change reproducible, tested, containerized, and deployable.

## What was added

```text
package.json                 npm run typecheck
next.config.ts               standalone production output
src/app/api/health/route.ts  health check for the running service
Dockerfile                   multi-stage production image
.dockerignore                files excluded from the image
docker-compose.yml            local production-like run
.github/workflows/ci.yml     GitHub Actions quality and image checks
```

## The delivery flow

```text
feature branch
    |
    v
pull request
    |
    v
GitHub Actions: npm ci -> lint -> typecheck -> build -> docker build
    |
    v
review and merge to main
    |
    v
build the same Docker image
    |
    v
deploy to a host such as Render, Fly.io, Railway, AWS, or a VPS
    |
    v
health check confirms the service is alive
```

The first milestone is CI. Automatic deployment should come only after CI is reliable.

## 1. Run the quality gates locally

From the `portfolio` directory:

```powershell
npm ci
npm run lint
npm run typecheck
npm run build
```

What each check means:

- `npm ci`: installs exactly what `package-lock.json` records;
- `lint`: catches code-quality and common React problems;
- `typecheck`: catches TypeScript contract errors without emitting files;
- `build`: proves Next.js can produce a production application.

A developer should run these before opening a pull request. GitHub Actions runs the same commands so the repository does not depend on one developer remembering them.

There is currently one non-blocking React hook warning in `IntroLoader.tsx`. Warnings should be reviewed, but the CI gate fails only on errors.

## 2. Understand the Dockerfile

The Dockerfile has three stages:

```text
 dependencies -> builder -> runner
```

### Dependencies

Installs packages with `npm ci`. This stage can be cached when `package.json` and the lockfile have not changed.

### Builder

Copies source code and runs `npm run build`. Next.js is configured with `output: "standalone"`, so it creates a smaller server bundle.

### Runner

Copies only:

- `public/`;
- `.next/standalone`;
- `.next/static`.

It runs as a non-root `nextjs` user. That reduces the impact of a container-level vulnerability.

The image includes a health check that requests:

```text
GET /api/health
```

Do not put `.env.local`, private CV files, Git history, or development dependencies in the image.

## 3. Build and run the image

Make sure Docker Desktop is running, then:

```powershell
docker build --tag aayush-portfolio:local .
docker run --rm --publish 3000:3000 --name aayush-portfolio aayush-portfolio:local
```

Open `http://localhost:3000` and check the health endpoint:

```powershell
Invoke-WebRequest http://localhost:3000/api/health
```

Stop the container with `Ctrl+C` if it is attached, or:

```powershell
docker stop aayush-portfolio
```

If Docker reports that its named pipe or Linux engine is unavailable, start Docker Desktop and retry. That is an environment problem, not an application build problem.

## 4. Use Docker Compose locally

Compose gives you a repeatable command for the production-like app container:

```powershell
docker compose up --build
```

Run it in the background:

```powershell
docker compose up --build --detach
docker compose ps
docker compose logs --follow portfolio
```

Stop it:

```powershell
docker compose down
```

The current Compose file intentionally contains no database or API key. Add Postgres and RAG services later only when the direct RAG implementation needs them. Never put real secrets directly into `docker-compose.yml`.

## 5. Understand the GitHub Actions workflow

The workflow is in `.github/workflows/ci.yml` and runs on:

- pushes to `main`;
- pull requests targeting `main`.

It has two jobs:

### Quality job

```text
npm ci
npm run lint
npm run typecheck
npm run build
```

### Container job

The container job waits for quality to pass, then runs:

```text
docker build --tag aayush-portfolio:<commit-sha> .
```

The commit SHA makes the image tag traceable to the exact source revision.

GitHub Actions uses `permissions: contents: read`, which follows least privilege for this workflow.

## 6. Configure branch protection

In GitHub repository settings:

1. Open **Settings -> Branches**.
2. Add a branch protection rule for `main`.
3. Require a pull request before merging.
4. Require the `Lint, typecheck, and build` status check.
5. Require branches to be up to date before merging.
6. Require conversation resolution.
7. Disable force pushes to `main`.
8. Decide whether to require signed commits.

After this, a broken build cannot be merged through the normal GitHub workflow.

## 7. Branch and commit workflow

Use small branches:

```powershell
git switch -c chore/devops-foundation
git add Dockerfile .dockerignore docker-compose.yml next.config.ts package.json package-lock.json src/app/api/health .github/workflows/ci.yml DevOps.md
git commit -m "add DevOps quality gates and container workflow"
git push --set-upstream origin chore/devops-foundation
```

Then open a pull request. Do not develop directly on `main` while learning CI/CD.

Useful commit categories:

```text
feat: add RAG retrieval endpoint
fix: reject private document chunks
ci: run typecheck in GitHub Actions
build: add production Docker image
docs: explain ingestion workflow
```

## 8. Secrets and configuration

Local secrets belong in `.env.local`. Production secrets belong in your host's secret manager or environment settings.

Never put these in GitHub source files:

```text
LLM_API_KEY
DATABASE_URL
private CV contents
provider tokens
cloud credentials
```

When RAG is added, use GitHub Actions secrets only for deployment automation. The CI job does not need the LLM key because it should not call the LLM.

For deployment, use a separate production key and database. Do not use your development database from a public deployment.

## 9. Security checks to add next

Before RAG:

- keep `.env*` ignored;
- run `npm audit` and review vulnerabilities manually;
- enable Dependabot updates;
- enable GitHub secret scanning if available;
- use pull requests for dependency updates;
- review Docker base image updates;
- run as a non-root container user;
- avoid logging environment variables;
- add security headers before public launch.

Do not blindly run `npm audit fix --force`. It can make breaking dependency changes. Read the advisory, identify the affected package, and test the update.

## 10. Deployment options

### Vercel

Simple for a Next.js portfolio. You may not need the Dockerfile, but CI still proves the code quality. Add deployment environment variables in Vercel settings when RAG is introduced.

### Render, Railway, or Fly.io

Useful if you want to demonstrate container deployment. Configure the service to build from the Dockerfile and expose port `3000`. Set the health check path to `/api/health`.

### VPS or AWS EC2

You manage more yourself:

```text
GitHub Actions -> container registry -> server pull -> docker compose up -d
```

This teaches more infrastructure but creates more operational responsibility: TLS, firewall rules, patching, backups, monitoring, and rollback.

For a portfolio, use a managed host first and document the VPS path as a learning exercise.

## 11. Add deployment only after CI is stable

A safe progression is:

```text
Phase 1: CI checks only
Phase 2: Docker image build in CI
Phase 3: manual deployment from a known image
Phase 4: automatic deployment after main passes
Phase 5: rollback and monitoring
```

Do not deploy every commit before you know how to roll back.

A release should be traceable:

```text
Git commit SHA -> Docker image tag -> deployed service
```

If a deployment is bad, redeploy the previous image tag instead of rebuilding unknown source.

## 12. Health checks and observability

`/api/health` currently answers whether the Node service is alive. It does not prove that a future database or LLM provider is healthy.

Use separate checks:

- **liveness:** process is running;
- **readiness:** service can accept traffic and required dependencies are ready;
- **dependency health:** database/provider checks with strict timeouts.

Do not make a public liveness endpoint leak database URLs, model names, or secrets.

When RAG is added, log safe metrics:

```text
request ID
retrieval latency
generation latency
status code
retrieved chunk IDs
abstained or answered
provider error category
```

Do not log API keys, full prompts, full CV text, or private visitor messages.

## 13. How this prepares the RAG pipeline

The DevOps work should come first because RAG adds:

- server-side API keys;
- a database and vector extension;
- ingestion jobs;
- model and embedding dependencies;
- more expensive requests;
- private document handling;
- new failure modes.

With this foundation, you can add RAG safely:

```text
CI validates source
Docker packages the server
health checks detect broken deployments
secrets stay outside Git
branch protection controls changes
RAG route runs server-side
ingestion can be a separate controlled job
```

## 14. Interview explanation

A concise explanation is:

> I added CI with GitHub Actions to run reproducible install, lint, typecheck, and production build checks on pull requests. I configured Next.js standalone output and created a multi-stage Dockerfile that builds as one stage and runs a minimal non-root image. Docker Compose provides a repeatable local production-like run, and `/api/health` supports container health checks. Before adding RAG, I would add a separate ingestion job and keep provider keys and database credentials in deployment secrets, never in the browser or repository.

That shows you understand more than just writing a Dockerfile: you understand quality gates, image size, least privilege, health, release traceability, and secret boundaries.

## 15. What to learn after this foundation

Study these in order:

1. Linux processes, ports, permissions, and logs.
2. Git branching, pull requests, and merge protection.
3. Docker layers, images, containers, volumes, and networks.
4. CI pipeline stages and caching.
5. CD, environment promotion, rollback, and release tags.
6. Secrets management and least privilege.
7. Health checks, metrics, logs, and alerts.
8. PostgreSQL and backups.
9. RAG ingestion as a repeatable job.
10. RAG API deployment with rate limiting and cost controls.

The goal is a pipeline you can explain, debug, and roll back, not a collection of tools you have only seen in a tutorial.
