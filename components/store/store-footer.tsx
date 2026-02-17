import Image from "next/image";
import Link from "next/link";

export default function StoreFooter() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <div>
              <h3 className="text-xl font-bold mb-4">Kids Journey Hub</h3>
              <p className="text-gray-400">
                Quality kids clothing and accessories for your little ones.
              </p>
            </div>
            {/* Our Socials */}
            <div className="col-span-10 md:col-span-2">
              <div className="grid grid-cols-4 gap-2 w-fit">
                <Link
                  href="https://facebook.com/kidsjourneyhubandmore" target="_blank"
                  className="w-fit"
                >
                  <Image
                    src="/assets/facebook.svg"
                    alt="Facebook"
                    width={24}
                    height={24}
                  />
                </Link>
                <Link
                  href="https://www.instagram.com/kidsjourneyhubandmore?igsh=MTRva2d5MTd5N2ZyYw==" target="_blank"
                  className="w-fit"
                >
                  <Image
                    src="/assets/Instagram.svg"
                    alt="Instagram"
                    width={24}
                    height={24}
                  />
                </Link>
                <Link href="https://www.tiktok.com/@kidsjourneyhubandmore" target="_blank" className="w-fit">
                  <Image
                    src="/assets/tiktok.svg"
                    alt="TikTok"
                    width={24}
                    height={24}
                  />
                </Link>
                <Link href="https://wa.me/0552483555" target="_blank" className="w-fit">
                  <Image
                    src="/assets/whatsapp.svg"
                    alt="WhatsApp"
                    width={24}
                    height={24}
                  />
                </Link>
              </div>
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link
                  href="/products"
                  className="hover:text-white transition-colors"
                >
                  Shop
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  About
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <p className="text-gray-400">
              Accra, Ghana
              <br />
              Email: info@kidsjourneys.com
            </p>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>
            &copy; {new Date().getFullYear()} Kids Journey Hub. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
