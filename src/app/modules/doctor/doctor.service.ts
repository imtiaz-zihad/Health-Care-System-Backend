import { Prisma } from "../../generated/prisma/client";
import { IOptions, paginationHelper } from "../../helper/paginationHelper";

import { prisma } from "../../shared/prisma";
import { doctorSearchableFields } from "./doctor.constant";

const getAllFromDB = async (filters: any, options: IOptions) => {
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelper.calculatePagination(options);
  const { searchTerm, specialties, ...filterData } = filters;

  const andConditions: Prisma.DoctorWhereInput[] = [];

  if (searchTerm) {
    OR: doctorSearchableFields.map((field) => ({
      [field]: {
        contains: searchTerm,
        mode: "insensitive",
      },
    }));
  }

  if(Object.keys(filterData).length >0){
    const filterConditions = Object.keys(filterData).map((key)=>({
        [key]:{
            equals:(filterData as any )[key]
        }
    }))

    andConditions.push(...filterConditions)
  }
};

// const updateIntoDB = async (id: string, payload: Partial<IDoctorUpdateInput>) => {

// }

export const DoctorService = {
  getAllFromDB,
  //updateIntoDB
};
