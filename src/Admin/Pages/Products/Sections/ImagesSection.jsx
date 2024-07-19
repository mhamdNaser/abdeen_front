import React, { useEffect, useState } from "react";
import axiosClient from "../../../../axios-client";
import ModalContainer from "../../../../components/ModalContainer";
import { BiSolidTrashAlt } from "react-icons/bi";

export default function ImagesSection({ Productid }) {
  const [images, setImages] = useState([]);
  const [imageFiles, setImageFiles] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchImages();
  }, [Productid]);

  const fetchImages = () => {
    axiosClient
      .get(`/admin/show-product-images/${Productid}`)
      .then((response) => {
        setImages(response.data.images);
      })
      .catch((error) => {
        console.error("Error fetching images:", error);
      });
  };

  const handleImageUpload = (event) => {
    const files = event.target.files;
    setImageFiles(files);
    setIsModalOpen(true);
  };

  const uploadImages = () => {
    const formData = new FormData();
    for (let i = 0; i < imageFiles.length; i++) {
      formData.append("images[]", imageFiles[i]);
    }

    console.log(formData); // تأكد من أن البيانات تم إرسالها بشكل صحيح هنا

    axiosClient
      .post(`/admin/store-product-image/${Productid}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data", // تأكد من تعيين نوع المحتوى بشكل صحيح
        },
      })
      .then((response) => {
        fetchImages();
        setIsModalOpen(false); // إغلاق النافذة المنبثقة بعد رفع الصور
      })
      .catch((error) => {
        console.error("Error uploading images:", error);
      });
  };

  const deleteImage = (imageId) => {
    axiosClient
      .delete(`/admin/delete-product-image/${Productid}/${imageId}`)
      .then((response) => {
        fetchImages();
      })
      .catch((error) => {
        console.error("Error deleting image:", error);
      });
  };

  return (
    <>
      <section className="mb-8">
        <div className="bg-blocks-color shadow-md rounded-lg p-4">
          <h2 className="text-2xl border-b py-3 font-semibold flex justify-between">
            Product Images
            <label className="relative text-xs cursor-pointer">
              <input
                className="absolute inset-0 opacity-0 cursor-pointer"
                type="file"
                name="images[]"
                multiple
                onChange={handleImageUpload}
              />
              <span className="bg-blue-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-600 transition-colors">
                Upload Images
              </span>
            </label>
          </h2>

          <div className="flex flex-wrap justify-start">
            {images.length > 0 ? (
              images.map((image, index) => (
                <div key={index} className="w-1/5 p-2">
                  {image ? (
                    <div className="relative">
                      <img
                        src={`${image.url}`}
                        alt={`Product Image ${index + 1}`}
                        className="w-full h-40 rounded-lg shadow-md"
                      />
                      <button
                        onClick={() => deleteImage(image.id)}
                        className="absolute top-2 right-2 bg-red-500 text-white py-1 px-3 rounded-lg shadow-md hover:bg-red-600 transition-colors"
                      >
                        <BiSolidTrashAlt />
                      </button>
                    </div>
                  ) : (
                    <p className="text-center">Image not available.</p>
                  )}
                </div>
              ))
            ) : (
              <p className="text-center">
                No images available for this product.
              </p>
            )}
          </div>
        </div>
      </section>
      {isModalOpen && (
        <ModalContainer
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          component={
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-xl font-bold mb-4">Confirm Image Upload</h2>
              <div className="mb-4 flex">
                {Array.from(imageFiles).map((file, index) => (
                  <img
                    key={index}
                    src={URL.createObjectURL(file)}
                    alt={`Uploaded Image ${index + 1}`}
                    className="w-32 h-32 object-cover rounded-lg shadow-md m-2"
                  />
                ))}
              </div>
              <div className="flex justify-end">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="bg-gray-500 text-white py-2 px-4 rounded-lg mr-2"
                >
                  Cancel
                </button>
                <button
                  onClick={uploadImages}
                  className="bg-blue-500 text-white py-2 px-4 rounded-lg"
                >
                  Confirm
                </button>
              </div>
            </div>
          }
        />
      )}
    </>
  );
}
