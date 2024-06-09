import { Icons } from "@/components/icons";
import { ApiService } from "@/services";
import { useQuery } from "@tanstack/react-query";

const HomePage = () => {
  const query = useQuery({ queryKey: ["servers"], queryFn: ApiService.getUserServers });

  if (query.isLoading) {
    return <div>Loading...</div>;
  }
  if (!query.isError && query.data && query.data.length > 0) {
    return <div>We have servers</div>;
  }
  return (
    <div className="container grid px-6 mx-auto">
      <h1 className="my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200">
        Welcome to xtreamium
      </h1>
      <a
        className="flex items-center justify-between p-4 mb-8 text-sm font-semibold text-purple-100 bg-purple-600 rounded-lg shadow-md focus:outline-none focus:shadow-outline-purple"
        href="https://github.com/estevanmaito/windmill-dashboard-react"
      >
        <div className="flex items-center">
          <Icons.alarm className="w-5 h-5 mr-2" />
          <span>Please follow the below instructions or else nothing will work!</span>
        </div>
        <span>
          View more <span>→</span>
        </span>
      </a>
      <h2 className="mb-4 text-lg font-semibold text-gray-600 dark:text-gray-300">
        Proxy Setup
      </h2>
      <div className="px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
        <label className="block text-gray-700 text-md dark:text-gray-400">
          <span>pip install --user xtreamium-proxy</span>
        </label>
      </div>
      <h2 className="mb-4 text-lg font-semibold text-gray-600 dark:text-gray-300">
        mpv Setup
      </h2>
      <div className="px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
        <label className="block text-gray-700 text-md dark:text-gray-400">
          <span>
            <a href="https://mpv.io/" target="_blank" rel="noreferrer">
              Follow the instructions for your operating system to install mpv
            </a>
          </span>
        </label>
      </div>
      <h2 className="mb-4 text-lg font-semibold text-gray-600 dark:text-gray-300">
        mpv params
      </h2>
      <div className="px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
        <label className="block text-gray-700 text-md dark:text-gray-400">
          <span>
            Default mpv params are
            <div
              className="block p-6 text-sm whitespace-pre"
              dangerouslySetInnerHTML={{
                __html: import.meta.env.VITE_MPV_DEFAULTS?.replace(" ", "<br />") ?? "",
              }}
            ></div>
            Change them in your settings
          </span>
        </label>
      </div>
    </div>
  );
};

export default HomePage;
function getUser() {
  throw new Error("Function not implemented.");
}
