import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getStoryById, updateStory } from "../services/StoryService.jsx";
import Swal from "sweetalert2";
import { Link } from 'react-router-dom';

const EditStory = () => {
  const [title, setTitle] = useState("");
  const [writes, setWrites] = useState("");
  const [synopsis, setSynopsis] = useState("");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState("");
  const [coverImage, setcoverImage] = useState("");
  const [status, setStatus] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  const editStory = async (e) => {
    e.preventDefault();
    const story = { title, writes, category, tags, status, synopsis, coverImage };
    try {
      const data = await updateStory(id, story);
      if (data) {
        Swal.fire({
          title: "Success!",
          text: "Story has been updated",
          icon: "success",
        });
        navigate("/");
      }
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: error,
        icon: "error",
      });
    }
  };
  useEffect(() => {
    const fetchStory = async () => {
      const data = await getStoryById(id);
      if (data) {
        setTitle(data.title);
        setWrites(data.writes);
        setSynopsis(data.synopsis);
        setCategory(data.category);
        setTags(data.tags);
        setcoverImage(data.coverImage);
        setStatus(data.status); 
      }
    };
    fetchStory();
  }, [id]);

   return (
    <div className="max-w-lg mx-auto my-10 bg-white p-8 rounded-xl shadow shadow-slate-600">
      <form onSubmit={editStory} className=" ">
        <div class="grid mb-8">
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
                      <input
                        type="text"
                        name="synopsis"
                        placeholder="Synopsis"
                        value={synopsis}
                        onChange={(e) => setSynopsis(e.target.value)}
                        className="w-full py-3 mt-1 border border-slate-300 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
                      />
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
                        placeholder={coverImage}
                        value=""
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
        </div>
        <div className="flex justify-center">
          <Link to="/" className="w-full py-3 max-w-64 font-bold text-indigo-600 bg-white border-2 border-indigo-700 rounded-lg mr-10 text-center">
            Cancel
          </Link>
          <button
            type="submit"
            className="w-full py-3 max-w-64 font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg"
          >
            Save
          </button>
        </div>
      </form>

    </div>
  );
};

export default EditStory;
