"use server";

import { prisma } from "@/lib/db";
import { Prisma } from "@prisma/client";

export const createSection = async (data: Prisma.SectionCreateInput) => {
  try {
    const section = await prisma.section.create({
      data: { ...data },
    });
    return {
      status: 201,
      data: section,
      message: "Section created successfully",
    };
  } catch (error) {
    return {
      status: 404,
      message: "Something went wrong, Please try again later",
    };
  }
};

export const deleteSection = async (sectionId: string) => {
  if (!sectionId)
    return {
      status: 400,
      message: "Invalid section id",
    };
  try {
    await prisma.section.delete({
      where: {
        id: sectionId,
      },
    });
    return {
      status: 200,
      message: "Section deleted.",
    };
  } catch (error) {
    return {
      status: 404,
      message: "Something went wrong, Please try again later",
    };
  }
};

export const updateSection = async ({
  name,
  sectionId,
}: {
  sectionId: string;
  name: string;
}) => {
  if (!sectionId || !name) return;
  try {
    const updatedSection = await prisma.section.update({
      where: { id: sectionId },
      data: {
        title: name,
      },
    });

    return {
      status: 200,
      data: updatedSection,
      message: "Section updated successfully",
    };
  } catch (error) {
    return {
      status: 404,
      message: "Something went wrong, Please try again later",
    };
  }
};

export const getProjectSections = async (projectId: string) => {
  if (!projectId) {
    return {
      data: [],
      message: "Empty sections",
      status: 400,
    };
  }
  try {
    const sections = await prisma.section.findMany({
      where: {
        projectId,
      },
      include: {
        tasks: true,
      },
    });
    return {
      data: sections,
      status: 200,
      message: "Successfully get all sections.",
    };
  } catch (error) {
    return {
      data: null,
      status: 404,
      message: "Something went wrong, Please try again later",
    };
  }
};
