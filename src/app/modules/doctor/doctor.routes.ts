import express from "express";
import { DoctorController } from "./doctor.controller";
import auth from "../../middlewares/auth";
import { UserRole } from "../../generated/prisma/enums";

const router = express.Router();

router.get(
    "/",
    DoctorController.getAllFromDB
)
router.post("/suggestion",DoctorController.getAISuggestions)

router.patch(
    "/:id",
    DoctorController.getAllFromDB
)
router.patch(
    "/:id",
    auth(UserRole.ADMIN,UserRole.DOCTOR),
    DoctorController.updateIntoDB
)

export const DoctorRoutes = router;