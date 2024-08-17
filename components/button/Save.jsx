import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "./Button";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

const Save = ({ loading }) => {
  return (
    <div className="w-full py-1 -mt-5 mb-5">
      <Button
        variant="default"
        size="default"
        className="block w-fit ml-auto"
        disabled={loading}
      >
        {loading ? <FontAwesomeIcon icon={faSpinner} spin /> : "save"}
      </Button>
    </div>
  );
};

export default Save;
