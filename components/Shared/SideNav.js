import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import UsersIcon from "../Icons/UsersIcon";
import SettingIcon from "../Icons/SettingIcon";
import ClockIcon from "../Icons/ClockIcon";
import { ac } from "../../lib/helpers";
import DocsIcon from "../Icons/DocsIcon";
import CourseIcon from "../Icons/CourseIcon";
import DepartmentIcon from "../Icons/DepartmentIcon";
import AwardIcon from "../Icons/AwardIcon";
import CodeIcon from "../Icons/CodeIcon";
import ReportIcon from "../Icons/DocumentIcon";

function SideNav(props) {
  const { userAvailable, accesstoken, admins } = props;
  const openMenu = (e) => {
    e.preventDefault();
    document.body.classList.remove("expand-menu");
  };
  const router = useRouter();
  const routeSetActive = (routePath) => {
    return router.pathname == routePath ? "active" : "";
  };
  return (
    <div className="sidenav">
      <ul className="sideNav-menu">
        <li className="menu-title" data-key="t-menu">
          Menu
        </li>
        <li>
          <Link href="/" onClick={openMenu}>
            <a className={routeSetActive("/")}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="feather feather-grid"
              >
                <rect x="3" y="3" width="7" height="7"></rect>
                <rect x="14" y="3" width="7" height="7"></rect>
                <rect x="14" y="14" width="7" height="7"></rect>
                <rect x="3" y="14" width="7" height="7"></rect>
              </svg>
              <span>DASHBOARD</span>
              <ul className="collapsed-side-nav f-14">
                <li>Dashboard</li>
              </ul>
            </a>
          </Link>
        </li>
        {ac(
          userAvailable.roles,
          "View employees",
          userAvailable.email,
          admins
        ) && (
          <li>
            <Link href="/resource-pool/employees" onClick={openMenu}>
              <a className={routeSetActive("/resource-pool/employees")}>
                <UsersIcon />
                <span>EMPLOYEES</span>
                <ul className="collapsed-side-nav f-14">
                  <li>Employees</li>
                </ul>
              </a>
            </Link>
          </li>
        )}
        {userAvailable.user_level == "Employee" && (
          <li>
            <Link href="/my-profile" onClick={openMenu}>
              <a className={routeSetActive("/my-profile")}>
                <UsersIcon />
                <span>MY PROFILE</span>
                <ul className="collapsed-side-nav f-14">
                  <li>MY PROFILE</li>
                </ul>
              </a>
            </Link>
          </li>
        )}
      </ul>
      <ul className="sideNav-menu exMenu-top  mb-2">
        {(ac(
          userAvailable.roles,
          "Site Settings",
          userAvailable.email,
          admins
        ) ||
          ac(
            userAvailable.roles,
            "Employee Configuration Settings",
            userAvailable.email,
            admins
          ) ||
          ac(
            userAvailable.roles,
            "View HR assessment forms",
            userAvailable.email,
            admins
          ) ||
          ac(
            userAvailable.roles,
            "View L1 assessment forms",
            userAvailable.email,
            admins
          ) ||
          ac(
            userAvailable.roles,
            "View REX approval forms",
            userAvailable.email,
            admins
          ) ||
          ac(userAvailable.roles, "View users", userAvailable.email, admins) ||
          ac(userAvailable.roles, "View roles", userAvailable.email, admins) ||
          ac(
            userAvailable.roles,
            "View courses",
            userAvailable.email,
            admins
          ) ||
          ac(
            userAvailable.roles,
            "View training sessions",
            userAvailable.email,
            admins
          ) ||
          ac(
            userAvailable.roles,
            "View departments",
            userAvailable.email,
            admins
          ) ||
          ac(
            userAvailable.roles,
            "View designations",
            userAvailable.email,
            admins
          )) && (
          <li className="menu-title" data-key="t-menu">
            Settings
          </li>
        )}
        {(ac(
          userAvailable.roles,
          "Site Settings",
          userAvailable.email,
          admins
        ) ||
          ac(
            userAvailable.roles,
            "Employee Configuration Settings",
            userAvailable.email,
            admins
          )) && (
          <li>
            <Link href="/settings/site-settings" onClick={openMenu}>
              <a className={routeSetActive("/settings/site-settings")}>
                <SettingIcon />
                <span>SETTINGS</span>
                <ul className="collapsed-side-nav f-14">
                  <li>Settings</li>
                </ul>
              </a>
            </Link>
          </li>
        )}
        {(ac(
          userAvailable.roles,
          "View HR assessment forms",
          userAvailable.email,
          admins
        ) ||
          ac(
            userAvailable.roles,
            "View L1 assessment forms",
            userAvailable.email,
            admins
          ) ||
          ac(
            userAvailable.roles,
            "View REX approval forms",
            userAvailable.email,
            admins
          )) && (
          <li>
            <Link href="/settings/employer-documents" onClick={openMenu}>
              <a className={routeSetActive("/settings/employer-documents")}>
                <DocsIcon />
                <span>EMPLOYER DOCUMENTS</span>
                <ul className="collapsed-side-nav f-14">
                  <li>Employer Documents</li>
                </ul>
              </a>
            </Link>
          </li>
        )}
        {ac(userAvailable.roles, "View users", userAvailable.email, admins) && (
          <li>
            <Link href="/settings/user" onClick={openMenu}>
              <a className={routeSetActive("/settings/user")}>
                <UsersIcon />
                <span>USER</span>
                <ul className="collapsed-side-nav f-14">
                  <li>User</li>
                </ul>
              </a>
            </Link>
          </li>
        )}
        {ac(userAvailable.roles, "View roles", userAvailable.email, admins) && (
          <li>
            <Link href="/settings/roles" onClick={openMenu}>
              <a className={routeSetActive("/settings/roles")}>
                <AwardIcon />
                <span>ROLES</span>
                <ul className="collapsed-side-nav f-14">
                  <li>Roles</li>
                </ul>
              </a>
            </Link>
          </li>
        )}
        {ac(
          userAvailable.roles,
          "View courses",
          userAvailable.email,
          admins
        ) && (
          <li>
            <Link href="/settings/courses" onClick={openMenu}>
              <a className={routeSetActive("/settings/courses")}>
                <CourseIcon />
                <span>COURSES</span>
                <ul className="collapsed-side-nav f-14">
                  <li>Courses</li>
                </ul>
              </a>
            </Link>
          </li>
        )}
        {ac(
          userAvailable.roles,
          "View training sessions",
          userAvailable.email,
          admins
        ) && (
          <li>
            <Link href="/settings/training-sessions" onClick={openMenu}>
              <a className={routeSetActive("/settings/training-sessions")}>
                <ClockIcon />
                <span>TRAINING SESSIONS</span>
                <ul className="collapsed-side-nav f-14">
                  <li>Training Sessions</li>
                </ul>
              </a>
            </Link>
          </li>
        )}
        {ac(
          userAvailable.roles,
          "View bankDetails",
          userAvailable.email,
          admins
        ) && (
          <li>
            <Link href="/settings/reports" onClick={openMenu}>
              <a className={routeSetActive("/settings/reports")}>
                <ReportIcon />
                <span>REPORTS</span>
                <ul className="collapsed-side-nav f-14">
                  <li>Reports</li>
                </ul>
              </a>
            </Link>
          </li>
        )}
        {/* {ac(userAvailable.roles, "View departments", userAvailable.email, admins) && <li>
          <Link href="/settings/departments" onClick={openMenu}>
            <a className={routeSetActive("/settings/departments")}><DepartmentIcon />
              <span>DEPARTMENTS</span>
              <ul className="collapsed-side-nav f-14">
                <li>Departments</li>
              </ul>
            </a>
          </Link>
        </li>}
         {ac(userAvailable.roles, "View designations", userAvailable.email, admins) && <li>
          <Link href="/settings/designations" onClick={openMenu}>
            <a className={routeSetActive("/settings/designations")}><CodeIcon />
              <span>DESIGNATIONS</span>
              <ul className="collapsed-side-nav f-14">
                <li>Designations</li>
              </ul>
            </a>
          </Link>
        </li>} */}
      </ul>
    </div>
  );
}
export default SideNav;
