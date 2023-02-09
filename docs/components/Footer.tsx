import Link from 'next/link';
import { ReactElement } from 'react';
import { Discord, Github } from './Social';
import cn from 'classnames';
import HeaderLogo from './HeaderLogo';

export function Footer({ menu }: { menu?: boolean }): ReactElement {
  console.log(menu);
  return (
    <footer className="bg-[#FAFAFA] pb-[env(safe-area-inset-bottom)]  relative dark:bg-[#111111]">
      <div className="absolute top-0 h-12 w-full -translate-y-full bg-gradient-to-t from-[#FAFAFA] to-transparent dark:from-black pointer-events-none" />

      <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-800 lg:my-8" />

      <div
        className={cn(
          'mx-auto max-w-[90rem] py-6 flex justify-center md:justify-center text-black dark:text-white',
          'pl-[max(env(safe-area-inset-left),1.5rem)] pr-[max(env(safe-area-inset-right),1.5rem)]'
        )}
      >
        <div className="w-full md:flex md:justify-between">
          <HeaderLogo />
          <ul className="flex flex-wrap items-center mb-6 text-sm text-gray-500 sm:mb-0 dark:text-gray-400">
            <li>
              <Link href="#" className="mr-4 hover:underline md:mr-6 ">
                Home
              </Link>
            </li>
            <li>
              <Link href="#" className="mr-4 hover:underline md:mr-6 ">
                About
              </Link>
            </li>
            <li>
              <Link
                href="/quick-start"
                className="mr-4 hover:underline md:mr-6"
              >
                Docs
              </Link>
            </li>
            <li>
              <a
                href="mailto:juciano@outlook.com.br?Subject=Createform"
                className="hover:underline"
              >
                Contact
              </a>
            </li>
            <li className="px-4">
              <Github />
            </li>
            <li>
              <Discord />
            </li>
          </ul>
        </div>
      </div>
      <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400 pb-5">
        ©{' '}
        <a href="https://useform.org" className="hover:underline">
          Createform
        </a>
        . All Rights Reserved.
      </span>
    </footer>
  );
}
