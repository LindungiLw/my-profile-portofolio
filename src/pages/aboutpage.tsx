import { User, Home, MapPin, Mail, Phone, Briefcase } from "lucide-react";
import { FooterSection } from "../section/FooterSection";
import { motion } from "motion/react";

export const AboutPage = () => {
  const personalInfo = [
    { icon: User, label: "Age", value: "25 Years" },
    { icon: Home, label: "Residence", value: "Indonesia" },
    { icon: MapPin, label: "Address", value: "Jakarta, Indonesia" },
    { icon: Mail, label: "Email", value: "rahma.laowo@example.com" },
    { icon: Phone, label: "Phone", value: "+62 812 3456 7890" },
    { icon: Briefcase, label: "Freelance", value: "Available" },
  ];

  const Skills = [
    { name: "HTML", level: "80%" },
    { name: "CSS", level: "70%" },
    { name: "Javascript", level: "60%" },
    { name: "React JS", level: "50%" },
  ];

  return (
    <section className="py-20 px-6 bg-background relative overflow-hidden">
      <div className="container mx-auto max-w-7xl relative z-10">
        <motion.div>
          <p className="text-secondary tracking-wider mb-2 font-semibold">
            WHO I AM
          </p>
          <h2
            className="text-4xl md:text-5xl text-foreground mb-4"
            style={{ fontWeight: 700 }}
          >
            About My Resume
          </h2>
          <div className="w-20 h-1 bg-secondary mt-4 rounded-full" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 mb-16 mt-12">
          {/* --- BAGIAN KIRI: Personal Info --- */}
          <motion.div>
            <h3
              className="text-2xl text-secondary mb-6"
              style={{ fontWeight: 600 }}
            >
              Personal Information
            </h3>

            <div className="space-y-4">
              {personalInfo.map((item, index) => (
                <motion.div
                  key={index}
                  className="flex items-center gap-4 p-3 hover:bg-primary/30 rounded-xl transition-all duration-300 cursor-pointer group border border-transparent hover:border-secondary/30"
                >
                  <motion.div className="p-3 bg-primary/40 rounded-xl group-hover:bg-secondary transition-colors shadow-sm">
                    <item.icon className="w-5 h-5 text-secondary group-hover:text-secondary-foreground" />
                  </motion.div>

                  <div>
                    <p className="text-sm text-foreground/80 font-medium">
                      {item.label}
                    </p>
                    <p
                      className="text-foreground text-lg"
                      style={{ fontWeight: 600 }}
                    >
                      {item.value}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* --- BAGIAN KANAN: Workspace Image --- */}
          <motion.div className="relative rounded-2xl overflow-hidden group border border-secondary/20 shadow-2xl h-[400px]">
            <img
              src="/images/workspace.jpg"
              alt="Workspace"
              className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
            />

            {/* Overlay gelap agar gambar menyatu dengan tema */}
            <div className="absolute inset-0 bg-primary opacity-30 mix-blend-multiply group-hover:opacity-10 transition-opacity" />

            {/* Gradient shadow untuk teks (Aman dari warning) */}
            <motion.div className="absolute bottom-0 left-0 right-0 p-6 bg-[linear-gradient(to_top,var(--color-background),transparent)]">
              <p className="text-foreground text-xl font-bold">
                Collaborative workspace
              </p>
            </motion.div>
          </motion.div>
        </div>

        <FooterSection />
      </div>
    </section>
  );
};
