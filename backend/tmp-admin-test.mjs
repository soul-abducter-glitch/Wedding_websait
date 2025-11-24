import AdminJS from "adminjs";
import * as AdminJSPrisma from "@adminjs/prisma";
import { PrismaClient } from "@prisma/client";
AdminJS.registerAdapter({ Resource: AdminJSPrisma.Resource, Database: AdminJSPrisma.Database });
const prisma = new PrismaClient();
new AdminJS({ resources: [{ resource: { model: prisma.user, client: prisma } }] });
console.log("ok");
await prisma.$disconnect();
