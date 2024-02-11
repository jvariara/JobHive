import Image from "next/image";
import Link from "next/link";
import MaxWidthWrapper from "./MaxWidthWrapper";
import MobileNav from "./MobileNav";
import NavItem from "./NavItem";

const Navbar = async () => {

  return (
    <div className="bg-secondary sticky z-50 top-0 inset-x-0 h-16 shadow-lg">
      <header className="relative bg-secondary">
        <MaxWidthWrapper>
          <div>
            <div className="flex h-16 items-center">
              <MobileNav />

              <div className="ml-4 flex lg:ml-0 items-center">
                <Link href="/">
                  <Image
                    src="/Logo.png"
                    alt="JobHive logo"
                    height={70}
                    width={70}
                    className="object-cover aspect-square"
                  />
                </Link>
                <h1 className="text-2xl md:text-3xl font-bold ml-2 text-white">
                  Job<span className="text-primary">Hive</span>
                </h1>
              </div>

              {/* Right side of navbar */}
              <div className="ml-auto flex items-center">
                <NavItem />
              </div>
            </div>
          </div>
        </MaxWidthWrapper>
      </header>
    </div>
  );
};

export default Navbar;
