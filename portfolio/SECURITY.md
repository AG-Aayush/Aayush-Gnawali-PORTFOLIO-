# Security Policy

## Supported versions

The `main` branch is the supported version of this portfolio.

## Reporting a vulnerability

Do not open a public issue containing secrets, API keys, private documents, or an exploit.

Instead, contact the repository owner privately through the email address listed in the portfolio or use GitHub's private vulnerability reporting feature if it is enabled.

Include:

- affected file or endpoint;
- reproduction steps;
- impact;
- suggested mitigation, if known.

If an API key or credential may have been exposed, rotate it immediately before investigating further.

## Security expectations

- Secrets belong in deployment secret storage, never in source files.
- Public chat retrieval must filter out private document chunks server-side.
- Dependencies and GitHub Actions should be reviewed and updated regularly.
- Production changes should pass the repository quality and security checks.
