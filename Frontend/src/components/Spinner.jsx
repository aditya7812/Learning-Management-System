import { TailSpin } from "react-loader-spinner";
const Spinner = () => {
  return (
    <div className="flex justify-center items-center w-full">
      <TailSpin
        height="80"
        width="80"
        color="#262626"
        ariaLabel="tail-spin-loading"
        radius="1"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    </div>
  );
};
export default Spinner;
