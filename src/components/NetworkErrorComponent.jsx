import { MdOutlineWifiTetheringErrorRounded } from "react-icons/md";

const NetworkErrorComponent = () => {
  return (
    <div className="flex flex-col justify-center min-h-[60vh] items-center gap-12">
      <div className="network-error-icon">
        <MdOutlineWifiTetheringErrorRounded size={100} color="red" />
      </div>
      <div className="flex items-center flex-col gap-4">
        <h2 className="text-3xl font-bold">Oops! fetching Error</h2>
        <p className="text-gray-500">
          looks like there was an issue with getting data, please try again in
          few seconds !
        </p>
      </div>
    </div>
  );
};

export default NetworkErrorComponent;
