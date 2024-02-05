import "./table.css";
interface Props {
  tableData: {
    id: string;
    name: string;
    location: string;
    bodyType: string;
    modelName: string;
    owner: string;
    insurance: string;
    kilometer: string;
    fuelType: string;
    transmission: string;
    image: string;
    color: string;
  }[];
}
import { Car, setEditFlag, setEditValue } from "../../features/carsSlice";
import { useAppDispatch } from "../../app/hooks";

const Table: React.FC<Props> = (props) => {
  const tableData = props?.tableData;
  const dispatch = useAppDispatch();

  const editData = (value: Car) => {
    dispatch(setEditFlag(true));
    dispatch(setEditValue(value));
  };

  return (
    <div>
      <table id="customers">
        <tr>
          <th>Name</th>
          <th>Modal</th>
          <th>Body Type</th>
          <th>Location</th>
          <th>Fuel Type</th>
          <th>color</th>
          <th>Insurance</th>
          <th>Owner</th>
          <th>Transmission</th>
          <th>kilometer</th>
          <th>Image</th>
          <th>Edit</th>
        </tr>
        {tableData.map((item) => (
          <>
            <tr>
              <td>{item.name}</td>
              <td>{item.modelName}</td>
              <td>{item.bodyType}</td>
              <td>{item.location}</td>
              <td>{item.fuelType}</td>
              <td>{item.color}</td>
              <td>{item.insurance}</td>
              <td>{item.owner}</td>
              <td>{item.transmission}</td>
              <td>{item.kilometer}</td>
              <td>{item.image ? <img src={item.image} /> : ""}</td>
              <td onClick={() => editData(item)}>Edit</td>
            </tr>
          </>
        ))}
      </table>
    </div>
  );
};

export default Table;
