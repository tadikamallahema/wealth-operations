/* import { Request, Response, NextFunction } from "express";
import { logger } from "./logger.js";
import { UAParser } from "ua-parser-js";

export const loggerMiddleware = (
  request: Request,
  response: Response,
  next: NextFunction
): void => {
  const start = Date.now();

  response.on("finish", () => {
    const duration = Date.now() - start;

    const ip =
      request.headers["x-forwarded-for"] ||
      request.socket.remoteAddress;

    const parser = new UAParser(
      request.headers["user-agent"]
    );

    const ua = parser.getResult();

    logger.info({
      method: request.method,
      url: request.originalUrl,
      status: response.statusCode,
      duration: `${duration}ms`,
      ipAddress: ip,
      browser: ua.browser.name,
      os: ua.os.name,
      deviceType: ua.device.type || "desktop",
    });
  });

  next();
};

 */

import { Request, Response, NextFunction }
from "express";

import { logger }
from "./logger.js";

import { UAParser }
from "ua-parser-js";

export const loggerMiddleware = (

   request: Request,

   response: Response,

   next: NextFunction

): void => {

   // Ignore monitoring routes

   if (
      request.originalUrl.includes(
         "/api/monitoring"
      )
   ) {

      return next();

   }

   const start = Date.now();

   response.on("finish", () => {

      const duration =
         Date.now() - start;

      const parser = new UAParser(
         request.headers["user-agent"]
      );

      const ua = parser.getResult();

      logger.info("API Request", {

         method: request.method,

         url: request.originalUrl,

         status: response.statusCode,

         duration: `${duration}ms`,

         browser: ua.browser.name,

         os: ua.os.name,

         deviceType:
            ua.device.type || "desktop",

      });

   });

   next();

};