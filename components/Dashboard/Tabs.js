"use client";
import { useState } from "react";
import { useSelector } from "react-redux";

const tabs = ["Skills & Experience", "Education", "About Me"];

const skills = [
  "Python",
  "SIEM",
  "AWS",
  "Security Auditing",
  "Penetration Testing",
];
const certifications = ["CompTIA+", "Certified Ethical Hacker (CEH)"];
const experiences = [
  {
    period: "June 2023 - Dec 2023",
    title: "IT Security Intern",
    company: "CyberCorp Inc.",
    description:
      "Assisted in monitoring security alert, conducting vulnerability assessments and preparing reports on security incidents.",
  },
  {
    period: "June 2023 - Dec 2023",
    title: "IT Security Intern",
    company: "CyberCorp Inc.",
    description:
      "Assisted in monitoring security alert, conducting vulnerability assessments and preparing reports on security incidents.",
  },
];

const education = [
  {
    period: "June 2020 - May 2024",
    Level: "College",
    Institute: "Army Institute of Technology",
    description:
      "Pursued a Bachelor of Technology in Computer Science & Engineering, gaining strong technical knowledge through coursework, projects, and practical training. Participated in workshops and internships to build industry exposure, problem-solving ability, and teamwork skills. Engaged in academic and technical activities that enhanced analytical and professional growth.",
  },
  {
    period: "June 2018 - Feb 2020",
    Level: "School",
    Institute: "Army Public School",
    description:
      "Completed higher secondary education with a strong foundation in science and mathematics, while actively participating in extracurricular activities including sports and cultural events. Developed discipline, teamwork, and leadership skills in a structured learning environment.",
  },
];

export default function ProfileTabs() {
  const { user } = useSelector((state) => state.auth);
  const [activeTab, setActiveTab] = useState("Skills & Experience");

  return (
    <div className="bg-gradient-to-b from-g-500 to-g-600 p-0.5 rounded-[10px] overflow-hidden">
      <div className="bg-g-600 rounded-lg p-5">
        {/* Tabs */}
        <div className="flex space-x-6 mb-5 overflow-x-auto scrollbar pb-1.5">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`text-base leading-6 font-semibold text-g-100 whitespace-nowrap ${
                activeTab === tab ? "border-b-2 border-primary" : ""
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Skills & Experience */}
        {activeTab === "Skills & Experience" && (
          <div className="space-y-6">
            {/* Skills */}
            <div>
              <h3 className="text-base leading-6 font-semibold text-g-100 mb-2.5">
                Skills
              </h3>
              <div className="flex flex-wrap gap-2">
                {(user.skills?.length ? user.skills : skills).map(
                  (skill, i) => (
                    <span
                      key={i}
                      className="px-2 py-1 text-g-200 leading-4 text-xs rounded-full bg-g-600 border border-g-500"
                    >
                      {skill}
                    </span>
                  )
                )}
              </div>
            </div>

            {/* Certifications */}
            <div className=" mt-7.5">
              <h3 className="text-base leading-6 font-semibold text-g-100 mb-2.5">
                Certifications
              </h3>
              <div className="flex flex-wrap gap-2">
                {(user?.certificates?.length
                  ? user.certificates
                  : certifications
                ).map((cert, i) => (
                  <span
                    key={i}
                    className="px-2 py-1 text-g-200 leading-4 text-xs rounded-full bg-g-600 border border-g-500"
                  >
                    {cert}
                  </span>
                ))}
              </div>
            </div>

            {/* Experience */}
            <div>
              <h3 className="text-base leading-6 font-semibold text-g-100 mb-2.5">
                Experience
              </h3>

              <div className="relative">
                {/* Vertical Line */}
                <div className="absolute left-[6px] top-0 h-full border border-dashed border-g-400"></div>

                <div className="space-y-7.5">
                  {experiences.map((exp, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-1 py-3  relative"
                    >
                      {/* Timeline Dot */}
                      <div className="relative z-10 bg-g-400 p-0.5 rounded-full">
                        <span className="w-2.5 h-2.5 bg-blue-500 rounded-full block"></span>
                      </div>

                      {/* Content */}
                      <div className="pl-3 space-y-[3px]">
                        <p className="text-sm font-normal text-g-200 leading-4">
                          {exp.period}
                        </p>
                        <h4 className="text-primary font-semibold text-base leading-6">
                          {exp.title}
                        </h4>
                        <p className="text-g-100 text-sm font-medium leading-4">
                          {exp.company}
                        </p>
                        <p className="text-g-300 text-sm leading-4 font-normal">
                          {exp.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Button */}
            <button className="mt-4 px-2 py-1 text-xs leading-4 cursor-pointer font-medium rounded-full bg-g-500 text-g-200">
              explore experience
            </button>
          </div>
        )}

        {/* Education */}
        {activeTab === "Education" && (
          <div>
            <h3 className="text-base leading-6 font-semibold text-g-100 mb-2.5">
              Education
            </h3>

            <div className="relative">
              {/* Vertical Line */}
              <div className="absolute left-[6px] top-0 h-full border border-dashed border-g-400"></div>

              <div className="space-y-7.5">
                {education.map((exp, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-1 py-3  relative"
                  >
                    {/* Timeline Dot */}
                    <div className="relative z-10 bg-g-400 p-0.5 rounded-full">
                      <span className="w-2.5 h-2.5 bg-blue-500 rounded-full block"></span>
                    </div>

                    {/* Content */}
                    <div className="pl-3 space-y-[3px]">
                      <p className="text-sm font-normal text-g-200 leading-4">
                        {exp.period}
                      </p>
                      <h4 className="text-primary font-semibold text-base leading-6">
                        {exp.Level}
                      </h4>
                      <p className="text-g-100 text-sm font-medium leading-4">
                        {exp.Institute}
                      </p>
                      <p className="text-g-300 text-sm leading-4 font-normal">
                        {exp.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* About Me */}
        {activeTab === "About Me" && (
          <p className="text-g-300 text-sm leading-4 font-normal">
            I am a passionate and detail-oriented Cybersecurity enthusiast with
            a strong foundation in network security, vulnerability assessment,
            and risk management. With hands-on experience in identifying system
            vulnerabilities, monitoring security alerts, and conducting incident
            analysis, I strive to safeguard digital assets from evolving cyber
            threats. My academic background combined with practical exposure to
            tools, frameworks, and industry best practices has equipped me with
            strong problem-solving skills, analytical thinking, and a proactive
            approach to security challenges. I am eager to contribute to
            creating secure, resilient, and reliable systems while continuously
            expanding my knowledge in areas such as ethical hacking, penetration
            testing, and cloud security.
          </p>
        )}
      </div>
    </div>
  );
}
