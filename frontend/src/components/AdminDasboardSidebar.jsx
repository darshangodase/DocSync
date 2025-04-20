import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Sidebar } from "flowbite-react";
import { HiArrowSmRight } from "react-icons/hi";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthProvider";
import { TbReportAnalytics } from "react-icons/tb";
import { FaCodePullRequest  } from "react-icons/fa6";
import { FaUserDoctor } from "react-icons/fa6";
import { FiMessageSquare } from "react-icons/fi";


function AdminDashboardSidebar() {
  const location = useLocation();
  const [tab, setTab] = useState();
  const { handleSignOut } = useAuth();

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);

  const handleSignOutClick = async () => {
    try {
      await handleSignOut();
      toast.success("Sign-out successfully.");
    } catch (error) {
      console.error("Sign-out failed:", error.message);
      toast.error("Failed to sign out.");
    }
  };

  return (
    <Sidebar className="bg-slate-400 text-white h-full w-full font-rubik">
      <Sidebar.Items>
        <Sidebar.ItemGroup className="grid gap-2">

          {/* My Profile Tab */}
          <Link to="/admin/dashboard?tab=overview">
            <Sidebar.Item 
            active={tab === "overview"} 
            icon={TbReportAnalytics} 
            as="div">
             Overview
            </Sidebar.Item>
          </Link>
  
          {/* MEssage */}
          <Link to="/admin/dashboard?tab=message">
            <Sidebar.Item 
            active={tab === "message"} 
            icon={FiMessageSquare} 
            as="div">
             Message
            </Sidebar.Item>
          </Link>
   
          {/* Pending Request Tab */}
          <Link to="/admin/dashboard?tab=pending-request">
            <Sidebar.Item 
            active={tab === "pending-request"} 
            icon={FaCodePullRequest} 
            as="div">
             Requests
            </Sidebar.Item>
          </Link>

          {/* Doctors Record Tab */}
          <Link to="/admin/dashboard?tab=doctor-records">
            <Sidebar.Item 
            active={tab === "doctor-records"} 
            icon={FaUserDoctor } 
            as="div">
             Doctor Records
            </Sidebar.Item>
          </Link>

          {/* Sign Out */}
          <Sidebar.Item
            icon={HiArrowSmRight}
            onClick={handleSignOutClick}
            className="cursor-pointer"
          >
            Sign Out
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
}

export default AdminDashboardSidebar;
