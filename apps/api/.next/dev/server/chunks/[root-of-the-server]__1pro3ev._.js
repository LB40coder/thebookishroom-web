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
"[project]/packages/shared/src/authors/book-links.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "bookLinksToStorage",
    ()=>bookLinksToStorage,
    "parseBookLink",
    ()=>parseBookLink,
    "parseBookLinks",
    ()=>parseBookLinks,
    "resolveBookLinkHref",
    ()=>resolveBookLinkHref,
    "resolveBookLinkTitle",
    ()=>resolveBookLinkTitle,
    "serializeBookLink",
    ()=>serializeBookLink
]);
function parseBookLink(stored) {
    const trimmed = stored.trim();
    if (!trimmed) return null;
    if (trimmed.startsWith("{")) {
        try {
            const parsed = JSON.parse(trimmed);
            if (typeof parsed.title === "string" && parsed.title.trim()) {
                return {
                    title: parsed.title.trim(),
                    url: typeof parsed.url === "string" ? parsed.url.trim() : ""
                };
            }
        } catch  {
        // fall through to plain string
        }
    }
    return {
        title: trimmed,
        url: ""
    };
}
function parseBookLinks(stored) {
    return stored.map(parseBookLink).filter((link)=>link !== null);
}
function serializeBookLink(link) {
    return JSON.stringify({
        title: link.title.trim(),
        url: link.url.trim()
    });
}
function bookLinksToStorage(links) {
    return links.filter((link)=>link.title.trim()).map(serializeBookLink);
}
function resolveBookLinkTitle(link, authorBooks) {
    const matched = authorBooks.find((book)=>book.slug === link.title);
    return matched?.title ?? link.title;
}
function resolveBookLinkHref(link, authorBooks) {
    if (link.url) return link.url;
    const matched = authorBooks.find((book)=>book.slug === link.title);
    if (matched) return `/books/${matched.slug}`;
    return null;
}
}),
"[project]/packages/shared/src/data/authors.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getAuthorBySlug",
    ()=>getAuthorBySlug,
    "getAuthorSlugs",
    ()=>getAuthorSlugs,
    "getPublishedAuthors",
    ()=>getPublishedAuthors,
    "getPublishedAuthorsWithBookCounts",
    ()=>getPublishedAuthorsWithBookCounts
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$authors$2f$book$2d$links$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/shared/src/authors/book-links.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/shared/src/db.ts [app-route] (ecmascript)");
;
;
function toAuthor(row) {
    return {
        name: row.name,
        slug: row.slug,
        bio: row.bio,
        nationality: row.nationality,
        birthYear: row.birthYear ?? undefined,
        deathYear: row.deathYear ?? undefined,
        mainBooks: (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$authors$2f$book$2d$links$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseBookLinks"])(row.mainBooks),
        whereToStart: row.whereToStart,
        readingOrder: (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$authors$2f$book$2d$links$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseBookLinks"])(row.readingOrder),
        image: row.image ?? undefined
    };
}
async function getPublishedAuthors() {
    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isDatabaseConfigured"])()) return [];
    const rows = await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].author.findMany({
        where: {
            published: true
        },
        orderBy: {
            name: "asc"
        }
    });
    return rows.map(toAuthor);
}
async function getPublishedAuthorsWithBookCounts() {
    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isDatabaseConfigured"])()) return [];
    const [authors, bookCounts] = await Promise.all([
        __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].author.findMany({
            where: {
                published: true
            },
            orderBy: {
                name: "asc"
            }
        }),
        __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].book.groupBy({
            by: [
                "authorSlug"
            ],
            where: {
                published: true
            },
            _count: {
                _all: true
            }
        })
    ]);
    const countBySlug = new Map(bookCounts.map((row)=>[
            row.authorSlug,
            row._count._all
        ]));
    return authors.map((row)=>({
            ...toAuthor(row),
            bookCount: countBySlug.get(row.slug) ?? 0
        }));
}
async function getAuthorBySlug(slug) {
    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isDatabaseConfigured"])()) return null;
    const row = await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].author.findFirst({
        where: {
            slug,
            published: true
        }
    });
    return row ? toAuthor(row) : null;
}
async function getAuthorSlugs() {
    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isDatabaseConfigured"])()) return [];
    const rows = await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].author.findMany({
        where: {
            published: true
        },
        select: {
            slug: true
        },
        orderBy: {
            name: "asc"
        }
    });
    return rows.map((row)=>row.slug);
}
}),
"[project]/packages/shared/src/utils.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "cn",
    ()=>cn,
    "formatDate",
    ()=>formatDate,
    "slugify",
    ()=>slugify,
    "stripHtml",
    ()=>stripHtml
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/clsx/dist/clsx.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tailwind$2d$merge$2f$dist$2f$bundle$2d$mjs$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/tailwind-merge/dist/bundle-mjs.mjs [app-route] (ecmascript)");
;
;
function cn(...inputs) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tailwind$2d$merge$2f$dist$2f$bundle$2d$mjs$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["twMerge"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["clsx"])(inputs));
}
function formatDate(dateString) {
    return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric"
    });
}
function slugify(text) {
    return text.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/-{2,}/g, "-").replace(/^-+|-+$/g, "");
}
function stripHtml(html) {
    return html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}
}),
"[project]/packages/shared/src/data/taxonomy-defaults.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DEFAULT_GENRES",
    ()=>DEFAULT_GENRES,
    "DEFAULT_MOODS",
    ()=>DEFAULT_MOODS,
    "formatGenreName",
    ()=>formatGenreName,
    "normalizeGenreSlug",
    ()=>normalizeGenreSlug
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/shared/src/utils.ts [app-route] (ecmascript)");
;
const DEFAULT_GENRES = [
    {
        slug: "philosophy",
        name: "Philosophy"
    },
    {
        slug: "classics",
        name: "Classics"
    },
    {
        slug: "gothic",
        name: "Gothic"
    },
    {
        slug: "science-fiction",
        name: "Science Fiction"
    },
    {
        slug: "romance",
        name: "Romance"
    },
    {
        slug: "mystery",
        name: "Mystery"
    },
    {
        slug: "fantasy",
        name: "Fantasy"
    },
    {
        slug: "historical-fiction",
        name: "Historical Fiction"
    },
    {
        slug: "literary-fiction",
        name: "Literary Fiction"
    },
    {
        slug: "poetry",
        name: "Poetry"
    },
    {
        slug: "drama",
        name: "Drama"
    },
    {
        slug: "horror",
        name: "Horror"
    }
];
const DEFAULT_MOODS = [
    {
        slug: "dark-academia",
        name: "Dark Academia",
        description: "Scholarly secrets, gothic campuses, and intellectual obsession.",
        icon: "graduation-cap"
    },
    {
        slug: "cozy",
        name: "Cozy",
        description: "Warm blankets, tea, and gentle stories for quiet moments.",
        icon: "coffee"
    },
    {
        slug: "gothic",
        name: "Gothic",
        description: "Atmospheric tales of mystery, decay, and the supernatural.",
        icon: "castle"
    },
    {
        slug: "romantic",
        name: "Romantic",
        description: "Love letters, longing glances, and heartfelt connections.",
        icon: "heart"
    },
    {
        slug: "rainy-day",
        name: "Rainy Day",
        description: "Perfect reads for gray skies and a cup of something warm.",
        icon: "cloud-rain"
    },
    {
        slug: "inspiring",
        name: "Inspiring",
        description: "Stories that uplift, motivate, and expand your perspective.",
        icon: "sparkles"
    },
    {
        slug: "classics",
        name: "Classics",
        description: "Timeless literature that has shaped generations of readers.",
        icon: "book-open"
    },
    {
        slug: "mystery",
        name: "Mystery",
        description: "Puzzles to solve, secrets to uncover, and twists to savor.",
        icon: "search"
    }
];
function formatGenreName(slug) {
    return slug.split("-").map((word)=>word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
}
function normalizeGenreSlug(value) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["slugify"])(value.replace(/\s+/g, "-"));
}
}),
"[project]/packages/shared/src/data/moods.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createMood",
    ()=>createMood,
    "ensureDefaultMoodsSeeded",
    ()=>ensureDefaultMoodsSeeded,
    "getMoodBySlug",
    ()=>getMoodBySlug,
    "getMoods",
    ()=>getMoods,
    "updateMood",
    ()=>updateMood
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/shared/src/db.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$data$2f$taxonomy$2d$defaults$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/shared/src/data/taxonomy-defaults.ts [app-route] (ecmascript)");
;
;
function toMood(row) {
    return {
        slug: row.slug,
        name: row.name,
        description: row.description,
        icon: row.icon
    };
}
async function ensureDefaultMoodsSeeded() {
    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isDatabaseConfigured"])()) return;
    await Promise.all(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$data$2f$taxonomy$2d$defaults$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["DEFAULT_MOODS"].map((mood)=>__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].mood.upsert({
            where: {
                slug: mood.slug
            },
            create: mood,
            update: {
                name: mood.name,
                description: mood.description
            }
        })));
}
async function getMoods() {
    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isDatabaseConfigured"])()) return __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$data$2f$taxonomy$2d$defaults$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["DEFAULT_MOODS"];
    try {
        await ensureDefaultMoodsSeeded();
        const rows = await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].mood.findMany({
            orderBy: {
                name: "asc"
            }
        });
        return rows.map(toMood);
    } catch (error) {
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isMissingPrismaTableError"])(error)) return __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$data$2f$taxonomy$2d$defaults$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["DEFAULT_MOODS"];
        throw error;
    }
}
async function getMoodBySlug(slug) {
    const moods = await getMoods();
    return moods.find((mood)=>mood.slug === slug);
}
async function createMood(input) {
    const row = await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].mood.create({
        data: {
            name: input.name,
            slug: input.slug,
            description: input.description ?? "",
            icon: input.icon ?? "book-open"
        }
    });
    return toMood(row);
}
async function updateMood(id, input) {
    const row = await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].mood.update({
        where: {
            id
        },
        data: input
    });
    return toMood(row);
}
}),
"[project]/apps/api/src/app/api/public/slugs/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
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
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$data$2f$posts$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/shared/src/data/posts.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$data$2f$authors$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/shared/src/data/authors.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$data$2f$moods$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/shared/src/data/moods.ts [app-route] (ecmascript)");
;
;
;
;
;
const runtime = "nodejs";
async function OPTIONS(request) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$api$2f$src$2f$lib$2f$cors$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["corsOptions"])(request);
}
async function GET(request) {
    const [books, posts, authors, moods] = await Promise.all([
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$data$2f$books$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getBookSlugs"])(),
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$data$2f$posts$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getPostSlugs"])(),
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$data$2f$authors$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getAuthorSlugs"])(),
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$data$2f$moods$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getMoods"])()
    ]);
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$api$2f$src$2f$lib$2f$cors$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["jsonWithCors"])({
        data: {
            books,
            posts,
            authors,
            moods: moods.map((m)=>m.slug)
        }
    }, request);
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__1pro3ev._.js.map