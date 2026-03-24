import { motion } from "motion/react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ProjectCard } from "../components/ProjectCard";
import { HolographicOverlay } from "../background-animation/HolographicOverlay";
import { WaveBackground } from "../background-animation/WaveBackground";
import { GridBackground } from "../background-animation/GridBackground";

export const ProjectsSection = () => {
  const projects = [
    {
      title: "MindMate App",
      description:
        "A mental health companion app designed to help users track their mood and find mental wellness resources.",
      image:
        "https://images.unsplash.com/photo-1765285262806-54bcc4a311ba?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZW50YWwlMjBoZWFsdGglMjBhcHAlMjBtb2NrdXB8ZW58MXx8fHwxNzczOTQwNzY4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      tags: ["UI/UX", "Figma", "User Research", "Prototyping"],
    },
    {
      title: "Library Guide Design",
      description:
        "Interactive library navigation and book discovery system for modern campus libraries.",
      image:
        "https://images.unsplash.com/photo-1760998509037-643e6667b608?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsaWJyYXJ5JTIwYm9va3MlMjBhcHAlMjBtb2NrdXB8ZW58MXx8fHwxNzczOTQwNzcxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      tags: ["React", "Tailwind CSS", "Figma"],
    },
    {
      title: "Freelance Dashboard",
      description:
        "Comprehensive dashboard for freelancers to manage projects, invoices, and client communication.",
      image:
        "https://images.unsplash.com/photo-1771922748624-b205cf5d002d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1aSUyMHV4JTIwZGVzaWduJTIwZGFzaGJvYXJkfGVufDF8fHx8MTc3MzkyNDU5MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      tags: ["TypeScript", "Motion", "Tailwind CSS"],
    },
  ];

  const projectSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <section className="py-0 md:py-20 px-4 md:px-6 bg-primary relative overflow-hidden">
      <GridBackground spacing={50} />
      <WaveBackground />
      <HolographicOverlay intensity={0.2} />

      <div className="container mx-auto max-w-7xl relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 md:mb-12"
        >
          <p className="text-secondary tracking-wider mb-2 text-xs md:text-sm font-semibold">
            PORTFOLIO
          </p>
          <h2
            className="text-3xl md:text-5xl lg:text-6xl text-white mb-4"
            style={{ fontWeight: 700 }}
          >
            My <span className="text-secondary">Projects</span>
          </h2>

          <div
            className="w-20 h-1 mx-auto mt-4 rounded-full"
            style={{
              background:
                "linear-gradient(to right, transparent, var(--color-secondary), transparent)",
            }}
          />
        </motion.div>

        {/* Projects Carousel */}
        <div className="projects-slider px-2">
          <Slider {...projectSettings}>
            {projects.map((project, index) => (
              <div key={index} className="px-2 md:px-3">
                <ProjectCard project={project} index={index} />
              </div>
            ))}
          </Slider>
        </div>
      </div>

      <style>{`
        .projects-slider .slick-dots {
          bottom: -50px;
        }

        .projects-slider .slick-dots li button:before {
          color: var(--color-secondary);
          font-size: 12px;
          opacity: 0.4;
        }

        .projects-slider .slick-dots li.slick-active button:before {
          color: var(--color-secondary);
          opacity: 1;
        }

        .projects-slider .slick-prev,
        .projects-slider .slick-next {
          z-index: 1;
        }

        .projects-slider .slick-prev:before,
        .projects-slider .slick-next:before {
          color: var(--color-secondary);
          font-size: 32px;
        }

        @media (max-width: 768px) {
          .projects-slider .slick-prev {
            left: -10px;
          }

          .projects-slider .slick-next {
            right: -10px;
          }

          .projects-slider .slick-prev:before,
          .projects-slider .slick-next:before {
            font-size: 24px;
          }
        }
      `}</style>
    </section>
  );
};
