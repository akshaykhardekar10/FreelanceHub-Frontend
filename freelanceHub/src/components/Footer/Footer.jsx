import { VStack } from "@chakra-ui/react";
import {
  FaLinkedin,
  FaGithub,
  FaInstagram,
  FaTwitter,
  FaFacebookF,
  FaYoutube,
} from "react-icons/fa";

export default function Footer() {
  return (
    <VStack
      backgroundColor="transparent"
      color="gray.300"
      pt={10}
      w="full"
      px={10}
      position="relative"
      zIndex={1}
      overflow="hidden"
    >
      <div className="w-full mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Company */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-4 w-full">FreelanceHub</h2>
          <p className="text-sm w-full">
            Connecting top talent with growing businesses worldwide.
          </p>
        </div>

        {/* Founders */}
        <div>
          <h4 className="text-white font-semibold mb-4">Founders</h4>
          <ul className="space-y-3">
            <li className=" flex gap-5">
              <p className="font-medium text-gray-300 w-2/5">Ram Mutekar</p>
              <div className="flex gap-3 mt-1 text-lg">
                <a
                  href="https://www.linkedin.com/in/ram-mutekar-4b6a49256/"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ cursor: "pointer" }} // Make sure pointer shows
                >
                  <FaLinkedin />
                </a>
                <a
                  href="https://github.com/RamMutekar43"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ cursor: "pointer" }} // Make sure pointer shows
                >
                  <FaGithub />
                </a>
              </div>
            </li>
            <li className=" flex gap-5">
            <p className="font-medium text-gray-300 w-2/5">Akshay Khardekar</p>
              <div className="flex gap-3 mt-1 text-lg">
                <a
                  href="https://www.linkedin.com/in/akshay-khardekar-65a303257/"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ cursor: "pointer" }} // Make sure pointer shows
                >
                  <FaLinkedin />
                </a>
                <a
                  href="https://github.com/akshayKhardekar10"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ cursor: "pointer" }} // Make sure pointer shows
                >
                  <FaGithub />
                </a>
              </div>
            </li>

            <li className=" flex gap-5">
            <p className="font-medium text-gray-300 w-2/5">Bhoomi Narode</p>
              <div className="flex gap-3 mt-1 text-lg">
                <a
                  href="https://www.linkedin.com/in/bhoomi-narode-54814226b/"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ cursor: "pointer" }} // Make sure pointer shows
                >
                  <FaLinkedin />
                </a>
                <a
                  href="/"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ cursor: "pointer" }} // Make sure pointer shows
                >
                  <FaGithub />
                </a>
              </div>
            </li>

            <li className=" flex gap-5">
            <p className="font-medium text-gray-300 w-2/5">Sayali Kanawade</p>
              <div className="flex gap-3 mt-1 text-lg">
                <a
                  href="https://www.linkedin.com/in/sayali-kanawade-96598a269/"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ cursor: "pointer" }} // Make sure pointer shows
                >
                  <FaLinkedin />
                </a>
                <a
                  href="/"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ cursor: "pointer" }} // Make sure pointer shows
                >
                  <FaGithub />
                </a>
              </div>
            </li>
          </ul>
        </div>

        {/* Connect */}
        <div>
          <h4 className="text-white font-semibold mb-4">Connect</h4>
          <p className="text-sm">
            Email:{" "}
            <a
              href="mailto:support@freelancehub.com"
              className="hover:text-white"
              style={{ cursor: "pointer" }} // Make sure pointer shows
            >
              support@freelancehub.com
            </a>
          </p>
          <div className="flex gap-4 mt-4 text-xl">
            <a
              href="https://twitter.com"
              target="_blank"
              aria-label="Twitter"
              rel="noopener noreferrer"
              style={{ cursor: "pointer" }} // Make sure pointer shows
            >
              <FaTwitter />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              aria-label="Instagram"
              rel="noopener noreferrer"
              style={{ cursor: "pointer" }} // Make sure pointer shows
            >
              <FaInstagram />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              aria-label="Facebook"
              rel="noopener noreferrer"
              style={{ cursor: "pointer" }} // Make sure pointer shows
            >
              <FaFacebookF />
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              aria-label="YouTube"
              rel="noopener noreferrer"
              style={{ cursor: "pointer" }} // Make sure pointer shows
            >
              <FaYoutube />
            </a>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="border-t border-gray-700 mt-10 pt-6 text-sm text-center text-gray-500">
        &copy; {new Date().getFullYear()} FreelanceHub. All rights reserved.
      </div>

      {/* Removed Background Animation */}
    </VStack>
  );
}
