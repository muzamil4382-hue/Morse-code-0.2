"use client";

import { useState, useCallback, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { Menu, X, Radio, ChevronDown, Sun, Moon, Monitor } from "lucide-react";
import { useEffect } from "react";

interface NavChild {
  label: string;
  href: string;
}

interface NavItem {
  label: string;
  href?: string;
  children?: NavChild[];
}

const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

const toolLinks: NavChild[] = [
  { label: "Text to Morse Code", href: "/" },
  { label: "Morse Code Decoder", href: "/morse-code-decoder" },
  { label: "Morse Code Alphabet", href: "/morse-code-alphabet" },
  { label: "Morse Code Numbers", href: "/morse-code-numbers" },
  { label: "Morse Code Sounds", href: "/morse-code-sounds" },
  { label: "Morse Code Timing", href: "/morse-code-timing" },
  { label: "Binary Code Translator", href: "/binary-code-translator" },
];

const wordLinks: NavChild[] = [
  { label: "SOS", href: "/sos-morse-code" },
  { label: "Hello", href: "/hello-in-morse-code" },
  { label: "Hi", href: "/hi-in-morse-code" },
  { label: "I Love You", href: "/i-love-you-in-morse-code" },
  { label: "Help Me", href: "/help-me-in-morse-code" },
  { label: "Yes", href: "/yes-in-morse-code" },
  { label: "No", href: "/no-in-morse-code" },
];

const alphabetLinks: NavChild[] = letters.map((l) => ({
  label: `${l} in Morse Code`,
  href: `/morse-code-letter/${l.toLowerCase()}`,
}));

const numberLinks: NavChild[] = "0123456789".split("").map((n) => ({
  label: `Number ${n}`,
  href: `/morse-code-number/${n}`,
}));

const learnLinks: NavChild[] = [
  { label: "What is Morse Code?", href: "/what-is-morse-code" },
  { label: "Learn Morse Code", href: "/learn-morse-code" },
  { label: "Morse Code Quiz", href: "/morse-code-quiz" },
  { label: "Morse Code Sounds", href: "/morse-code-sounds" },
  { label: "Morse Code Alphabet", href: "/morse-code-alphabet" },
];

const blogLinks: NavChild[] = [
  { label: "All Blog Posts", href: "/blog" },
  {
    label: "What is Morse Code?",
    href: "/blog/what-is-morse-code-complete-history-guide",
  },
  {
    label: "How to Learn Morse Code",
    href: "/blog/how-to-learn-morse-code-7-easy-steps",
  },
  {
    label: "Morse Code Alphabet Chart",
    href: "/blog/morse-code-alphabet-chart-complete-reference",
  },
];

const navItems: NavItem[] = [
  { label: "Translator", href: "/" },
  { label: "Tools", children: toolLinks },
  { label: "Alphabet", children: alphabetLinks },
  { label: "Numbers", children: numberLinks },
  { label: "Words", children: wordLinks },
  { label: "Learn", children: learnLinks },
  { label: "Blog", children: blogLinks },
];

const mobileExtraLinks: NavItem[] = [
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms & Conditions", href: "/terms" },
];

function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <button className="p-2 rounded-lg hover:bg-slate-200/60 transition-colors cursor-pointer" aria-label="Toggle theme">
        <Monitor className="w-4 h-4 text-slate-400" />
      </button>
    );
  }

  const cycle = () => {
    if (resolvedTheme === "light") setTheme("dark");
    else if (resolvedTheme === "dark") setTheme("system");
    else setTheme("light");
  };

  return (
    <button
      onClick={cycle}
      className="p-2 rounded-lg hover:bg-slate-200/60 dark:hover:bg-slate-700/60 transition-colors cursor-pointer"
      aria-label={`Current theme: ${resolvedTheme}. Click to change.`}
      title={
  theme === "system"
    ? `System (${resolvedTheme})`
    : theme
      ? theme.charAt(0).toUpperCase() + theme.slice(1)
      : "Theme"
}
    >
      {resolvedTheme === "dark" ? (
        <Moon className="w-4 h-4 text-amber-400" />
      ) : (
        <Sun className="w-4 h-4 text-slate-600" />
      )}
    </button>
  );
}

