import { User, Home, MapPin, Mail, Phone, Briefcase } from "lucide-react";
import { FooterSection } from "../section/footersection";
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
    {
      name: "HTML",
      level: "80%",
    },
    {
      name: "CSS",
      level: "70%",
    },
    {
      name: "Javascript",
      level: "60%",
    },
    {
      name: "React JS",
      level: "50%",
    },
  ];

  return (
    <section className="py-20 px-6 bg-[#021526] relative overflow-hidden">
      <div className="container mx-auto max-w-7xl relative z-10">
        <motion.div>
          <p className="text-[#6EACDA] tracking-wider mb-2">WHO I AM</p>
          <h2
            className="text-4xl md: text-5xl text-white mb-4"
            style={{ fontWeight: 700 }}
          >
            About My Resume
          </h2>
          <div className="w-20 h-1 bg-[#6EACDA] mx-auto mt-4" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Personal Info */}
          <motion.div>
            <h3
              className="text-2xl text-[#6EACDA] mb-6"
              style={{ fontWeight: 600 }}
            >
              Personal Information
            </h3>

            <div className="space-y-4">
              {personalInfo.map((item, index) => (
                <motion.div
                  key={index}
                  className="flex items-center gap-4 p-3 hover:bg-[#03346E]/10 rounded-lg transition-all duration-300 cursor-pointer group"
                >
                  <motion.div>
                    <item.icon className="w-5 h-5 text-white group-hover:text-[#021526]" />
                  </motion.div>

                  <div>
                    <p className="text-sm text-[#03346E] opacity-80">
                      {item.label}
                    </p>
                    <p className="text-[#021526]" style={{ fontWeight: 600 }}>
                      {item.value}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Workspace Image   */}
          <motion.div>
            <motion.div>
              <motion.div>
                <img
                  src="/images/workspace.jpg"
                  alt="Workspace"
                  className="w-full h-full object-cover"
                />
              </motion.div>

              <div className="absolute inset-0 bg-[#03346E] opacity-30 mix-blend-multiply group-hover:opacity-10 transition-opacity" />
              <motion.div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-[#021526] to-transparent">
                <p className="text-[#E2E2B6] text-lg">
                  Colloraborative workspace
                </p>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>

        {/* Skills Stats */}
        <motion.div>
          {Skills.map((skill, index) => (
            <Card></Card>
          ))}
        </motion.div>
        <FooterSection />
      </div>
    </section>
  );
};
