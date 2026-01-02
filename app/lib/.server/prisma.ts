import "dotenv/config";
import { PrismaClient } from "~/lib/generated/prisma/client";

const prisma = new PrismaClient();

export { prisma };
