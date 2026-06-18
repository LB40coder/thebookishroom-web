import crypto from "crypto";
import bcrypt from "bcryptjs";

const adminPath = `cms-${crypto.randomBytes(8).toString("hex")}`;
const apiKey = crypto.randomBytes(48).toString("hex");
const sessionSecret = crypto.randomBytes(48).toString("hex");
const password = crypto.randomBytes(16).toString("base64url");
const passwordHash = await bcrypt.hash(password, 12);

console.log(`
# Copy these to your .env.local file
# NEVER commit .env.local to git

DATABASE_URL="postgresql://user:password@host:5432/bookish_room"

ADMIN_PATH="${adminPath}"
ADMIN_API_KEY="${apiKey}"
SESSION_SECRET="${sessionSecret}"
ADMIN_PASSWORD_HASH="${passwordHash}"

# One-time login password (save it somewhere safe, then delete this line):
# ADMIN_PASSWORD="${password}"
`);

console.error("⚠️  Save the password above — it won't be shown again.\n");
