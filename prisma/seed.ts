import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // Create a sample user
  const user = await prisma.user.upsert({
    where: { email: "demo@example.com" },
    update: {},
    create: {
      email: "demo@example.com",
      name: "Demo User",
      provider: "demo",
      providerId: "demo-user-1",
    },
  });

  // Create sample todos
  await prisma.todo.createMany({
    data: [
      {
        title: "Welcome to your Todo App!",
        description: "This is a sample todo to get you started.",
        completed: false,
        userId: user.id,
      },
      {
        title: "Explore the template features",
        description: "Check out authentication, database, and UI components.",
        completed: false,
        userId: user.id,
      },
      {
        title: "Set up your environment",
        description: "Configure your .env file with your own credentials.",
        completed: true,
        userId: user.id,
      },
    ],
  });

  console.log("✅ Database has been seeded!");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
