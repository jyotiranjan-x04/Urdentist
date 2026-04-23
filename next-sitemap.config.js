/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://urdentist.in",
  generateRobotsTxt: true,
  transform: async (config, path) => {
    const priorities = {
      "/": 1.0,
      "/contact": 1.0,
      "/about": 0.8,
    };

    return {
      loc: path,
      priority: priorities[path] ?? (path.startsWith("/services") ? 0.9 : 0.7),
      changefreq: path === "/" ? "weekly" : "monthly",
      lastmod: new Date().toISOString(),
    };
  },
};
