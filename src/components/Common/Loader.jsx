import { LineWave } from "react-loader-spinner";

const Loader = () => {
  return (
    <div className="loader-icon">
      <LineWave
        width="200"
        height="200"
        firstLineColor="red"
        middleLineColor="green"
        color="blue"
      />
    </div>
  );
};
export default Loader;
