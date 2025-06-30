import Link from "next/link";
import { FaLaptopCode, FaChartLine, FaUsers } from "react-icons/fa";
import { MdOutlineComputer, MdGavel } from "react-icons/md";
import { BsArrowRight } from "react-icons/bs";

export default function Home() {
  return (
    <div>
      {/* Navigation */}
      <header className="fixed top-0 left-0 w-full bg-white shadow-md z-50 py-4 px-6 md:px-12 flex justify-between items-center">
        <div className="text-2xl font-bold text-gray-900">Vinay Amin</div>
        <nav>
          <ul className="flex space-x-6">
            <li>
              <a href="#about" className="text-gray-600 hover:text-blue-600 transition-colors duration-300">About</a>
            </li>
            <li>
              <a href="#experience" className="text-gray-600 hover:text-blue-600 transition-colors duration-300">Experience</a>
            </li>
            <li>
              <a href="#projects" className="text-gray-600 hover:text-blue-600 transition-colors duration-300">Projects</a>
            </li>
            <li>
              <a href="#blogs" className="text-gray-600 hover:text-blue-600 transition-colors duration-300">Blogs</a>
            </li>
            <li>
              <a href="#contact" className="text-gray-600 hover:text-blue-600 transition-colors duration-300">Contact</a>
            </li>
          </ul>
        </nav>
      </header>

      {/* Hero Section */}
      <section id="hero" className="relative h-screen flex items-center justify-center bg-gray-50 overflow-hidden">
        <div className="container mx-auto px-6 text-center z-10">
          <div className="w-48 h-48 rounded-full overflow-hidden mx-auto mb-8 bg-gray-200 flex items-center justify-center">
            <span className="text-gray-500 text-5xl">👤</span>
          </div>
          <h1 className="text-6xl font-bold text-gray-900 mb-6">Vinay Amin</h1>
          <p className="text-2xl text-blue-600 mb-8 font-medium">Product Manager & Developer</p>
          <div className="flex justify-center space-x-8 text-gray-700 text-lg mb-10">
            <a href="mailto:vinayamin1997@gmail.com" className="hover:text-blue-600 transition-colors duration-300">📧 vinayamin1997@gmail.com</a>
            <a href="tel:8217866171" className="hover:text-blue-600 transition-colors duration-300">📞 8217866171</a>
            <span>📍 Bengaluru, India</span>
            <a href="https://www.linkedin.com/in/vinayvp/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">LinkedIn</a>
          </div>
          <div className="mt-10">
            <a href="#contact" className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-300">
              Get in Touch <BsArrowRight className="ml-2" />
            </a>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="section-padding bg-white">
        <div className="container mx-auto px-6">
          <h2 className="heading-secondary text-center text-gray-900 mb-12">About Me</h2>
          <div className="text-gray-700 text-lg leading-relaxed mx-auto max-w-4xl">
            <p className="mb-4">
              I am a Product Manager with 4 years of experience and proven expertise in driving product vision, roadmapping, and data-driven decision-making. I specialize in synthesizing complex user requirements into strategic, actionable plans.
            </p>
            <p className="mb-4">
              My career has been marked by a strong ability to lead cross-functional teams through agile methodologies, prioritizing features and optimizing processes for maximum efficiency. I thrive in dynamic environments where I can leverage my technical understanding and strategic thinking to deliver high-quality outcomes.
            </p>
            <p>
              Beyond product management, I have experience in political consulting, advising on campaigns and policy, demonstrating my versatility and ability to drive impactful change across diverse sectors.
            </p>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="section-padding bg-gray-100">
        <div className="container mx-auto px-6">
          <h2 className="heading-secondary text-center text-gray-900 mb-12">Skills</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow duration-300">
              <FaLaptopCode className="text-4xl text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Development</h3>
              <p className="text-gray-700">Python, Django, FastAPI, SQL, MongoDB</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow duration-300">
              <FaChartLine className="text-4xl text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Product Management</h3>
              <p className="text-gray-700">Roadmapping, Analytics, Feature Prioritization</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow duration-300">
              <FaUsers className="text-4xl text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Leadership</h3>
              <p className="text-gray-700">Team Management, Agile Methodologies</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow duration-300">
              <MdOutlineComputer className="text-4xl text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Process Automation</h3>
              <p className="text-gray-700">SOP Implementation, Optimization</p>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Timeline Section */}
      <section id="experience" className="section-padding bg-white">
        <div className="container mx-auto px-6">
          <h2 className="heading-secondary text-center text-gray-900 mb-12">Experience</h2>
          <div className="relative border-l-2 border-blue-600 ml-4 md:ml-20">
            <div className="mb-8 flex items-center w-full">
              <div className="absolute w-4 h-4 bg-blue-600 rounded-full -left-2 border-white border-2"></div>
              <div className="ml-8 md:ml-12 p-6 bg-gray-50 rounded-lg shadow-md flex-1">
                <h3 className="text-xl font-semibold text-gray-900">Product Manager</h3>
                <p className="text-blue-600 text-md mb-2">Varahe Analytics Pvt. Ltd. | 2023 - Present</p>
                <ul className="list-disc list-inside text-gray-700 text-base space-y-1">
                  <li>Drove product vision and strategy for analytics products</li>
                  <li>Led cross-functional teams through agile development lifecycle</li>
                  <li>Achieved 15% increase in user engagement and 10% revenue growth</li>
                </ul>
              </div>
            </div>
            <div className="mb-8 flex items-center w-full">
              <div className="absolute w-4 h-4 bg-blue-600 rounded-full -left-2 border-white border-2"></div>
              <div className="ml-8 md:ml-12 p-6 bg-gray-50 rounded-lg shadow-md flex-1">
                <h3 className="text-xl font-semibold text-gray-900">Backend Team Lead</h3>
                <p className="text-blue-600 text-md mb-2">DeepByte Technology | 2022 - 2023</p>
                <ul className="list-disc list-inside text-gray-700 text-base space-y-1">
                  <li>Led backend development team using Python, Django, and FastAPI</li>
                  <li>Implemented scalable database architecture and RESTful APIs</li>
                  <li>Mentored junior developers and enforced best practices</li>
                </ul>
              </div>
            </div>
            <div className="mb-8 flex items-center w-full">
              <div className="absolute w-4 h-4 bg-blue-600 rounded-full -left-2 border-white border-2"></div>
              <div className="ml-8 md:ml-12 p-6 bg-gray-50 rounded-lg shadow-md flex-1">
                <h3 className="text-xl font-semibold text-gray-900">Associate Software Engineer</h3>
                <p className="text-blue-600 text-md mb-2">Kaleyra | 2021 - Present</p>
                <ul className="list-disc list-inside text-gray-700 text-base space-y-1">
                  <li>Developed critical components for communication platform</li>
                  <li>Improved system efficiency and reliability</li>
                  <li>Contributed to agile development processes</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="section-padding bg-white">
        <div className="container mx-auto px-6">
          <h2 className="heading-secondary text-center text-gray-900 mb-12">Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            <div className="bg-gray-50 p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              <h3 className="heading-tertiary text-gray-900 mb-3">My Vote Labs</h3>
              <p className="text-blue-600 text-md mb-2">Django, MySQL, Django Template</p>
              <p className="text-gray-700">
                Developed a robust web application for managing political campaigns and voter data. Features include candidate profiling, constituency management, voter outreach tools, and real-time analytics. Utilized Django for the backend, MySQL for database management, and Django templates for the frontend, ensuring a scalable and maintainable solution.
              </p>
            </div>
            <div className="bg-gray-50 p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              <h3 className="heading-tertiary text-gray-900 mb-3">Viyaat Management Consulting Services</h3>
              <p className="text-blue-600 text-md mb-2">Digital transformation</p>
              <p className="text-gray-700">
                Led the digital transformation initiative for a management consulting firm, optimizing their internal processes and client engagement strategies. Implemented cloud-based solutions for document management, project collaboration, and CRM, resulting in a 30% increase in operational efficiency. Provided strategic recommendations for technology adoption and ensured smooth transition for employees.
              </p>
            </div>
            <div className="bg-gray-50 p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              <h3 className="heading-tertiary text-gray-900 mb-3">Aatri Experiential Travel</h3>
              <p className="text-blue-600 text-md mb-2">Process optimization</p>
              <p className="text-gray-700">
                Streamlined and optimized operational processes for an experiential travel company, enhancing customer experience and reducing administrative overhead. Implemented automated booking systems, itinerary management tools, and feedback collection mechanisms. Conducted an in-depth analysis of existing workflows and identified key areas for improvement, leading to a more efficient and enjoyable travel planning experience for clients.
              </p>
            </div>
            <div className="bg-gray-50 p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              <h3 className="heading-tertiary text-gray-900 mb-3">SphereTree Analytics</h3>
              <p className="text-blue-600 text-md mb-2">Structured reporting methodologies</p>
              <p className="text-gray-700">
                Developed and implemented structured reporting methodologies for SphereTree Analytics, improving data visualization and insight generation. Designed and built interactive dashboards for key performance indicators (KPIs), enabling stakeholders to make data-driven decisions. Focused on creating clear, concise, and actionable reports from complex datasets, enhancing the firm&apos;s analytical capabilities.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Blogs Section */}
      <section id="blogs" className="section-padding bg-gray-100">
        <div className="container mx-auto px-6">
          <h2 className="heading-secondary text-center text-gray-900 mb-12">Blogs</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Product Management Best Practices</h3>
              <p className="text-blue-600 text-sm mb-2">December 15, 2024</p>
              <p className="text-gray-700 mb-4">Exploring effective strategies for product roadmapping and feature prioritization in modern software development.</p>
              <Link href="/blogs/product-management-best-practices" className="text-blue-600 hover:underline">Read More →</Link>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Leading Cross-Functional Teams</h3>
              <p className="text-blue-600 text-sm mb-2">November 28, 2024</p>
              <p className="text-gray-700 mb-4">Insights on managing diverse teams and fostering collaboration in agile environments.</p>
              <Link href="/blogs/leading-cross-functional-teams" className="text-blue-600 hover:underline">Read More →</Link>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Data-Driven Decision Making</h3>
              <p className="text-blue-600 text-sm mb-2">October 10, 2024</p>
              <p className="text-gray-700 mb-4">How to leverage analytics and user feedback to make informed product decisions.</p>
              <Link href="/blogs/data-driven-decision-making" className="text-blue-600 hover:underline">Read More →</Link>
            </div>
          </div>
          <div className="text-center mt-10">
            <Link href="/blogs" className="inline-flex items-center px-6 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-300">
              View All Blogs <BsArrowRight className="ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className="section-padding bg-white">
        <div className="container mx-auto px-6">
          <h2 className="heading-secondary text-center text-gray-900 mb-12">Education</h2>
          <div className="relative border-l-2 border-blue-600 ml-4 md:ml-20">
            {/* Education Entry 1 */}
            <div className="mb-8 flex items-center w-full">
              <div className="absolute w-4 h-4 bg-blue-600 rounded-full -left-2 border-white border-2"></div>
              <div className="ml-8 md:ml-12 p-6 bg-gray-50 rounded-lg shadow-md flex-1">
                <h3 className="text-xl font-semibold text-gray-900">Mechanical Engineering (B.E)</h3>
                <p className="text-blue-600 text-md mb-2">K S Institute of Technology | 2016 - 2020</p>
              </div>
            </div>
            {/* Education Entry 2 */}
            <div className="mb-8 flex items-center w-full">
              <div className="absolute w-4 h-4 bg-blue-600 rounded-full -left-2 border-white border-2"></div>
              <div className="ml-8 md:ml-12 p-6 bg-gray-50 rounded-lg shadow-md flex-1">
                <h3 className="text-xl font-semibold text-gray-900">Pre-University</h3>
                <p className="text-blue-600 text-md mb-2">Sri AdiChunchanagiri PU College | 2014 - 2016</p>
              </div>
            </div>
            {/* Education Entry 3 */}
            <div className="mb-8 flex items-center w-full">
              <div className="absolute w-4 h-4 bg-blue-600 rounded-full -left-2 border-white border-2"></div>
              <div className="ml-8 md:ml-12 p-6 bg-gray-50 rounded-lg shadow-md flex-1">
                <h3 className="text-xl font-semibold text-gray-900">Secondary School</h3>
                <p className="text-blue-600 text-md mb-2">S.K.N High School | 2014</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section id="contact" className="section-padding bg-white">
        <div className="container mx-auto px-6">
          <h2 className="heading-secondary text-center text-gray-900 mb-12">Get in Touch</h2>
          <form className="max-w-xl mx-auto bg-gray-50 p-8 rounded-lg shadow-md">
            <div className="mb-6">
              <label htmlFor="fullName" className="block text-gray-800 text-lg font-medium mb-2">Full Name</label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Vinay V P"
              />
            </div>
            <div className="mb-6">
              <label htmlFor="email" className="block text-gray-800 text-lg font-medium mb-2">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="vinayamin1997@gmail.com"
              />
            </div>
            <div className="mb-6">
              <label htmlFor="phone" className="block text-gray-800 text-lg font-medium mb-2">Phone Number</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="8217866171"
              />
            </div>
            <div className="mb-6">
              <label htmlFor="organization" className="block text-gray-800 text-lg font-medium mb-2">Company/Organization</label>
              <input
                type="text"
                id="organization"
                name="organization"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Your Company"
              />
            </div>
            <div className="mb-6">
              <label htmlFor="subject" className="block text-gray-800 text-lg font-medium mb-2">Subject</label>
              <input
                type="text"
                id="subject"
                name="subject"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Inquiry about..."
              />
            </div>
            <div className="mb-6">
              <label htmlFor="message" className="block text-gray-800 text-lg font-medium mb-2">Message</label>
              <textarea
                id="message"
                name="message"
                rows={5}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Your message here..."
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold text-lg hover:bg-blue-700 transition-colors duration-300"
            >
              Send Message
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 text-center">
        <p>&copy; {new Date().getFullYear()} Vinay V P. All rights reserved.</p>
        <div className="flex justify-center space-x-6 mt-4">
          <a href="https://www.linkedin.com/in/vinayvp/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors duration-300">LinkedIn</a>
          {/* Add other social links if available */}
        </div>
      </footer>
    </div>
  );
}