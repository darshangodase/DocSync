import React from "react";
import { Footer as FlowbiteFooter } from "flowbite-react";
import { Link } from "react-router-dom";
import { BsLinkedin, BsInstagram, BsGithub, BsFacebook } from "react-icons/bs";
import { MdEmail } from "react-icons/md";

function CustomFooter() {
  return (
    <div>
      <FlowbiteFooter container className="border border-t-8 border-blue-400">
        <div className="">
          <div className="">
            <Link
              to="/"
              className="self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white"
            >
              <span className="bg-gradient-to-r from-blue-500 to-green-400 px-2 py-1 rounded-md text-white ">
              DocSync
              </span>
            </Link>
          </div>
          <FlowbiteFooter.Divider />
          <div className="flex flex-wrap gap-6 sm:mt-0 mt-4 sm:justify-center">
            <FlowbiteFooter.Copyright
              href="#"
              by="DocSync.All rights reserved"
              year={new Date().getFullYear()}
              className="font-semibold text-md font-rubik"
            >
              <span className="ml-2">All rights reserved</span>
            </FlowbiteFooter.Copyright>
            <FlowbiteFooter.Icon
              href="https://www.linkedin.com/in/gowdu-suresh/"
              icon={BsLinkedin}
            />
            <FlowbiteFooter.Icon
              href="https://www.facebook.com/profile.php?id=61556169062703&ref=xav_ig_profile_page"
              icon={BsFacebook}
            />
            <FlowbiteFooter.Icon
              href="mailto:doconrx@gmail.com"
              icon={MdEmail}
            />
            <FlowbiteFooter.Icon
              href="https://www.instagram.com/doconrx"
              icon={BsInstagram}
            />
          </div>
        </div>
      </FlowbiteFooter>
    </div>
  );
}

export default CustomFooter;
