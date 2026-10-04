import type { NewsletterIssue } from "@/content/newsletter";
import { gradeDefinitions, NEWSLETTER, SITE_NAME } from "@/content/site";
import { siteUrl } from "@/lib/content";
import { issueLink, issueNumber, issuePath } from "@/lib/newsletter";

/**
 * Email-safe HTML for one issue: tables, inline styles, the site's palette, and
 * system fallbacks for the display and mono faces (email clients rarely load
 * web fonts). `{{ unsubscribe_url }}` is Buttondown's merge tag; other providers
 * substitute their own before sending.
 */

const PAPER = "#f6eeea";
const INK = "#182620";
const INK_SOFT = "#39463c";
const RASPBERRY = "#d6336c";
const RASPBERRY_DARK = "#a80f4c";
const COBALT = "#2049c7";
const GREEN = "#1f7a3d";
const ACID = "#d9f34a";
const HAIRLINE = "rgba(18,60,45,0.22)";

const DISPLAY = "'Archivo Black','Arial Black',Arial,Helvetica,sans-serif";
const BODY = "Archivo,Arial,Helvetica,sans-serif";
const MONO = "'Space Mono','Courier New',Courier,monospace";

function escape(value: string) {
  return value.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c] ?? c);
}

function kicker(text: string, color = RASPBERRY) {
  return `<p style="margin:0;color:${color};font:800 11px/1.4 ${MONO};letter-spacing:0.12em;text-transform:uppercase;">${escape(text)}</p>`;
}

function gradeChip(grade: NonNullable<NewsletterIssue["sections"][number]["items"][number]["grade"]>) {
  const definition = gradeDefinitions[grade];
  const color = grade === "A" ? GREEN : grade === "B" ? COBALT : grade === "C" ? RASPBERRY_DARK : INK_SOFT;
  return `<span style="display:inline-block;margin-left:8px;padding:2px 7px;border:1px solid ${INK};background:${PAPER};color:${color};font:800 10px/1.4 ${MONO};letter-spacing:0.08em;text-transform:uppercase;vertical-align:middle;">${escape(
    definition.code,
  )} · ${escape(definition.label)}</span>`;
}

