# lib/monitoring

Monitoring contains application monitoring contracts and helpers for Version 1.

Responsibilities:

- Sentry configuration and capture payload helpers
- Lighthouse score thresholds and evaluation
- Web Vitals observation and metric reporting
- Performance scoring, monitoring reports, and alert payload models

Does not belong here:

- Uptime monitoring
- General logging systems
- Health checks
- UI components

Future Sentry SDK wiring or report generation should adapt through these provider-independent contracts.
