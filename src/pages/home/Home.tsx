import "./home.css";
import { Cars } from "../../utils/Cars";
import { getImageUrl } from "../../utils/image_utils";
import Form from "../../components/form/Form";
import { useState } from "react";

const Home = () => {
  const cars = Cars();
  const [data, setData] = useState({ flag: false, name: "" });

  return (
    <>
      <div className="content">
        {cars.map((item) => (
          <>
            <div
              className="card"
              onClick={() => setData({ flag: true, name: item.name })}
            >
              <img alt="image" src={getImageUrl(item.logo)} />
            </div>
          </>
        ))}
      </div>
      {data.flag && <Form carName={data.name} />}
    </>
  );
};

export default Home;
