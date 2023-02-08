import Link from "next/link";
import { Logo } from "./Logo";

function HeaderLogo() {
  return (
    <>
      <Link href="/" title="Home" className="hover:opacity-85">
        <Logo />
      </Link>
    </>
  );
}

export default HeaderLogo;
