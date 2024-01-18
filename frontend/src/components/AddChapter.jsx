import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { inputChapter } from "../services/ChapterService.jsx";
import { Link } from 'react-router-dom';
import Swal from "sweetalert2";
import useSWR from "swr";

const AddChapter = () => {
     const [title, setTitle] = useState("");
     const [story, setStory] = useState("");
     const navigate = useNavigate();

     //  Fungsi Save ==========================
     const saveChapter = async (e) => {
          e.preventDefault();
          const newChapter = { title, story };
          try {
               const data = await inputChapter(newChapter);
               if (data) {
                    Swal.fire({
                         title: "Success!",
                         text: "Chapter has been added",
                         icon: "success",
                    });
                    navigate("/add");
               }
          } catch (error) {
               Swal.fire({
                    title: "Error !",
                    text: error,
                    icon: "error",
               });
          }
     };

     return (
          <div className="max-w-lg mx-auto my-10 bg-white p-8 rounded-xl shadow shadow-slate-300">
               <form onSubmit={saveChapter} className="my-10">
                    <div className="flex flex-col">
                         <div className="mb-5">
                              <label className="font-bold text-slate-800">Title Name</label>
                              <input
                                   type="text"
                                   name="title"
                                   placeholder="Title Name"
                                   value={title}
                                   onChange={(e) => setTitle(e.target.value)}
                                   className="w-full py-3 mt-1 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
                              />
                         </div>
                         <div className="mb-5 columns-2">
                              <label className="font-bold text-slate-800">Story</label>
                              <textarea name="story" rows={4} cols={55} className="border border-slate-300 rounded-lg text-slate-800" value={story} onChange={(e) => setStory(e.target.value)} />

                         </div>
                         <button
                              type="submit"
                              className="w-full py-3 mb-5 font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg"
                         >
                              Submit
                         </button>
                         <a href="/add" type="button" className="w-full py-3 font-bold text-indigo-600 bg-white border-2 border-indigo-700 rounded-lg mr-10 text-center">
                              Cancel
                         </a>
                    </div>
               </form>
          </div>
     );
};

export default AddChapter;
