import { createClient } from "@libsql/client";
import "dotenv/config";
import { drizzle } from "drizzle-orm/libsql";

const client = createClient({ url: process.env.DB_FILE_NAME as string });
export const db = drizzle({ client });