function DesktopDropdown({ item, pathname }: { item: NavItem; pathname: string }) {
  const [open, setOpen] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleMouseEnter = useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setOpen(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    timeoutRef.current = setTimeout(() => setOpen(false), 150);
  }, []);

  const isActive =
    item.href === pathname ||
    item.children?.some((c) => c.href === pathname);

  if (!item.children) {
    return (
      <Link
        href={item.href!}
        className={`px-3 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
          item.href === pathname
            ? "bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-400"
            : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800"
        }`}
      >
        {item.label}
      </Link>
    );
  }

  return (
    <div
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        className={`px-3 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-1 whitespace-nowrap cursor-pointer ${
          isActive
            ? "bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-400"
            : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800"
        }`}
        onClick={() => setOpen(!open)}
      >
        {item.label}
        <ChevronDown
          className={`w-3.5 h-3.5 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div className="absolute top-full left-0 pt-2 z-50">
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-slate-200/80 dark:border-slate-700/80 py-2 min-w-[220px] max-h-96 overflow-y-auto">
            {item.children.map((child) => (
              <Link
                key={child.href}
                href={child.href}
                onClick={() => setOpen(false)}
                className={`block px-4 py-2 text-sm transition-colors hover:bg-green-50 dark:hover:bg-green-900/30 hover:text-green-700 dark:hover:text-green-400 ${
                  child.href === pathname
                    ? "text-green-700 dark:text-green-400 bg-green-50/50 dark:bg-green-900/20 font-medium"
                    : "text-slate-600 dark:text-slate-300"
                }`}
              >
                {child.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function MobileAccordion({ item, pathname, onClose }: { item: NavItem; pathname: string; onClose: () => void }) {
  const [open, setOpen] = useState(false);
  const isActive =
    item.href === pathname ||
    item.children?.some((c) => c.href === pathname);

  if (!item.children) {
    return (
      <Link
        href={item.href!}
        onClick={onClose}
        className={`block px-4 py-2.5 text-sm font-medium rounded-lg transition-all ${
          item.href === pathname
            ? "bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-400"
            : "text-slate-600 dark:text-slate-300 hover:text-green-600 hover:bg-green-50/50 dark:hover:bg-green-900/20"
        }`}
      >
        {item.label}
      </Link>
    );
  }

  return (
    <div>
      <button
        onClick={() => setOpen(!open)}
        className={`flex items-center justify-between w-full px-4 py-2.5 text-sm font-medium rounded-lg transition-all cursor-pointer ${
          isActive
            ? "bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-400"
            : "text-slate-600 dark:text-slate-300 hover:text-green-600 hover:bg-green-50/50 dark:hover:bg-green-900/20"
        }`}
      >
        {item.label}
        <ChevronDown
          className={`w-4 h-4 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && (
        <div className="pl-4 py-1 space-y-0.5">
          {item.children.map((child) => (
            <Link
              key={child.href}
              href={child.href}
              onClick={onClose}
              className={`block px-4 py-2 text-sm rounded-lg transition-colors ${
                child.href === pathname
                  ? "text-green-700 dark:text-green-400 font-medium"
                  : "text-slate-500 dark:text-slate-400 hover:text-green-600 dark:hover:text-green-400 hover:bg-green-50/30 dark:hover:bg-green-900/10"
              }`}
            >
              {child.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  const closeMobile = useCallback(() => setMobileOpen(false), []);

  return (
    <header className="sticky top-0 z-50 bg-[#f8f9fa] dark:bg-slate-900 border-b border-slate-200/80 dark:border-slate-800">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="flex items-center justify-center w-8 h-8 bg-green-600 rounded-lg shadow-sm shadow-green-600/20 group-hover:shadow-md group-hover:shadow-green-600/30 transition-all">
              <Radio className="w-4 h-4 text-white" />
            </div>
            <span className="text-lg font-bold tracking-tight text-slate-900 dark:text-white">
              Morse<span className="text-green-600">Code</span>
              <span className="text-slate-400 dark:text-slate-500 text-xs font-normal ml-0.5">Translator</span>
            </span>
          </Link>

          <div className="hidden lg:flex items-center gap-0.5">
            {navItems.map((item) => (
              <DesktopDropdown key={item.label} item={item} pathname={pathname} />
            ))}
          </div>

          <div className="flex items-center gap-1">
            <ThemeToggle />
            <button
              className="lg:hidden p-2 rounded-lg hover:bg-slate-200/60 dark:hover:bg-slate-700/60 transition-colors cursor-pointer"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
            >
              {mobileOpen ? (
                <X className="w-5 h-5 text-slate-600 dark:text-slate-300" />
              ) : (
                <Menu className="w-5 h-5 text-slate-600 dark:text-slate-300" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {mobileOpen && (
        <div className="lg:hidden border-t border-slate-200/60 dark:border-slate-800 bg-[#f8f9fa] dark:bg-slate-900">
          <div className="mx-auto max-w-7xl px-4 py-3 flex flex-col gap-0.5 max-h-[80vh] overflow-y-auto">
            {navItems.map((item) => (
              <MobileAccordion
                key={item.label}
                item={item}
                pathname={pathname}
                onClose={closeMobile}
              />
            ))}
            <div className="h-px bg-slate-200 dark:bg-slate-800 my-2" />
            {mobileExtraLinks.map((item) => (
              <MobileAccordion
                key={item.label}
                item={item}
                pathname={pathname}
                onClose={closeMobile}
              />
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