export function renderIssueEmail(issue: NewsletterIssue) {
  const base = siteUrl();
  const online = issueLink(issue, issuePath(issue));
  const number = String(issueNumber(issue)).padStart(3, "0");

  const sections = issue.sections
    .map(
      (section) => `
      <tr><td style="padding:34px 0 10px;border-top:2px solid ${INK};">
        <p style="margin:0;text-align:center;font-size:26px;line-height:1;">${escape(section.emoji)}</p>
        <p style="margin:10px 0 0;text-align:center;color:${INK};font:800 15px/1.2 ${DISPLAY};letter-spacing:-0.02em;text-transform:uppercase;">${escape(section.heading)}</p>
      </td></tr>
      ${section.items
        .map(
          (item) => `
      <tr><td style="padding:14px 0 8px;">
        <p style="margin:0;font:800 19px/1.25 ${DISPLAY};letter-spacing:-0.02em;">
          <a href="${escape(issueLink(issue, item.href))}" style="color:${INK};text-decoration:underline;text-decoration-thickness:2px;text-underline-offset:3px;">${escape(item.title)}</a>
          <span style="color:${INK_SOFT};font:700 12px/1 ${MONO};white-space:nowrap;">(${escape(item.label)})</span>
        </p>
        ${item.grade ? `<p style="margin:8px 0 0;">${gradeChip(item.grade)}</p>` : ""}
        <p style="margin:10px 0 0;color:${INK};font:16px/1.55 ${BODY};">${escape(item.summary)}</p>
      </td></tr>`,
        )
        .join("")}`,
    )
    .join("");

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="color-scheme" content="light">
<title>${escape(issue.subject)}</title>
</head>
<body style="margin:0;padding:0;background:${PAPER};color:${INK};">
<div style="display:none;max-height:0;overflow:hidden;font-size:1px;line-height:1px;color:${PAPER};">${escape(issue.preheader)}&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${PAPER};">
<tr><td align="center" style="padding:0 12px 40px;">
<table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

  <tr><td style="padding:12px 18px;background:${INK};color:${PAPER};font:700 10px/1.4 ${MONO};letter-spacing:0.12em;text-transform:uppercase;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr>
      <td style="color:${PAPER};font:700 10px/1.4 ${MONO};letter-spacing:0.12em;">Issue ${number}</td>
      <td align="center" style="color:#f56f9e;font:700 10px/1.4 ${MONO};letter-spacing:0.12em;">${escape(NEWSLETTER.name)}</td>
      <td align="right" style="color:${PAPER};font:700 10px/1.4 ${MONO};letter-spacing:0.12em;">${escape(issue.dateLabel)}</td>
    </tr></table>
  </td></tr>

  <tr><td style="padding:26px 18px 18px;border-bottom:5px solid ${INK};">
    <a href="${escape(issueLink(issue, "/"))}" style="color:${INK};text-decoration:none;font:900 34px/0.9 ${DISPLAY};letter-spacing:-0.06em;text-transform:lowercase;">skin considered<span style="color:${RASPBERRY};">*</span></a>
    <p style="margin:10px 0 0;color:${INK_SOFT};font:700 10px/1.4 ${MONO};letter-spacing:0.1em;text-transform:uppercase;">
      <a href="${escape(issueLink(issue, "/newsletter"))}" style="color:${INK_SOFT};">Sign up</a> &nbsp;|&nbsp;
      <a href="${escape(issueLink(issue, "/about"))}" style="color:${INK_SOFT};">About</a> &nbsp;|&nbsp;
      <a href="${escape(online)}" style="color:${INK_SOFT};">View online</a>
    </p>
  </td></tr>

  <tr><td style="padding:26px 18px 6px;">
    ${kicker("Global skincare news, weighed")}
    <h1 style="margin:10px 0 0;color:${INK};font:900 30px/0.95 ${DISPLAY};letter-spacing:-0.045em;text-transform:uppercase;">${escape(issue.subject)}</h1>
  </td></tr>

  <tr><td style="padding:12px 18px 0;">
    ${issue.intro.map((paragraph) => `<p style="margin:0 0 14px;color:${INK};font:16px/1.55 ${BODY};">${escape(paragraph)}</p>`).join("")}
  </td></tr>

  <tr><td style="padding:0 18px;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">${sections}</table>
  </td></tr>

  ${
    issue.outro
      ? `<tr><td style="padding:26px 18px 0;"><table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr><td style="padding:14px 16px;background:${ACID};border:1px solid ${INK};color:${INK};font:14px/1.5 ${BODY};">${escape(issue.outro)}</td></tr></table></td></tr>`
      : ""
  }

  <tr><td style="padding:30px 18px 0;border-top:1px solid ${HAIRLINE};">
    <p style="margin:0;color:${INK_SOFT};font:12px/1.6 ${BODY};">
      ${escape(NEWSLETTER.name)} is the free email from ${escape(SITE_NAME)}. ${escape(NEWSLETTER.reassurance)} Grades are explained in the
      <a href="${escape(issueLink(issue, "/methodology"))}" style="color:${INK_SOFT};">methodology</a>; every file links its primary sources.
      This email is educational and is not medical advice.
    </p>
    <p style="margin:14px 0 0;color:${INK_SOFT};font:700 10px/1.6 ${MONO};letter-spacing:0.1em;text-transform:uppercase;">
      <a href="{{ unsubscribe_url }}" style="color:${INK_SOFT};">Unsubscribe</a> &nbsp;|&nbsp;
      <a href="${escape(issueLink(issue, "/privacy"))}" style="color:${INK_SOFT};">Privacy</a> &nbsp;|&nbsp;
      <a href="${escape(issueLink(issue, "/corrections"))}" style="color:${INK_SOFT};">Corrections</a> &nbsp;|&nbsp;
      <a href="${escape(base)}/rss.xml" style="color:${INK_SOFT};">RSS</a>
    </p>
    <p style="margin:10px 0 0;color:${INK_SOFT};font:700 10px/1.6 ${MONO};letter-spacing:0.1em;text-transform:uppercase;">© 2026 ${escape(SITE_NAME)}</p>
  </td></tr>

</table>
</td></tr>
</table>
</body>
</html>`;
}

/** Plain-text alternative for clients that strip HTML. */
export function renderIssueText(issue: NewsletterIssue) {
  const lines: string[] = [`${NEWSLETTER.name} — ${issue.dateLabel}`, issue.subject.toUpperCase(), "", ...issue.intro.flatMap((p) => [p, ""])];
  for (const section of issue.sections) {
    lines.push(`${section.emoji} ${section.heading.toUpperCase()}`, "");
    for (const item of section.items) {
      const grade = item.grade ? ` [${gradeDefinitions[item.grade].code}]` : "";
      lines.push(`${item.title} (${item.label})${grade}`, issueLink(issue, item.href), item.summary, "");
    }
  }
  if (issue.outro) lines.push(issue.outro, "");
  lines.push(`View online: ${issueLink(issue, issuePath(issue))}`, "Unsubscribe: {{ unsubscribe_url }}");
  return lines.join("\n");
}
