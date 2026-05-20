import express from "express";
import fs from "fs";
import path from "path";

const router = express.Router();

router.get("/logs", async (req, res) => {

   try {

      const logFilePath = path.join(
         process.cwd(),
         "app.log"
      );

      if (!fs.existsSync(logFilePath)) {

         return res.status(404).json({
            success: false,
            message: "app.log not found"
         });

      }

      const logs = fs
         .readFileSync(
            logFilePath,
            "utf-8"
         )
         .split("\n")
         .filter(Boolean)
         .slice(-100)
         .map((line) => {

            try {

               return JSON.parse(line);

            } catch {

               return null;

            }

         })
         .filter(Boolean);

      res.json({
         success: true,
         logs
      });

   } catch (error) {

      console.log(error);

      res.status(500).json({
         success: false,
         message: "Failed to fetch logs"
      });

   }

});

export default router;