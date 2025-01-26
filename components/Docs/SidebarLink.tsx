"use client";

interface SidebarLinkProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

const SidebarLink = ({ activeSection, setActiveSection }: SidebarLinkProps) => {
  // Links data
  const links = [
    { label: "Introduction", section: "introduction" },
    { label: "What Is Play2World?", section: "what-is-play2world" },
    { label: "How Do Rewards Work?", section: "how-rewards-work" },
    { label: "Why Do We Do This?", section: "why-do-we-do-this" },
  ];

  return (
    <>
      {links.map((link) => (
        <li key={link.section} className="block">
          <button
            onClick={() => setActiveSection(link.section)}
            className={`flex w-full rounded-sm px-3 py-2 text-base ${
              activeSection === link.section
                ? "bg-stroke text-black dark:bg-blackho dark:text-white"
                : "text-black dark:text-white"
            }`}
          >
            {link.label}
          </button>
        </li>
      ))}
    </>
  );
};

export default SidebarLink;
