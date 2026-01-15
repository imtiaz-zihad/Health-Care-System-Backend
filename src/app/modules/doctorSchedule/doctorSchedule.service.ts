import { prisma } from "../../shared/prisma";
import { IJWTPayload } from "../../types/common";

const insertIntoDB = async (user: IJWTPayload, payload: { scheduleIds?: string[] }) => {
  const doctorData = await prisma.doctor.findUniqueOrThrow({
    where: { email: user.email },
  });

  console.log("doctorData:", doctorData);
  console.log("payload:", payload);

  const scheduleIds = Array.isArray(payload.scheduleIds) ? payload.scheduleIds : [];

  if (scheduleIds.length === 0) {
    console.log("No schedule IDs provided!");
    return { success: false, message: "No schedule IDs provided" };
  }

  const doctorScheduleData = scheduleIds.map(scheduleId => ({
    doctorId: doctorData.id,
    scheduleId,
  }));

  console.log("doctorScheduleData:", doctorScheduleData);

  const result = await prisma.doctorSchedule.createMany({
    data: doctorScheduleData,
  });

  return { success: true, data: result };
};

export const DoctorScheduleService = {
  insertIntoDB,
};
