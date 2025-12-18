"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import clsx from "clsx";

interface Designer {
  id: string;
  name: string;
  image: string;
}

interface DesignerAccordionProps {
  designers: Designer[];
  activeDesigner: string | null;
  onSelect: (designerId: string) => void;
}

export function DesignerAccordion({ designers, activeDesigner, onSelect }: DesignerAccordionProps) {
  return (
    <div className="w-full h-[300px] flex gap-2 md:gap-4 mb-16 overflow-hidden">
      {designers.map((designer) => {
        const isActive = activeDesigner === designer.name;
        
        return (
          <motion.div
            key={designer.id}
            layout
            onClick={() => onSelect(designer.name)}
            initial={false}
            animate={{
              flex: isActive ? 3 : 1,
            }}
            transition={{ type: "spring", stiffness: 200, damping: 30 }}
            className={clsx(
              "relative h-full rounded-2xl overflow-hidden cursor-pointer group isolation-isolate",
            )}
          >
            {/* Background Image */}
            <div className="absolute inset-0 w-full h-full">
               <Image
                src={designer.image}
                alt={designer.name}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 20vw"
                priority
                className={clsx(
                    "object-cover object-top transition-all duration-700 ease-in-out",
                    isActive ? "grayscale-0 scale-100" : "grayscale-[100%] scale-110 group-hover:grayscale-0 group-hover:scale-100"
                )}
              />
              {/* Overlay Gradient */}
              <div className={clsx(
                "absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent transition-opacity duration-500",
                isActive ? "opacity-90" : "opacity-60 group-hover:opacity-80"
              )} />
            </div>

            {/* Content */}
            <div className="absolute bottom-0 left-0 w-full p-6 flex flex-col justify-end h-full">
              {/* Vertical Text for Inactive State */}
              {!isActive && (
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-max hidden md:block">
                  <motion.p 
                    layoutId={`name-${designer.id}`}
                    className="text-white/70 text-xs font-bold tracking-[0.2em] uppercase truncate rotate-0 md:group-hover:text-white transition-colors"
                  >
                    {designer.name.split(" ")[1]} {/* Show Last Name mainly */}
                  </motion.p>
                </div>
              )}

              {/* Full Content for Active State */}
              {isActive && (
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="relative z-10"
                >
                  <p className="text-stone-400 text-xs font-bold tracking-[0.3em] uppercase mb-2">Designer</p>
                  <h3 className="text-white font-serif text-3xl md:text-4xl leading-none">
                    {designer.name}
                  </h3>
                  <div className="h-1 w-12 bg-white mt-4" />
                </motion.div>
              )}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
