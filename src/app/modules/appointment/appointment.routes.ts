import express from "express";
import { AppointmentController } from "./appointment.controller";
import auth from "../../middlewares/auth";
import { UserRole } from "../../generated/prisma/enums";

const router = express.Router();
router.get(
  "/my-appointments",
  auth(UserRole.PATIENT, UserRole.DOCTOR),
  AppointmentController.getMyAppointment,
);
router.patch(
  "/status/:id",
  auth(UserRole.ADMIN, UserRole.DOCTOR),
  AppointmentController.updateAppointmentStatus,
);
router.post(
  "/",
  auth(UserRole.PATIENT),
  AppointmentController.createAppointment,
);

export const AppointmentRoutes = router;
