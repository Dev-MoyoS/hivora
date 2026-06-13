import type { SearchResult } from "@/types";
import {
  MOCK_HELP_POSTS,
  MOCK_RESOURCES,
  MOCK_STUDY_SESSIONS,
  MOCK_TALENT_OFFERS,
} from "@/lib/mock-data";

export function globalSearch(query: string, courseFilter?: string): SearchResult[] {
  const q = query.toLowerCase().trim();
  if (!q) return [];

  const results: SearchResult[] = [];

  MOCK_HELP_POSTS.forEach((p) => {
    if (courseFilter && !p.moduleTag.toLowerCase().includes(courseFilter.toLowerCase()))
      return;
    const match =
      p.assignmentTitle.toLowerCase().includes(q) ||
      p.content.toLowerCase().includes(q) ||
      p.moduleTag.toLowerCase().includes(q) ||
      p.courseTag.toLowerCase().includes(q);
    if (match) {
      results.push({
        id: p.id,
        type: "post",
        title: p.assignmentTitle,
        subtitle: `${p.moduleTag} · ${p.authorPseudonym}`,
        href: `/knowledge#post-${p.id}`,
      });
    }
  });

  MOCK_RESOURCES.forEach((r) => {
    if (courseFilter && r.module !== courseFilter) return;
    if (r.title.toLowerCase().includes(q) || r.module.toLowerCase().includes(q)) {
      results.push({
        id: r.id,
        type: "resource",
        title: r.title,
        subtitle: `${r.module} · ${r.type}`,
        href: "/knowledge/resources",
      });
    }
  });

  MOCK_STUDY_SESSIONS.forEach((s) => {
    if (s.title.toLowerCase().includes(q) || s.module.toLowerCase().includes(q)) {
      results.push({
        id: s.id,
        type: "group",
        title: s.title,
        subtitle: `${s.module} · ${s.participantCount} joined`,
        href: `/knowledge/groups/${s.id}`,
      });
    }
  });

  MOCK_TALENT_OFFERS.forEach((t) => {
    if (t.skill.toLowerCase().includes(q) || t.description.toLowerCase().includes(q)) {
      results.push({
        id: t.id,
        type: "talent",
        title: t.skill,
        subtitle: `${t.type} · ${t.pseudonym}`,
        href: "/knowledge/talent",
      });
    }
  });

  return results.slice(0, 12);
}
