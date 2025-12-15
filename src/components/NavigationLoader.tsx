import { Shield } from "lucide-react";
import { motion } from "motion/react";

export function NavigationLoader() {
  return (
    <div className="fixed inset-0 bg-[#003f69] z-50 flex items-center justify-center">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-0 right-0 w-96 h-96 border border-[#285e8e]/10"
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div
          className="absolute bottom-0 left-0 w-96 h-96 border border-[#285e8e]/10"
          animate={{
            rotate: -360,
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Decorative line - top */}
        <motion.div
          className="h-24 w-px bg-gradient-to-b from-transparent to-[#c9b07a]"
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />

        {/* Main loader - matching login design */}
        <div className="relative my-12 w-[280px] h-[280px] flex items-center justify-center">
          {/* Dashed circle background */}
          <motion.div
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.3 }}
            transition={{ duration: 0.8 }}
          >
            <svg width="280" height="280" viewBox="0 0 280 280">
              <circle
                cx="140"
                cy="140"
                r="120"
                fill="none"
                stroke="#9ab3c9"
                strokeWidth="1"
                strokeDasharray="6 6"
              />
            </svg>
          </motion.div>

          {/* Rotating golden arc */}
          <motion.div
            className="absolute inset-0"
            animate={{ rotate: 360 }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            <svg width="280" height="280" viewBox="0 0 280 280">
              <path
                d="M 140 20 A 120 120 0 0 1 245 85"
                fill="none"
                stroke="#c9b07a"
                strokeWidth="3"
                strokeLinecap="round"
              />
            </svg>
          </motion.div>

          {/* Orbital dots (3 dots moving in sequence) */}
          {[0, 1, 2].map((index) => {
            return (
              <motion.div
                key={index}
                className="absolute w-3 h-3 rounded-full bg-[#868c94]"
                style={{
                  left: '50%',
                  top: '50%',
                }}
                animate={{
                  x: [
                    Math.cos((index * 120 - 90) * Math.PI / 180) * 120,
                    Math.cos((index * 120 + 30 - 90) * Math.PI / 180) * 120,
                    Math.cos((index * 120 + 60 - 90) * Math.PI / 180) * 120,
                    Math.cos((index * 120 + 90 - 90) * Math.PI / 180) * 120,
                    Math.cos((index * 120 + 120 - 90) * Math.PI / 180) * 120,
                  ],
                  y: [
                    Math.sin((index * 120 - 90) * Math.PI / 180) * 120,
                    Math.sin((index * 120 + 30 - 90) * Math.PI / 180) * 120,
                    Math.sin((index * 120 + 60 - 90) * Math.PI / 180) * 120,
                    Math.sin((index * 120 + 90 - 90) * Math.PI / 180) * 120,
                    Math.sin((index * 120 + 120 - 90) * Math.PI / 180) * 120,
                  ],
                  opacity: [0.4, 0.7, 1, 0.7, 0.4],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear",
                  delay: index * 1
                }}
              />
            );
          })}

          {/* Central square with shield */}
          <motion.div
            className="relative w-28 h-28 border-2 border-[#e8ebee] bg-[#285e8e]/30 backdrop-blur-sm flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: "backOut", delay: 0.2 }}
          >
            {/* Shield icon */}
            <motion.div
              animate={{
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <Shield className="w-14 h-14 text-[#c9b07a]" strokeWidth={1.5} fill="none" />
            </motion.div>
          </motion.div>
        </div>

        {/* Decorative line - bottom */}
        <motion.div
          className="h-24 w-px bg-gradient-to-t from-transparent to-[#c9b07a]"
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        />

        {/* CHUBB text */}
        <motion.div
          className="text-center mt-12 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <h1 className="text-[#ffffff] text-4xl tracking-[0.4em] mb-3">C H U B B</h1>
          <div className="h-1 w-32 bg-[#c9b07a] mx-auto" />
        </motion.div>

        {/* CARGANDO text */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.7 }}
        >
          <p className="text-[#9ab3c9] tracking-[0.4em] text-sm mb-6">CARGANDO</p>
          
          {/* Animated dots */}
          <div className="flex items-center justify-center gap-3">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-2.5 h-2.5 rounded-full bg-[#c9b07a]"
                animate={{
                  scale: [1, 1.4, 1],
                  opacity: [0.4, 1, 0.4]
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: i * 0.3,
                  ease: "easeInOut"
                }}
              />
            ))}
          </div>
        </motion.div>

        {/* Progress bar */}
        <motion.div
          className="w-80 h-1 bg-[#285e8e]/30 relative overflow-hidden rounded-full"
          initial={{ opacity: 0, scaleX: 0.8 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.9 }}
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-[#c9b07a] to-transparent"
            animate={{
              x: ["-100%", "200%"]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </motion.div>
      </div>
    </div>
  );
}
