const DevInfo = () => {
  return (
    <section className="bg-gradient-to-b from-gray-700 to-purple-700 py-8 border border-1 text-white ">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">Meet Golam Raiyan</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Education */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-2">Education</h3>
              <p className="text-lg text-gray-300">
                BSc in Political Science <br />
                Noakhali Science and Technology University <br />
                2020-2024
              </p>
            </div>
            {/* Contact */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-2">Contact</h3>
              <p className="text-lg text-gray-300">
                Email: mgrrimon@gmail.com <br />
                Phone: +8801681462580
              </p>
            </div>
            {/* Front End */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-2">Front End</h3>
              <p className="text-lg text-gray-300">
                JavaScript, TypeScript, React, Next.js, HTML, CSS, Redux
              </p>
            </div>
            {/* Back End */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-2">Back End</h3>
              <p className="text-lg text-gray-300">
                Express.js, Node.js, MongoDB, Mongoose
              </p>
            </div>
            {/* Tools */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-2">Tools</h3>
              <p className="text-lg text-gray-300">
                Git, Github, VS Code, Firebase
              </p>
            </div>
            {/* Experience */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-2">Experience</h3>
              <p className="text-lg text-gray-300">
                SwedWeb Limited - MERN Developer (Contractual) (Feb 2024- May
                2024)
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DevInfo;
