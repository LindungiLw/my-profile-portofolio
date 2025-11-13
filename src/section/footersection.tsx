import { motion } from "motion/react";

export const FooterSection = () => {
  return (
    <footer className="bg-[#021526] border-t-2 border-[#03346E] py-12 px-6 relative overflow-hidden">
      <motion.div
        className="absolute inset-0 opacity-5"
        animate={{
          background: [
            "radial-gradient(circle at 0% 0%), #6EACDA 0%, transparent 50%)",
            "radial-gradient(circle at 100% 100%, #6EACDA 0%, transparent 50%)",
            "radial-gradient(circle at 0% 100%, #6EACDA 0%, transparent 50%)",
          ],
        }}
        transition={{ duration: 10, repeat: Infinity }}
      />
      <div>
        <div className="grid md:grid-cols-3">
          <motion.div>
            <h3 className="text-xl text-white mb-4" style={{ fontWeight: 600 }}>
              <span className="text-[#6EACDA">RAHMA &nbsp; LAOWO</span>
            </h3>
            <p className="text-[#E2E2B6] text-sm leading-relaxed">
              UI/UX Designer & Frontend Developer
            </p>
          </motion.div>

          {/*  */}
          <div>
            <h4 className="text-lg text-white mb-4" style={{ fontWeight: 600 }}>
              Review
            </h4>
          </div>
        </div>
      </div>
    </footer>
  );
};
