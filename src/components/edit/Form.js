import { useState } from "react";
import { useEditVideoMutation } from "../../api/apiSlice";
import Error from "../ui/Error";
import Success from "../ui/Success";
import TextArea from "../ui/TextArea";
import TextInput from "../ui/TextInput";

export default function Form({ video }) {
  const { id } = video;
  const [videoProperty, setVideoProperty] = useState({
    title: video.title,
    author: video.author,
    description: video.description,
    link: video.link,
    thumbnail: video.thumbnail,
    date: video.date,
    duration: video.duration,
    views: video.views,
  });

  const [editVideo, { isSuccess, isError, isLoading }] = useEditVideoMutation();

  const onVideoPropertyChange = (e) => {
    e.preventDefault();
    setVideoProperty({
      ...videoProperty,
      [e.target.name]: e.target.value,
    });
  };
  const resetForm = () => {
    setVideoProperty({
      title: "",
      author: "",
      description: "",
      link: "",
      thumbnail: "",
      date: "",
      duration: "",
      views: "",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    editVideo({ id, data: videoProperty });
    // resetForm();
  };
  const { title, author, description, link, thumbnail, date, duration, views } =
    videoProperty;

  console.log("single Video", videoProperty);
  return (
    <form method="POST" onSubmit={handleSubmit}>
      <div className="shadow overflow-hidden sm:rounded-md">
        <div className="px-4 py-5 bg-white sm:p-6">
          <div className="grid grid-cols-6 gap-6">
            <div className="col-span-6 sm:col-span-3">
              <TextInput
                name="title"
                onChange={(e) => onVideoPropertyChange(e)}
                value={title}
                title="Video Title"
              />
            </div>

            <div className="col-span-6 sm:col-span-3">
              <TextInput
                name="author"
                onChange={(e) => onVideoPropertyChange(e)}
                value={author}
                title="Author"
              />
            </div>

            <div className="col-span-6">
              <TextArea
                name="description"
                value={description}
                onChange={(e) => onVideoPropertyChange(e)}
                title="Description"
              />
            </div>

            <div className="col-span-6">
              <TextInput
                name="link"
                value={link}
                onChange={(e) => onVideoPropertyChange(e)}
                title="YouTube Video link"
              />
            </div>

            <div className="col-span-6">
              <TextInput
                name="thumbnail"
                value={thumbnail}
                onChange={(e) => onVideoPropertyChange(e)}
                title="Thumbnail link"
              />
            </div>

            <div className="col-span-6 sm:col-span-6 lg:col-span-2">
              <TextInput
                name="date"
                value={date}
                onChange={(e) => onVideoPropertyChange(e)}
                title="Upload Date"
              />
            </div>

            <div className="col-span-6 sm:col-span-3 lg:col-span-2">
              <TextInput
                name="duration"
                value={duration}
                onChange={(e) => onVideoPropertyChange(e)}
                title="Video Duration"
              />
            </div>

            <div className="col-span-6 sm:col-span-3 lg:col-span-2">
              <TextInput
                name="views"
                value={views}
                onChange={(e) => onVideoPropertyChange(e)}
                title="Video no of views"
              />
            </div>
          </div>
        </div>
        <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
          <button
            disabled={isLoading}
            type="submit"
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-0 focus:ring-offset-0 focus:ring-indigo-500"
          >
            Save
          </button>
        </div>
        {isSuccess && <Success message="Video was updated successfully" />}
        {isError && <Error message="There was an error to update video" />}
      </div>
    </form>
  );
}
