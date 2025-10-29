import { BarLoader } from "react-spinners";

const override = {
  display: "block",
  margin: "0 auto",
};

const Spinner = ({ color = "blue" }) => {
  return (
    <div>
      <BarLoader
        color={color}
        size={200}
        cssOverride={override}
        aria-label="Loading..."
      />
    </div>
  );
};
export default Spinner;
