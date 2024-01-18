import useSWR, { useSWRConfig } from "swr";
import { deleteStory, getAllStory } from "../services/StoryService.jsx";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const Home = () => {
  const { mutate } = useSWRConfig();
  const fatcher = async (url) => {
    return await getAllStory(url);
  };
  const { data, error } = useSWR("/api/story", fatcher);
  let loading = false;
  if (!data) {
    loading = true;
  }

  const delStory = async (id) => {
    Swal.fire({
      icon: "warning",
      title: "Confirmation",
      text: "Are you sure want to delete this Story ?",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
      reverseButtons: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        await deleteStory(id);
        mutate("/api/story");
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        return false;
      }
    });
  };

   
    return (
      <div className="flex flex-col mt-5">
        <div className="w-full">
          <Link
            to={"/add"}
            className="bg-green-500 border border-slate-text hover:bg-green-700 text-white py-1 px-3 rounded-lg"
          >
            Add New
          </Link>
          <div className="w-full">
            <form onSubmit="" className="flex items-center">
              <input
                type="text"
                placeholder="Search..."
                value=" "
                onChange=" "
                className="w-full py-2 px-4 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
              />
              <button
                type="submit"
                className="ml-2 bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600"
              >
                Search
              </button>
            </form>
          </div>
          <div className="relative shadow rounded-lg mt-3">
            <table className="w-full text-sm text-left text-gray-500">
              <thead className="text-xs text-gray-700 uppercase bg-gray-100">
                <tr>
                  <th className="py-3 px-1 text-center">No</th>
                  <th className="py-3 px-1">Story Title</th>
                  <th className="py-3 px-1 text-right">Writes</th>
                  <th className="py-3 px-1 text-right">Category</th>
                  <th className="py-3 px-1 text-right">Tags</th>
                  <th className="py-3 px-1 text-right">Status</th>
                  <th className="py-3 px-1 text-right">Sysnopsis</th>
                  <th className="py-3 px-1 text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {data ? (
                  data.map((story, index) => {
                    return (
                      <tr key={story.id} className="bg-white border-b">
                        <td className="py-3 px-1 text-center">{index + 1}</td>
                        <td className="py-3 px-1">{story.title}</td>
                        <td className="py-3 px-1 text-right">{story.writes}</td>
                        <td className="py-3 px-1 text-right">{story.category}</td>
                        <td className="py-3 px-1 text-right">{story.tags}</td>
                        <td className="py-3 px-1 text-right">{story.status}</td>
                        <td className="py-3 px-1 text-right">{story.synopsis}</td>
                        <td className="py-3 px-1 text-center">
                          <Link
                            to={`/edit/${story.id}`}
                            className="font-medium bg-blue-400 hover:bg-blue-500 px-3 py-1 rounded text-white mr-1"
                          >
                            Edit
                          </Link>
                          <button
                            onClick={() => delStory(story.id)}
                            className="font-medium bg-red-400 hover:bg-red-500 px-3 py-1 rounded text-white"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    );
                  })
                ) : loading ? (
                  <tr>
                    <td colSpan={4}></td>
                  </tr>
                ) : (
                  <tr>
                    <td colSpan={4}>{error ? error : "No Data"}</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };

  export default Home;
