import { NodeSDK }
from "@opentelemetry/sdk-node";

import {
   getNodeAutoInstrumentations
}
from "@opentelemetry/auto-instrumentations-node";

import {
   OTLPTraceExporter
}
from "@opentelemetry/exporter-trace-otlp-http";

const traceExporter =
   new OTLPTraceExporter({

      url:
       "http://localhost:4318/v1/traces",
   });

const sdk = new NodeSDK({

   serviceName:
      "main-db-service",

   /* traceExporter, */

   instrumentations: [

      getNodeAutoInstrumentations({

         "@opentelemetry/instrumentation-fs": {

            enabled: false
         }
      }),
   ],
});

sdk.start();

console.log(
   "OpenTelemetry initialized"
);