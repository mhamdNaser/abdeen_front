import { useEffect, useState } from "react";
import axios from "axios";
import { useForm, Controller } from "react-hook-form";
import { toast } from "react-toastify";
import axiosClient from "../../../../axios-client";

const postData = async (formData) => {
  const res = await axiosClient.post("/admin/add-language", formData);
  return res;
};

export default function AddLanguage({ getData }) {
  const [langs, setLangs] = useState([]);
  const [slug, setSlug] = useState("");
  const {
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors },
  } = useForm();

  // Fetch languages from JSON file once when the component mounts
  useEffect(() => {
    axios
      .get("/json/LanguagesTemp.json")
      .then((resp) => setLangs(resp.data))
      .catch((error) => console.error("Error fetching languages:", error));
  }, []);

  const watchedLanguage = watch("language");

  useEffect(() => {
    if (watchedLanguage) {
      const selectedLang = langs.find((lang) => lang.code === watchedLanguage);
      if (selectedLang) {
        setSlug(selectedLang.code);
        setValue("slug", selectedLang.code);
      }
    } else {
      setSlug("");
      setValue("slug", "");
    }
  }, [watchedLanguage, langs, setValue]);

  const onSubmit = async (values) => {
    const selectedLang = langs.find((lang) => lang.code === values.language);
    const languageName = selectedLang ? selectedLang.lanName : "";

    const formData = {
      default: 0,
      direction: values.direction,
      name: languageName,
      slug: values.slug,
      status: parseInt(values.status),
    };

    const id = toast.loading("submitting, please wait...");
    try {
      const res = await postData(formData);
      toast.update(id, {
        type: "success",
        render: res.data.mes,
        closeOnClick: true,
        isLoading: false,
        autoClose: true,
        closeButton: true,
        pauseOnHover: false,
      });
      getData();
    } catch (error) {
      toast.update(id, {
        type: "error",
        render: error.response.data.message,
        closeOnClick: true,
        isLoading: false,
        autoClose: true,
        closeButton: true,
        pauseOnHover: false,
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="form w-full flex flex-col gap-4"
    >
      <div className="flex xl:flex-row md:flex-col md:w-full gap-4 justify-between">
        <div className="input-field md:w-full xl:w-[50%]">
          <label htmlFor="language" className="input-label">
            Language
          </label>
          <Controller
            name="language"
            control={control}
            defaultValue=""
            render={({ field: { onChange, value } }) => (
              <select
                id="language"
                name="language"
                value={value}
                onChange={(e) => {
                  onChange(e.target.value);
                  const selectedLang = langs.find(
                    (lang) => lang.code === e.target.value
                  );
                  if (selectedLang) {
                    setSlug(selectedLang.code);
                    setValue("slug", selectedLang.code);
                  }
                }}
                className="input-box bg-blocks-color"
              >
                <option value="" disabled>
                  Select a language
                </option>
                {langs.map((lang, index) => (
                  <option key={index} value={lang.code}>
                    {lang.lanName}
                  </option>
                ))}
              </select>
            )}
          />
          {errors.language && (
            <span className="red-text">{errors.language.message}</span>
          )}
        </div>

        <div className="input-field md:w-full xl:w-[50%]">
          <label htmlFor="direction" className="input-label">
            Direction
          </label>
          <Controller
            name="direction"
            control={control}
            defaultValue=""
            render={({ field: { onChange, value } }) => (
              <select
                id="direction"
                name="direction"
                value={value}
                onChange={onChange}
                className="input-box bg-blocks-color"
              >
                <option value="" disabled>
                  Select direction
                </option>
                <option value="LTR">LTR</option>
                <option value="RTL">RTL</option>
              </select>
            )}
          />
          {errors.direction && (
            <span className="red-text">{errors.direction.message}</span>
          )}
        </div>
      </div>

      <div className="flex xl:flex-row md:flex-col md:w-full gap-4 justify-between">
        <div className="input-field md:w-full xl:w-[50%]">
          <label htmlFor="status" className="input-label">
            Status
          </label>
          <Controller
            name="status"
            control={control}
            defaultValue=""
            render={({ field: { onChange, value } }) => (
              <select
                id="status"
                name="status"
                value={value}
                onChange={onChange}
                className="input-box bg-blocks-color"
              >
                <option value="" disabled>
                  Select status
                </option>
                <option value={1}>Publish</option>
                <option value={0}>Draft</option>
              </select>
            )}
          />
          {errors.status && (
            <span className="red-text">{errors.status.message}</span>
          )}
        </div>

        <div className="input-field md:w-full xl:w-[50%]">
          <label htmlFor="slug" className="input-label">
            Slug
          </label>
          <input
            type="text"
            id="slug"
            name="slug"
            value={slug}
            readOnly
            className="input-box bg-blocks-color"
          />
        </div>
      </div>

      <button
        type="submit"
        className="bg-redColor text-white w-72 p-2 outline-none border-none text-base px-6 rounded-[4px] disabled:bg-gray-600"
      >
        Add new language
      </button>
    </form>
  );
}
