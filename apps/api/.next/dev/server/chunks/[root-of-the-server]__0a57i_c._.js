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
"[project]/packages/shared/src/posts/visibility.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "defaultPublishDatetimeLocal",
    ()=>defaultPublishDatetimeLocal,
    "fromDatetimeLocalValue",
    ()=>fromDatetimeLocalValue,
    "getPostDisplayStatus",
    ()=>getPostDisplayStatus,
    "postStatusLabel",
    ()=>postStatusLabel,
    "publicPostFilter",
    ()=>publicPostFilter,
    "toDatetimeLocalValue",
    ()=>toDatetimeLocalValue
]);
function getPostDisplayStatus(published, publishedAt) {
    if (!published) return "draft";
    if (publishedAt.getTime() > Date.now()) return "scheduled";
    return "published";
}
function publicPostFilter() {
    return {
        published: true,
        publishedAt: {
            lte: new Date()
        }
    };
}
function toDatetimeLocalValue(date) {
    const local = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
    return local.toISOString().slice(0, 16);
}
function fromDatetimeLocalValue(value) {
    return new Date(value);
}
function defaultPublishDatetimeLocal() {
    return toDatetimeLocalValue(new Date());
}
function postStatusLabel(status) {
    switch(status){
        case "draft":
            return "Draft";
        case "scheduled":
            return "Scheduled";
        case "published":
            return "Published";
    }
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
"[project]/packages/shared/src/data/posts.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getPostBySlug",
    ()=>getPostBySlug,
    "getPostSlugs",
    ()=>getPostSlugs,
    "getPostsByMood",
    ()=>getPostsByMood,
    "getPostsByRelatedBook",
    ()=>getPostsByRelatedBook,
    "getPostsByTag",
    ()=>getPostsByTag,
    "getPublishedPosts",
    ()=>getPublishedPosts,
    "getTrendingPosts",
    ()=>getTrendingPosts
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$posts$2f$visibility$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/shared/src/posts/visibility.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/shared/src/db.ts [app-route] (ecmascript)");
;
;
function toPost(row) {
    return {
        title: row.title,
        slug: row.slug,
        excerpt: row.excerpt,
        content: row.content,
        coverImage: row.coverImage,
        category: row.category,
        tags: row.tags,
        moods: row.moods,
        relatedBooks: row.relatedBooks,
        publishedAt: row.publishedAt.toISOString(),
        updatedAt: row.updatedAt.toISOString(),
        readingTime: row.readingTime,
        views: row.views,
        seoTitle: row.seoTitle,
        seoDescription: row.seoDescription
    };
}
async function getPublishedPosts(options) {
    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isDatabaseConfigured"])()) return [];
    const rows = await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].post.findMany({
        where: {
            ...(0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$posts$2f$visibility$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["publicPostFilter"])(),
            ...options?.mood ? {
                moods: {
                    has: options.mood
                }
            } : {},
            ...options?.tag ? {
                tags: {
                    has: options.tag
                }
            } : {},
            ...options?.category ? {
                category: options.category
            } : {},
            ...options?.excludeSlug ? {
                slug: {
                    not: options.excludeSlug
                }
            } : {}
        },
        orderBy: {
            publishedAt: "desc"
        },
        ...options?.limit ? {
            take: options.limit
        } : {}
    });
    return rows.map(toPost);
}
async function getPostBySlug(slug) {
    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isDatabaseConfigured"])()) return null;
    const row = await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].post.findFirst({
        where: {
            slug,
            ...(0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$posts$2f$visibility$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["publicPostFilter"])()
        }
    });
    return row ? toPost(row) : null;
}
async function getPostsByMood(mood) {
    return getPublishedPosts({
        mood
    });
}
async function getPostsByTag(tag) {
    return getPublishedPosts({
        tag
    });
}
async function getPostsByRelatedBook(bookSlug) {
    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isDatabaseConfigured"])()) return [];
    const rows = await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].post.findMany({
        where: {
            ...(0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$posts$2f$visibility$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["publicPostFilter"])(),
            relatedBooks: {
                has: bookSlug
            }
        },
        orderBy: {
            publishedAt: "desc"
        }
    });
    return rows.map(toPost);
}
async function getTrendingPosts(limit = 5) {
    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isDatabaseConfigured"])()) return [];
    const rows = await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].post.findMany({
        where: (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$posts$2f$visibility$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["publicPostFilter"])(),
        orderBy: [
            {
                views: "desc"
            },
            {
                publishedAt: "desc"
            }
        ],
        take: limit
    });
    return rows.map(toPost);
}
async function getPostSlugs() {
    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isDatabaseConfigured"])()) return [];
    const rows = await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].post.findMany({
        where: (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$posts$2f$visibility$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["publicPostFilter"])(),
        select: {
            slug: true
        },
        orderBy: {
            publishedAt: "desc"
        }
    });
    return rows.map((row)=>row.slug);
}
}),
"[project]/apps/api/src/app/api/public/posts/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
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
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$data$2f$posts$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/shared/src/data/posts.ts [app-route] (ecmascript)");
;
;
const runtime = "nodejs";
async function OPTIONS(request) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$api$2f$src$2f$lib$2f$cors$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["corsOptions"])(request);
}
async function GET(request) {
    const { searchParams } = new URL(request.url);
    const mood = searchParams.get("mood") ?? undefined;
    const tag = searchParams.get("tag") ?? undefined;
    const category = searchParams.get("category") ?? undefined;
    const excludeSlug = searchParams.get("excludeSlug") ?? undefined;
    const limit = searchParams.get("limit");
    const trending = searchParams.get("trending");
    const relatedBook = searchParams.get("relatedBook") ?? undefined;
    let posts;
    if (trending) {
        posts = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$data$2f$posts$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getTrendingPosts"])(limit ? parseInt(limit, 10) : 5);
    } else if (relatedBook) {
        posts = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$data$2f$posts$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getPostsByRelatedBook"])(relatedBook);
    } else if (mood) {
        posts = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$data$2f$posts$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getPostsByMood"])(mood);
    } else {
        posts = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$data$2f$posts$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getPublishedPosts"])({
            mood,
            tag,
            category,
            excludeSlug,
            limit: limit ? parseInt(limit, 10) : undefined
        });
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$api$2f$src$2f$lib$2f$cors$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["jsonWithCors"])({
        data: posts
    }, request);
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__0a57i_c._.js.map