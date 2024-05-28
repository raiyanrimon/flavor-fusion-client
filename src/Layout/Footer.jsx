import logo from "../assets/logo.webp";
const Footer = () => {
  return (
    <footer className="footer p-10 bg-gradient-to-b from-gray-700 to-purple-700  text-white">
      <div className="container mx-auto flex flex-col lg:flex-row justify-between items-center">
        {/* Logo and Tagline */}
        <div className="flex items-center mb-6 lg:mb-0">
          <img
            src={logo}
            alt="Logo"
            className="h-12 lg:h-16 w-auto  mr-1 bg-white rounded-xl"
          />
          <p className="font-bold text-base lg:text-xl">FlavorFusion</p>
        </div>

        {/* Social Links */}
        <nav className="mb-6 lg:mb-0">
          <header className="text-lg font-semibold mb-3">
            Connect with Us
          </header>
          <div className="flex items-center space-x-4">
            <a
              href="https://linkedin.com/in/raiyanrimon"
              className="text-blue-500 hover:text-blue-400 transition flex items-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
                className="mr-2"
              >
                <path
                  fill="currentColor"
                  d="M20.75 0h-17.5c-1.517 0-2.75 1.233-2.75 2.75v17.5c0 1.517 1.233 2.75 2.75 2.75h17.5c1.517 0 2.75-1.233 2.75-2.75v-17.5c0-1.517-1.233-2.75-2.75-2.75zM7.75 20.062h-3.125v-10.812h3.125v10.812zM5.688 8.656h0c-1.047 0-1.906-0.875-1.906-1.969 0-1.094 0.859-1.969 1.906-1.969s1.906 0.875 1.906 1.969c0 1.094-0.859 1.969-1.906 1.969zM20.75 20.062h-3.125v-5.281c0-0.781-0.016-1.781-1.094-1.781-1.094 0-1.266 0.828-1.266 1.688v5.375h-3.125v-10.812h3.063v1.469h0.047c0.422-0.797 1.453-1.641 3.016-1.641 2.094 0 3.906 1.375 3.906 4.312v6.672z"
                />
              </svg>
            </a>

            <a
              href="https://github.com/raiyanrimon"
              className="text-gray-400 hover:text-gray-300 transition"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
              >
                <path
                  fill="currentColor"
                  d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.39.6.11.82-.26.82-.58 0-.29-.01-1.05-.015-2.06-3.338.73-4.045-1.61-4.045-1.61-.546-1.38-1.333-1.75-1.333-1.75-1.09-.74.082-.72.082-.72 1.204.08 1.838 1.24 1.838 1.24 1.07 1.84 2.8 1.3 3.48.99.1-.77.42-1.3.76-1.6-2.665-.3-5.465-1.34-5.465-5.98 0-1.32.47-2.4 1.24-3.25-.125-.3-.54-1.52.12-3.16 0 0 1.015-.32 3.32 1.23.96-.27 1.98-.4 3-.4 1.02 0 2.04.14 3 .4 2.3-1.55 3.32-1.23 3.32-1.23.66 1.64.24 2.86.12 3.16.77.85 1.24 1.93 1.24 3.25 0 4.65-2.8 5.68-5.475 5.98.43.38.82 1.13.82 2.29 0 1.65-.015 2.97-.015 3.37 0 .32.22.69.825.575C20.565 21.795 24 17.295 24 12 24 5.37 18.63 0 12 0z"
                />
              </svg>
            </a>

            <a
              href="https://facebook.com/mgrrimon"
              className="text-blue-500 hover:text-blue-400 transition"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
              >
                <path
                  fill="currentColor"
                  d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"
                />
              </svg>
            </a>
            <a
              href="https://twitter.com/raiyanrimon"
              className="text-blue-400 hover:text-blue-300 transition"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
              >
                <path
                  fill="currentColor"
                  d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"
                />
              </svg>
            </a>
          </div>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
