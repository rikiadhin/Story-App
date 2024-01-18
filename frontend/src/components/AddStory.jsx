import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { inputStory } from "../services/StoryService.jsx";
import { deleteChapter, getAllChapter } from "../services/ChapterService.jsx";
import { Link } from 'react-router-dom';
import Swal from "sweetalert2";
import useSWR from "swr";

const AddStory = () => {
  const [title, setTitle] = useState("");
  const [writes, setWrites] = useState("");
  const [synopsis, setSynopsis] = useState("");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState("");
  const [coverImage, setcoverImage] = useState("");
  const [status, setStatus] = useState("");
  const navigate = useNavigate();

  //  Fungsi Save ==========================
  const saveStory = async (e) => {
    e.preventDefault();
    const newStory = { title, writes, category, tags, status, synopsis, coverImage };
    try {
      const data = await inputStory(newStory);
      if (data) {
        Swal.fire({
          title: "Success!",
          text: "Story has been added",
          icon: "success",
        });
        navigate("/");
      }
    } catch (error) {
      Swal.fire({
        title: "Error !",
        text: error,
        icon: "error",
      });
    }
  };

  //  Data Chapter ========================== 
   const fatcher = async (url) => {
    return await getAllChapter(url);
  };
  const { dataChapter, error } = useSWR("/api/chapters", fatcher);
  let loading = false;
  if (!dataChapter) {
    loading = true;
  } 

  return (
    <div className="mx-auto my-10 bg-white p-8 rounded-xl shadow shadow-slate-600">
      <form onSubmit={saveStory} className=" ">
        <div class="grid grid-cols-2 gap-10 mb-8">
          <div>
            <table className="mt-6 table-relative">
              <tbody>
                <td>
                  <tr>
                    <td className="mb-5">
                      <label className="font-bold text-slate-800">Title Name</label>
                      <input
                        type="text"
                        name="title"
                        placeholder="Title Name"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full py-3 mt-1 border border-slate-300 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
                      />
                    </td>
                    <td className="mb-5">
                      <label className="font-bold text-slate-800">Writes</label>
                      <input
                        type="text"
                        name="writes"
                        placeholder="Writes"
                        value={writes}
                        onChange={(e) => setWrites(e.target.value)}
                        className="w-full py-3 mt-1 border border-slate-300 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td colSpan="2" className="mb-5">
                      <label className="font-bold text-slate-800">Synopsis</label>
                      <textarea name="synopsis" rows={4} cols={73} className="border rounded-lg border-slate-300 text-slate-800" value={synopsis} onChange={(e) => setSynopsis(e.target.value)} />
                       
                    </td>
                  </tr>
                  <tr>
                    <td className="mb-5">
                      <label className="font-bold text-slate-800">Category</label>
                      <select
                        name="category"
                        placeholder="Category"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-full py-3 mt-1 border border-slate-300 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
                      >
                        <option value="option1">Option 1</option>
                        <option value="option2">Option 2</option>
                        <option value="option3">Option 3</option>
                        {/* Tambahkan opsi sesuai kebutuhan Anda */}
                      </select> 
                    </td>
                    <td className="mb-5">
                      <label className="font-bold text-slate-800">Tags</label>
                      <input
                        type="text"
                        name="tags"
                        placeholder="Tags"
                        value={tags}
                        onChange={(e) => setTags(e.target.value)}
                        className="w-full py-3 mt-1 border border-slate-300 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td className="mb-5">
                      <label className="font-bold text-slate-800">Cover Image</label>
                      <input
                        type="file"
                        name="coverImage"
                        placeholder="Cover Image"
                        value={coverImage}
                        onChange={(e) => setcoverImage(e.target.value)}
                        className="w-full py-3 mt-1 border border-slate-300 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
                      />
                    </td>
                    <td className="mb-5">
                      <label className="font-bold text-slate-800">Status</label>
                      <select
                        name="status"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        className="w-full py-3 mt-1 border border-slate-300 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
                      >
                        <option value="option1">Option 1</option>
                        <option value="option2">Option 2</option>
                        <option value="option3">Option 3</option>
                        {/* Tambahkan opsi sesuai kebutuhan Anda */}
                      </select>
                    </td>

                  </tr>
                </td>
              </tbody>
            </table>
          </div>
          <div>
            <Link
              to={`/add/Chapter`}
              className="flex justify-center max-w-32 font-medium bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded text-white"
            >
              Add Chapter
            </Link>
            <table className="w-full text-sm text-left text-gray-500 mt-5">
              <thead className="text-xs text-gray-700 uppercase bg-gray-100">
                <tr>
                  <th className="py-3 px-1 text-center">No</th>
                  <th className="py-3 px-1">Story Title</th>
                  <th className="py-3 px-1 text-right">Writes</th>
                  <th className="py-3 px-1 text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {dataChapter ? (
                  dataChapter.map((chapter, index) => {
                    return (
                      console.log("Data State:", dataChapter),
                      <tr key={chapter.id} className="bg-white border-b">
                        <td className="py-3 px-1 text-center">{index + 1}</td>
                        <td className="py-3 px-1">{chapter.title}</td>
                        <td className="py-3 px-1 text-right">{chapter.lastUpdate}</td>
                        <td className="py-3 px-1 text-center">
                          <Link
                            to={`/edit/${chapter.id}`}
                            className="font-medium bg-blue-400 hover:bg-blue-500 px-3 py-1 rounded text-white mr-1"
                          >
                            Edit
                          </Link>
                          <button
                            onClick={() => deleteChapter(chapter.id)}
                            className="font-medium bg-red-400 hover:bg-red-500 px-3 py-1 rounded text-white"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    );
                  })
                ) : loading ? (
                  console.log("Loading State :", loading),
                  <tr>
                    <td colSpan={4}>{error ? error : "Tidak Ada Data"}</td>
                  </tr>
                ) : (
                  <tr>
                    <td colSpan={4}> {error ? error : "Tidak Ada Data 2"}</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
        <div className="flex justify-center">
          <a href="/" type="button" className="w-full py-3 max-w-64 font-bold text-indigo-600 bg-white border-2 border-indigo-700 rounded-lg mr-10 text-center">
            Cancel
          </a>
          <button
            type="submit"
            className="w-full py-3 max-w-64 font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg"
          >
            Submit
          </button>
        </div>
      </form>

    </div>
  );
};

export default AddStory;
