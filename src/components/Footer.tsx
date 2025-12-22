export default function Footer() {
  return (
    <>
    <footer className="bg-[#262F31] text-white pt-20 relative px-6 sm:px-10">
      {/* Top Section */}
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 ">
        {/* Column 1 — Description (Bottom Aligned) */}
        <div className="flex items-end">
          <p className="text-[#C7C7C7] text-base sm:text-lg leading-relaxed mb-6 font-poppins font-light tracking-wider max-w-md">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam quis
            consectetur tellus. Cras dapibus congue egestas. Morbi vel faucibus
            lorem. Nunc iaculis aliquet eros, et eleifend erat laoreet
            consectetur.
          </p>
        </div>

        {/* Column 2 — Quick Links (Centered Column but text-left) */}
        <div className="flex flex-col items-start lg:items-center">
          <div className="w-fit">
            <h3 className="text-white text-3xl font-marker mb-4">Quick links</h3>
            <ul className="space-y-3 text-[#C7C7C7] text-left">
              <li>
                <a href="/menu" className="hover:text-white transition">
                  Menu
                </a>
              </li>
              <li>
                <a href="/our-story" className="hover:text-white transition">
                   Our Story
                </a>
              </li>
              <li>
                <a href="/gallery" className="hover:text-white transition">
                 Gallery
                </a>
              </li>
              <li>
                <a href="/franchise" className="hover:text-white transition">
                  Franchise
                </a>
              </li>
              <li>
                <a href="/contact-us" className="hover:text-white transition">
                  Contact us
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Column 3 — Reach Out + Social (Centered Column but text-left) */}
        <div className="flex flex-col items-start lg:items-center">
          <div className="w-fit">
            <h3 className="text-white text-3xl font-marker mb-4">
              Reach out at us
            </h3>
            <p className="text-[#C7C7C7] mb-1">+81 3-1234-5678</p>
            <p className="text-[#C7C7C7] mb-6">email@gmail.com</p>

            <h4 className="text-white text-2xl font-marker mb-3">
              Follow us on
            </h4>
            <ul className="space-y-2 text-[#C7C7C7] text-left">
              <li>
                <a href="#" className="hover:text-white transition">
                  Facebook
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Instagram
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Column 4 — Map */}
        <div className="w-full h-56 bg-gray-500">
          <iframe
            src="https://maps.google.com/maps?q=tokyo&t=&z=13&ie=UTF8&iwloc=&output=embed"
            className="w-full h-full grayscale"
            loading="lazy"
          />
        </div>
      </div>

      {/* Bottom Text */}
      <div className="text-center text-white font-marker text-4xl mt-16 mb-6">
        <h3>Made with love and sushies</h3>
      </div>

      {/* Bottom Thick Green Border */}
    </footer>
    <div className="w-full h-4 bg-[#9FB43B] -mt-6"></div>
    </>
  );
}
