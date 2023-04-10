import { motion } from "framer-motion";

const style: any = {
  width: "240px",
  height: "240px",
  borderRadius: "50%",
  position: "absolute",
};

export default function HeroPulse() {
  return (
    <motion.div
      style={style}
      className="bg-gradient-to-t from-[#2ec4b6] to-transparent white:from-black border border-brand"
      animate={{
        scale: [1, 1.5, 1.5],
        opacity: [0, 0.5, 0, 0],
      }}
      transition={{
        duration: 4,
        ease: "easeInOut",
        repeat: Infinity,
      }}
    >
      <motion.div
        style={style}
        className="bg-gradient-to-t from-[#2ec4b6] to-transparent white:from-black border border-brand"
        animate={{
          scale: [1, 1.5, 1.5],
          opacity: [0, 0.5, 0, 0],
        }}
        transition={{
          duration: 4,
          ease: "easeInOut",
          repeat: Infinity,
        }}
      >
        <motion.div
          style={style}
          className="bg-gradient-to-t from-[#2ec4b6] to-transparent white:from-black border border-brand"
          animate={{
            scale: [1, 1.5, 1.5],
            opacity: [0, 0.5, 0, 0],
          }}
          transition={{
            duration: 4,
            ease: "easeInOut",
            repeat: Infinity,
          }}
        ></motion.div>
      </motion.div>
    </motion.div>
  );
}
