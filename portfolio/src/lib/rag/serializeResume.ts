import {
  about,
  achievements,
  certifications,
  education,
  experience,
  personal,
  projects,
  skills,
} from "@/data/resume";

export type ResumeRecord = {
  title: string;
  section: string;
  content: string;
};

export function serializeResume(): ResumeRecord[] {
  return [
    {
      title: "Profile",
      section: "Profile",
      content: [
        `Name: ${personal.name}`,
        `Role: ${personal.role}`,
        `Focus areas: ${personal.focusAreas.join(", ")}`,
        `Tagline: ${personal.tagline}`,
      ].join("\n"),
    },
    ...about.story.map((content, index) => ({
      title: "About",
      section: `About ${index + 1}`,
      content,
    })),
    ...experience.map((entry) => ({
      title: entry.role,
      section: "Experience",
      content: [
        `${entry.role} at ${entry.org} (${entry.period})`,
        entry.summary,
        ...entry.points,
        `Stack: ${entry.stack.join(", ")}`,
      ].join("\n"),
    })),
    ...projects.filter((project) => project.featured).map((project) => ({
      title: project.name,
      section: "Featured project",
      content: [
        project.pitch,
        project.description,
        `Challenge: ${project.challenge}`,
        `Learned: ${project.learned}`,
        `Stack: ${project.stack.join(", ")}`,
      ].join("\n"),
    })),
    ...skills.map((category) => ({
      title: category.label,
      section: "Skills",
      content: `${category.label}: ${category.skills.join(", ")}`,
    })),
    ...education.map((entry) => ({
      title: entry.degree,
      section: "Education",
      content: `${entry.degree} at ${entry.school} (${entry.period})`,
    })),
    ...certifications.map((entry) => ({
      title: entry.name,
      section: "Certification",
      content: `${entry.name} from ${entry.issuer} (${entry.date}). ${entry.note}`,
    })),
    ...achievements.map((entry) => ({
      title: entry.title,
      section: "Achievement",
      content: `${entry.title} at ${entry.org} (${entry.date}). ${entry.description}`,
    })),
  ];
}
