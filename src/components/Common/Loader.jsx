import { ColorRing } from "react-loader-spinner";

const Loader = () => {
  return (
    <div className="loader-icon">
      <ColorRing width="80" height="80" visible={true} />
    </div>
  );
};
export default Loader;
