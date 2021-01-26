'use strict';

const { LogLevel } = require("@opentelemetry/core");
const opentelemetry = require('@opentelemetry/api');
const { NodeTracerProvider } = require("@opentelemetry/node");
const { BasicTracerProvider, ConsoleSpanExporter, SimpleSpanProcessor } = require('@opentelemetry/tracing');
const { CollectorTraceExporter } = require('@opentelemetry/exporter-collector');
const { JaegerExporter } = require('@opentelemetry/exporter-jaeger');

const provider = new NodeTracerProvider({
  logLevel: LogLevel.ERROR
});

provider.addSpanProcessor(
  new SimpleSpanProcessor(
    new JaegerExporter({
        serviceName: 'currencyservice',
        endpoint: 'http://otel-agent:14268/api/traces',
    })
  )
);

//print traces to stdout for testing
provider.addSpanProcessor(new SimpleSpanProcessor(new ConsoleSpanExporter()));

provider.register();

console.log("tracing initialized");