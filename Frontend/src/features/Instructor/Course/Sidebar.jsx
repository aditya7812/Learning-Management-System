import { Link, useParams } from "react-router-dom";
import { DashboardLinks } from "../../../data/dashoard-links";

const Sidebar = () => {
  const params = useParams();
  const { courseId } = params;
  return (
    <div className=" ml-8 mr-4 w-1/5">
      {DashboardLinks.map((ele, i) => {
        return (
          <div key={i} className="mt-8">
            <p className="font-bold">{ele.title}</p>
            <div>
              {ele.sublinks.map((subtitle, index) => {
                return (
                  <div key={index} className="p-3 hover:bg-slate-100">
                    <Link
                      to={`/instructor/course/${courseId}/manage/${subtitle.link}`}
                    >
                      {subtitle.subtitle}
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Sidebar;
