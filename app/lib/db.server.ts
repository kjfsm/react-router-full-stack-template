import { PrismaClient } from "@prisma/client";

let prisma: PrismaClient;

declare global {
  var __db__: PrismaClient;
}

// これは開発環境で変更のたびにサーバーを再起動したくないが、
// 変更のたびにDBへの新しい接続も作成したくないため必要です。
// 本番環境では、DBへの単一の接続を持ちます。
if (process.env.NODE_ENV === "production") {
  prisma = getClient();
} else {
  if (!global.__db__) {
    global.__db__ = getClient();
  }
  prisma = global.__db__;
}

function getClient() {
  const { DATABASE_URL } = process.env;
  if (!DATABASE_URL) {
    throw new Error("DATABASE_URLが必要です");
  }

  const databaseUrl = new URL(DATABASE_URL);

  const isLocalHost = databaseUrl.hostname === "localhost";

  const PRIMARY_REGION = isLocalHost ? null : process.env.PRIMARY_REGION;
  const FLY_REGION = isLocalHost ? null : process.env.FLY_REGION;

  const isReadReplicaRegion = !PRIMARY_REGION || PRIMARY_REGION === FLY_REGION;

  if (!isLocalHost && !isReadReplicaRegion) {
    // 5433はリードレプリカポート
    databaseUrl.port = "5433";
    databaseUrl.host = `${FLY_REGION}.${databaseUrl.host}`;
  }

  console.log(`🔌 setting up prisma client to ${databaseUrl.host}`);

  const client = new PrismaClient({
    datasources: {
      db: {
        url: databaseUrl.toString(),
      },
    },
  });

  // 積極的に接続
  client.$connect();

  return client;
}

export { prisma };
