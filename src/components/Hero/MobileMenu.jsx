"use client";

import { motion, AnimatePresence } from "framer-motion";

/**
 * Slide-down mobile navigation panel, shown only when menuOpen is true.
 * @param {{isOpen: boolean, onClose: () => void}} props
 */
export default function MobileMenu({ isOpen, onClose }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="absolute top-16 inset-x-0 z-40 md:hidden mx-4 p-5 rounded-xl border border-[#22252B] bg-[#050608]/95 backdrop-blur-xl flex flex-col gap-4 text-xs font-mono text-[#8B8E96]"
        >
          <a href="#features" onClick={onClose} className="hover:text-cyan-400 p-1">
            Core Engine
          </a>
          <a href="#workspace" onClick={onClose} className="hover:text-purple-400 p-1">
            Workspace
          </a>
          <a href="#docs" onClick={onClose} className="hover:text-amber-400 p-1">
            Documentation
          </a>
          <button className="w-full mt-2 py-2.5 text-[10px] tracking-wider uppercase font-mono rounded-full border border-[#22252B] bg-[#131519] text-[#ECEAE4]">
            Launch Console
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
