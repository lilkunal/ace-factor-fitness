import { copyFileSync, readFileSync, writeFileSync } from "node:fs";

const REPO = "ace-factor-fitness";
const segmentCount = 1;

const indexRedirectScript = `
<script type="text/javascript">
(function (l) {
  if (!l.search) return;
  var q = {};
  l.search.slice(1).split("&").forEach(function (v) {
    var a = v.split("=");
    q[a[0]] = a.slice(1).join("=").replace(/~and~/g, "&");
  });
  if (q.p === undefined) return;
  var path = q.p.startsWith("/") ? q.p : "/" + q.p;
  window.history.replaceState(
    null,
    null,
    l.pathname.replace(/\\/$/, "") + path + (q.q ? "?" + q.q : "") + l.hash
  );
})(window.location);
</script>`;

const redirect404Html = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>Ace Factor Fitness</title>
    <script type="text/javascript">
      var segmentCount = ${segmentCount};
      var l = window.location;
      l.replace(
        l.protocol + "//" + l.hostname + (l.port ? ":" + l.port : "") +
        l.pathname.split("/").slice(0, 1 + segmentCount).join("/") + "/?p=/" +
        l.pathname.slice(1).split("/").slice(segmentCount).join("/").replace(/&/g, "~and~") +
        (l.search ? "&q=" + l.search.slice(1).replace(/&/g, "~and~") : "") +
        l.hash
      );
    </script>
  </head>
  <body></body>
</html>`;

const indexPath = "dist/index.html";
let indexHtml = readFileSync(indexPath, "utf8");

if (!indexHtml.includes("q.p === undefined")) {
  indexHtml = indexHtml.replace("</head>", `${indexRedirectScript}\n  </head>`);
  writeFileSync(indexPath, indexHtml);
}

writeFileSync("dist/404.html", redirect404Html);
console.log(`GitHub Pages SPA routing configured for /${REPO}/`);
