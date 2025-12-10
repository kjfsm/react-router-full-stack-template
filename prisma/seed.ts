import "dotenv/config";
import { auth } from "../app/lib/.server/auth";
import { prisma } from "../app/lib/.server/prisma";

async function main() {
  const name = "Test User";
  const email = "test@example.com";
  const password = "password1234";

  // 既にユーザーが存在する場合はスキップ
  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    console.log(`Seed: user with email ${email} already exists, skipping.`);
    return;
  }

  // better-auth の API を使ってサインアップ（ハッシュ化等は内部で処理される）
  const res = await auth.api.signUpEmail({
    body: { name, email, password },
    asResponse: true,
  });

  if (res.ok) {
    console.log(`Seed: created user ${email}`);
    return;
  }

  const text = await res.text();
  console.error("Seed: failed to create user:", text);
  throw new Error(text);
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
