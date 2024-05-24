import React from "react";
import { NavLink } from "react-router-dom";
import { Category } from "@/models";
import { ApiService } from "@/services";

const SidebarContent = () => {
  const [categories, setCategory] = React.useState<Category[]>([]);
  //   const [filteredChannels, setFilteredChannels] = React.useState<Channel[]>([]);
  React.useEffect(() => {
    const fetchChannels = async () => {
      const res = await ApiService.getCategories();
      if (res) {
        setCategory(res);
      }
    };

    fetchChannels();
  }, []);
  //   const _searchChannels = ($event: React.ChangeEvent<HTMLInputElement>) => {
  //     const searchString = $event.target.value;
  //     if (searchString) {
  //       const filteredChannels = channels.filter((c) => {
  //         const result = c.category_name
  //           .toLowerCase()
  //           .includes(searchString.toLowerCase());
  //         console.log(
  //           "sidebar.component",
  //           `Category Name: ${c.category_name}`,
  //           `Search String: ${searchString}`
  //         );
  //         console.log("sidebar.component", "Result", result);
  //         return result;
  //       });
  //       setFilteredChannels(filteredChannels);
  //     } else {
  //       setFilteredChannels(channels);
  //     }
  //   };
  return (
    categories && (
      <div className="py-4 text-base-content scroller">
        <a className="ml-6 text-lg font-bold " href="/">
          Xtreamium
        </a>
        <ul className="mt-6">
          {categories.map((category: Category) => (
            <li className="relative px-6 py-3" key={category.category_id}>
              <NavLink
                to={`/category/${category.category_id}`}
                className={({ isActive }) =>
                  `inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-accent ${
                    isActive && "text-info"
                  }`
                }
                children={({ isActive }) => {
                  return (
                    <>
                      {isActive && (
                        <span
                          className="absolute inset-y-0 left-0 w-1 rounded-tr-lg rounded-br-lg bg-info"
                          aria-hidden="true"
                        ></span>
                      )}
                      {/* <Icon className="w-5 h-5" aria-hidden="true" icon={route.icon} /> */}
                      <span className="ml-4">{category.category_name}</span>
                    </>
                  );
                }}
              />
            </li>
          ))}
        </ul>
      </div>
    )
  );
};

export default SidebarContent;
