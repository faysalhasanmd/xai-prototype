"use client";

/**
 * Top navigation bar: logo, desktop nav links, launch button,
 * and a mobile burger trigger that toggles the slide-down menu.
 *
 * @param {{menuOpen: boolean, onToggleMenu: () => void}} props
 */
export default function Header({ menuOpen, onToggleMenu }) {
  return (
    <header className="absolute top-0 inset-x-0 h-16 sm:h-20 px-4 sm:px-8 md:px-12 lg:px-16 flex items-center justify-between z-30 border-b border-[#22252B]/20 backdrop-blur-md">
      <div className="text-[#ECEAE4] font-medium text-sm sm:text-base tracking-wider flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_10px_#00f2ff]" />
        Xai
      </div>

      <nav className="hidden md:flex items-center gap-8 lg:gap-12 text-[11px] lg:text-xs tracking-widest uppercase font-mono text-[#8B8E96]">
        <a
          href="#features"
          className="hover:text-cyan-400 transition-colors duration-300"
        >
          Core Engine
        </a>
        <a
          href="#workspace"
          className="hover:text-purple-400 transition-colors duration-300"
        >
          Workspace
        </a>
        <a
          href="#docs"
          className="hover:text-amber-400 transition-colors duration-300"
        >
          Documentation
        </a>
      </nav>

      <div className="flex items-center gap-3">
        <button className="hidden sm:inline-flex px-4 sm:px-5 py-2 text-[10px] lg:text-xs font-mono tracking-wider uppercase text-[#ECEAE4] bg-[#131519] border border-[#22252B] rounded-full hover:border-cyan-500/40 transition-all duration-300">
          Launch Console
        </button>

        {/* Mobile burger trigger */}
        <button
          onClick={onToggleMenu}
          aria-label="Toggle structural menu"
          className="md:hidden flex items-center justify-center w-9 h-9 rounded-full border border-[#22252B] bg-[#131519] text-[#8B8E96] active:scale-95 transition-transform"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            {menuOpen ? (
              <path d="M18 6 6 18M6 6l12 12" />
            ) : (
              <path d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>
    </header>
  );
}
