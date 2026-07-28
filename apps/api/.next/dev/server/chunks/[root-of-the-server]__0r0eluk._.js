module.exports = [
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[project]/apps/api/src/lib/cors/index.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "corsOptions",
    ()=>corsOptions,
    "jsonWithCors",
    ()=>jsonWithCors,
    "withCors",
    ()=>withCors
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
;
const ALLOWED_ORIGINS = [
    process.env.NEXT_PUBLIC_SITE_URL,
    "http://localhost:3456",
    "https://www.thebookishroom.com"
].filter(Boolean);
function withCors(response, request) {
    const origin = request.headers.get("origin");
    if (origin && ALLOWED_ORIGINS.some((allowed)=>origin === allowed || origin.startsWith(allowed))) {
        response.headers.set("Access-Control-Allow-Origin", origin);
        response.headers.set("Access-Control-Allow-Methods", "GET, OPTIONS");
        response.headers.set("Access-Control-Allow-Headers", "Content-Type");
    }
    return response;
}
function corsOptions(request) {
    const response = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"](null, {
        status: 204
    });
    return withCors(response, request);
}
function jsonWithCors(data, request, init) {
    const response = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(data, init);
    return withCors(response, request);
}
}),
"[project]/packages/shared/src/db.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "isDatabaseConfigured",
    ()=>isDatabaseConfigured,
    "isMissingPrismaTableError",
    ()=>isMissingPrismaTableError,
    "prisma",
    ()=>prisma
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f40$prisma$2f$client$29$__ = __turbopack_context__.i("[externals]/@prisma/client [external] (@prisma/client, cjs, [project]/node_modules/@prisma/client)");
;
function resolveDatabaseUrl() {
    return process.env.DATABASE_URL || process.env.POSTGRES_PRISMA_URL || process.env.POSTGRES_URL || process.env.DATABASE_URL_UNPOOLED || undefined;
}
// Vercel Neon integration exposes POSTGRES_* — Prisma expects DATABASE_URL
if (!process.env.DATABASE_URL) {
    const url = resolveDatabaseUrl();
    if (url) process.env.DATABASE_URL = url;
}
const globalForPrisma = globalThis;
const prisma = globalForPrisma.prisma || new __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f40$prisma$2f$client$29$__["PrismaClient"]({
    log: ("TURBOPACK compile-time truthy", 1) ? [
        "error"
    ] : "TURBOPACK unreachable"
});
if ("TURBOPACK compile-time truthy", 1) {
    globalForPrisma.prisma = prisma;
}
function isDatabaseConfigured() {
    return Boolean(resolveDatabaseUrl());
}
function isMissingPrismaTableError(error) {
    return typeof error === "object" && error !== null && "code" in error && error.code === "P2021";
}
}),
"[project]/packages/shared/src/data/books.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "filterPublishedBooks",
    ()=>filterPublishedBooks,
    "getBookBySlug",
    ()=>getBookBySlug,
    "getBookSlugs",
    ()=>getBookSlugs,
    "getBooksBySlugs",
    ()=>getBooksBySlugs,
    "getPublishedBooks",
    ()=>getPublishedBooks,
    "getPublishedBooksByAuthorSlug",
    ()=>getPublishedBooksByAuthorSlug
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/shared/src/db.ts [app-route] (ecmascript)");
;
function toBook(row) {
    return {
        title: row.title,
        slug: row.slug,
        author: row.author,
        authorSlug: row.authorSlug,
        year: row.year,
        genres: row.genres,
        moods: row.moods,
        difficulty: row.difficulty,
        length: row.length,
        description: row.description,
        whyRead: row.whyRead,
        whoIsItFor: row.whoIsItFor,
        estimatedReadingTime: row.estimatedReadingTime,
        similarBooks: row.similarBooks,
        coverImage: row.coverImage?.trim() || undefined,
        amazonEditions: row.amazonEditions ?? undefined
    };
}
async function getPublishedBooks() {
    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isDatabaseConfigured"])()) return [];
    const rows = await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].book.findMany({
        where: {
            published: true
        },
        orderBy: {
            title: "asc"
        }
    });
    return rows.map(toBook);
}
async function getBookBySlug(slug) {
    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isDatabaseConfigured"])()) return null;
    const row = await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].book.findFirst({
        where: {
            slug,
            published: true
        }
    });
    return row ? toBook(row) : null;
}
async function getBooksBySlugs(slugs) {
    if (!slugs.length || !(0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isDatabaseConfigured"])()) return [];
    const rows = await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].book.findMany({
        where: {
            slug: {
                in: slugs
            },
            published: true
        }
    });
    return rows.map(toBook);
}
async function getPublishedBooksByAuthorSlug(authorSlug) {
    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isDatabaseConfigured"])()) return [];
    const rows = await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].book.findMany({
        where: {
            authorSlug,
            published: true
        },
        orderBy: {
            year: "desc"
        }
    });
    return rows.map(toBook);
}
async function filterPublishedBooks(filters) {
    const books = await getPublishedBooks();
    return books.filter((book)=>{
        if (filters.mood && !book.moods.includes(filters.mood)) return false;
        if (filters.genre && !book.genres.includes(filters.genre)) return false;
        if (filters.length && book.length !== filters.length) return false;
        if (filters.difficulty && book.difficulty !== filters.difficulty) return false;
        return true;
    });
}
async function getBookSlugs() {
    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isDatabaseConfigured"])()) return [];
    const rows = await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].book.findMany({
        where: {
            published: true
        },
        select: {
            slug: true
        },
        orderBy: {
            title: "asc"
        }
    });
    return rows.map((row)=>row.slug);
}
}),
"[project]/apps/api/src/app/api/public/books/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GET",
    ()=>GET,
    "OPTIONS",
    ()=>OPTIONS,
    "runtime",
    ()=>runtime
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$api$2f$src$2f$lib$2f$cors$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/api/src/lib/cors/index.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$data$2f$books$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/shared/src/data/books.ts [app-route] (ecmascript)");
;
;
const runtime = "nodejs";
async function OPTIONS(request) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$api$2f$src$2f$lib$2f$cors$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["corsOptions"])(request);
}
async function GET(request) {
    const books = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$data$2f$books$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getPublishedBooks"])();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$api$2f$src$2f$lib$2f$cors$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["jsonWithCors"])({
        data: books
    }, request);
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__0r0eluk._.js.map