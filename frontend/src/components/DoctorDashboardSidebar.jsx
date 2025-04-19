import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Sidebar } from "flowbite-react";
import { HiUser, HiArrowSmRight, HiPlus } from "react-icons/hi";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthProvider";
import { FaFilePrescription, FaFileMedical, FaFileSignature, FaCertificate } from "react-icons/fa";
import { GiMedicines } from "react-icons/gi";
import { MdDashboard } from "react-icons/md";
import { FaHistory } from "react-icons/fa";


function DoctorDashboardSidebar() {
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
    <Sidebar className="bg-slate-300 text-white h-full w-full">
      <Sidebar.Items>
        <Sidebar.ItemGroup className="grid gap-2">
          {/* Dashboard */}
          <Link to="/doctor/dashboard?tab=AdminMessage">
            <Sidebar.Item
              as="div"
              active={tab === "AdminMessage"}
              icon={MdDashboard}
            >
              Dashboard
            </Sidebar.Item>
          </Link>

          {/* Prescriptions Tab */}
          <Link to="/doctor/dashboard?tab=prescriptions">
            <Sidebar.Item
              active={tab === "prescriptions"}
              icon={FaFilePrescription}
              as="div"
            >
              Prescriptions
            </Sidebar.Item>
          </Link>

          {/* Medical Certificate */}
          <Link to="/doctor/dashboard?tab=medicalform">
            <Sidebar.Item
              active={tab === "medicalform"}
              icon={FaFileMedical}
              as="div"
            >
              Medical Certificate
            </Sidebar.Item>
          </Link>

          {/* Fitness Certificate */}
          <Link to="/doctor/dashboard?tab=fitnessform">
            <Sidebar.Item
              active={tab === "fitnessform"}
              icon={FaFileSignature}
              as="div"
            >
              Fitness Certificate
            </Sidebar.Item>
          </Link>

          {/* All Certificates */}
          <Link to="/doctor/dashboard?tab=certificates">
            <Sidebar.Item
              active={tab === "certificates"}
              icon={FaHistory}
              as="div"
            >
              View Certificates
            </Sidebar.Item>
          </Link>

          {/* DrugBee */}
          <Link to="/doctor/dashboard?tab=drugbee">
            <Sidebar.Item
              active={tab === "drugbee"}
              icon={GiMedicines}
              as="div"
            >
              DrugBee
            </Sidebar.Item>
          </Link>

          {/* My Profile Tab */}
          <Link to="/doctor/dashboard?tab=profile">
            <Sidebar.Item active={tab === "profile"} icon={HiUser} as="div">
              My Profile
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

export default DoctorDashboardSidebar;
