# pino Google Cloud Run options

The package contains default configuration of the [pino](https://github.com/pinojs/pino) logger in the
Google [Cloud Run](https://cloud.google.com/run).

Google Cloud Run collects the logs from the standard output and standard error. If 1 log line is a valid json then the
log aggregator parse it as a json and extract/move the `severity` and `message` properties to relevant p
the [LogEntry](https://cloud.google.com/logging/docs/reference/v2/rest/v2/LogEntry).

Pino has 6 log level by default. The Google Log has 9. The following table contains the mapping

| pino  | Google Log |
|-------|------------|
| trace | DEBUG      |
| debug | DEBUG      |
| info  | INFO       |
| warn  | WARNING    |
| error | ERROR      |
| fatal | CRITICAL   |

The custom log levels map to the `DEFAULT` Google Log level if you don't write custom formatter.

It does not log the `hostname` and `pid` information, because Google Cloud Run logs the instance id and other context
information.
