import { addDoc, collection } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import React, { useEffect, useRef, useState } from "react";
import { LiaTimesSolid } from "react-icons/lia";
import ReactQuill from "react-quill";
import { toast } from "react-toastify";
import { db, storage } from "../../../firebase/firebase";
import { Blog } from "../../../Context/Context";
import { useNavigate } from "react-router-dom";

const Preview = ({ setPublish, description, title }) => {
  const imageRef = useRef(null);
  const [imageUrl, setImageUrl] = useState("");
  const [desc, setDesc] = useState("");
  const [language, setLanguage] = useState("English");
  const { currentUser } = Blog();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [preview, setPreview] = useState({
    title: "",
    photo: "",
  });

  useEffect(() => {
    if (title || description) {
      setPreview({ ...preview, title: title });
      setDesc(description);
    } else {
      setPreview({ ...preview, title: "" });
      setDesc("");
    }
  }, [title, description]);

  const handleClick = () => {
    imageRef.current.click();
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      if (preview.title === "" || desc === "") {
        toast.error("All fields are required!!!");
        return;
      }

      const collections = collection(db, "posts");

      let url;
      if (imageUrl) {
        const storageRef = ref(storage, `image/${preview.photo.name}`);
        await uploadBytes(storageRef, preview?.photo);

        url = await getDownloadURL(storageRef);
      }

      await addDoc(collections, {
        userId: currentUser?.uid,
        details: {title: preview.title, desc: desc},
        language: language,
        postImg: url || "",
        created: Date.now(),
        pageViews: 0,
      });
      toast.success("Post has been added");
      navigate("/");
      setPublish(false);
      setPreview({
        title: "",
        photo: "",
      });
      setLanguage("English");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <section className="absolute inset-0 bg-white z-30">
      <div className="size my-[2rem]">
        <span
          onClick={() => setPublish(false)}
          className="absolute right-[1rem] md:right-[5rem] top-[3rem] text-2xl cursor-pointer">
          <LiaTimesSolid />
        </span>
        {/* preview the text  */}
        <div className="mt-[8rem] flex flex-col md:flex-row gap-10">
          <div className="flex-[1]">
            <h3>Story Preview</h3>
            <div
              style={{ backgroundImage: `url(${imageUrl})` }}
              onClick={handleClick}
              className="w-full h-[200px] object-cover bg-gray-100 my-3 grid 
                place-items-center cursor-pointer bg-cover bg-no-repeat ">
              {!imageUrl && "Add Image"}
            </div>
            <input
              onChange={(e) => {
                setImageUrl(URL.createObjectURL(e.target.files[0]));
                setPreview({ ...preview, photo: e.target.files[0] });
              }}
              ref={imageRef}
              type="file"
              hidden
            />
            <input
              type="text"
              placeholder="Title"
              className="outline-none w-full border-b border-gray-300 py-2"
              value={preview.title}
              onChange={(e) =>
                setPreview({ ...preview, title: e.target.value })
              }
            />
            <ReactQuill
              theme="bubble"
              value={desc}
              onChange={setDesc}
              placeholder="Tell Your Story..."
              className="py-3 border-b border-gray-300"
            />
            <p className="text-gray-500 pt-4 text-sm">
              <span className="font-bold">Note:</span> Changes here will affect
              how your story appears in public places like Medium’s homepage and
              in subscribers’ inboxes — not the contents of the story itself.
            </p>
          </div>
          <div className="flex-[1] flex flex-col gap-4 mb-5 md:mb-0">
            <h3 className="text-2xl">
              Publishing to:
              <span className="font-bold capitalize">Medium Clone</span>
            </h3>
            <p>Language: <input value={language}
        onChange={(e) => setLanguage(e.target.value)}
        type="language"
        placeholder="English(default)"
        className="outline-none border-black border text-center"/></p>

            <button
              onClick={handleSubmit}
              className="btn !bg-green-800 !w-fit !text-white !rounded-full">
              {loading ? "Submitting..." : "Publish Now"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Preview;
