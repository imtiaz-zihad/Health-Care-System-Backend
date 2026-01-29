import express, { Application, Request, Response } from "express";
import cors from "cors";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";
import notFound from "./app/middlewares/notFound";
import config from "./config";
import router from "./app/routes";
import cookieParser from "cookie-parser";
import { PaymentController } from "./app/modules/payment/payment.controller";
import cron from "node-cron";
import { AppointmentService } from "./app/modules/appointment/appointment.service";

const app: Application = express();
app.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  PaymentController.handleStripeWebhookEvent,
);
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  }),
);

//parser
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

cron.schedule("* * * * *", () => {
  try {
    console.log(
      "Node cron called at",
      new Date().toLocaleString("en-US", {
        timeZone: "Asia/Dhaka",
        year: "numeric",
        month: "short",
        day: "2-digit",
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      }),
    );

    AppointmentService.cancelUnpaidAppointments();
  } catch (error) {
    console.log(error);
  }
});

app.use("/api/v1", router);

app.get("/", (req: Request, res: Response) => {
  res.send({
    message: "Event Management Server Running Well.....",
    environment: config.node_env,
    uptime: process.uptime().toFixed(2) + " sec",
    timeStamp: new Date().toISOString(),
  });
});

app.use(globalErrorHandler);

app.use(notFound);

export default app;
