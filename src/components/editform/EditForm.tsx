import "./editform.css";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { ChangeEvent } from "react";
import {
  setEditFieldValue,
  clearEditFilter,
  updateCars,
  setEditFlag,
} from "../../features/carsSlice";
import { Location, BodyType, FuelType, Transmission } from "../../utils/Cars";

const EditForm = () => {
  const editformFields = useAppSelector(
    (state) => state.carReducer.editformFields
  );
  const cardData = useAppSelector((state) => state.carReducer.cardData);
  const dispatch = useAppDispatch();
  const location = Location();
  const bodyType = BodyType();
  const fuelType = FuelType();
  const transmission = Transmission();
  //const ref = useRef<HTMLInputElement>(null);
  //   console.log(editformFields, carName);
  //   console.log(cardData);

  const setFormValue = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    dispatch(setEditFieldValue({ name, value }));
  };

  const cancelEdit = () => {
    dispatch(clearEditFilter());
    dispatch(setEditFlag(false));
  };

  const submitData = () => {
    const data = [...cardData];
    const newValue = {
      ...editformFields,
    };

    console.log(cardData);

    const index = data.findIndex((val) => val.id === editformFields.id);
    data.splice(index, 1, newValue);
    console.log(data);

    const result = !Object.values(newValue).every((o) => o !== "");
    if (result) {
      alert("Please select enter all data in the form");
    } else {
      dispatch(updateCars(data));
      dispatch(clearEditFilter());
      dispatch(setEditFlag(false));
      alert("Record saved");
    }
  };

  // const imageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const fileType = ["image/png", "image/jpeg"];
  //   const file = event?.target?.files?.[0];
  //   // console.log(file);
  //   if (file && fileType.includes(file.type)) {
  //     const reader = new FileReader();
  //     reader.addEventListener(
  //       "load",
  //       function () {
  //         if (reader.result) {
  //           // console.log(reader.result, "file-------");
  //           dispatch(
  //             setEditFieldValue({
  //               name: event?.target.name,
  //               value: reader.result as string,
  //             })
  //           );
  //         }
  //       },
  //       false
  //     );
  //     reader.readAsDataURL(file);
  //   } else {
  //     alert("jpeg and png only allowed");
  //     if (ref.current) {
  //       ref.current.value = "";
  //     }
  //   }
  // };

  return (
    <>
      <div className="container">
        <h3>Edit Car Detail</h3>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="name.."
          value={editformFields.name}
          readOnly
        />
        <label htmlFor="location">Location</label>
        <select
          id="location"
          name="location"
          value={editformFields.location}
          onChange={setFormValue}
        >
          <option value="">select..</option>
          {location.map((item) => (
            <option value={item.id}>{item.name}</option>
          ))}
        </select>
        <label htmlFor="bodyType">Body Type</label>
        <select
          id="bodyType"
          name="bodyType"
          value={editformFields.bodyType}
          onChange={setFormValue}
        >
          <option value="">select..</option>
          {bodyType.map((item) => (
            <option value={item.id}>{item.name}</option>
          ))}
        </select>
        <label htmlFor="brand">Model Name</label>
        <input
          type="text"
          id="modelName"
          name="modelName"
          placeholder="Modal name.."
          value={editformFields.modelName}
          onChange={setFormValue}
        />
        <label htmlFor="owner">Owner</label>
        <input
          type="text"
          id="owner"
          name="owner"
          placeholder="Owner.."
          value={editformFields.owner}
          onChange={setFormValue}
        />
        <label htmlFor="brand">Insurance Valid upto</label>
        <input
          type="text"
          id="insurance"
          name="insurance"
          placeholder="Your name.."
          value={editformFields.insurance}
          onChange={setFormValue}
        />
        <label htmlFor="color">Color</label>
        <input
          type="text"
          id="color"
          name="color"
          placeholder="color.."
          value={editformFields.color}
          onChange={setFormValue}
        />
        <label htmlFor="kilometer">Kms</label>
        <input
          type="text"
          id="kilometer"
          name="kilometer"
          placeholder="Kms.."
          value={editformFields.kilometer}
          onChange={setFormValue}
        />
        <label htmlFor="fuelType">Fuel Type</label>
        <select
          id="fuelType"
          name="fuelType"
          value={editformFields.fuelType}
          onChange={setFormValue}
        >
          <option value="">select..</option>
          {fuelType.map((item) => (
            <option value={item.id}>{item.name}</option>
          ))}
        </select>
        <label htmlFor="location">Transmission</label>
        <select
          id="transmission"
          name="transmission"
          value={editformFields.transmission}
          onChange={setFormValue}
        >
          <option value="">select..</option>
          {transmission.map((item) => (
            <option value={item.id}>{item.name}</option>
          ))}
        </select>
        {/* <input
          type="file"
          id="image"
          name="image"
          placeholder="Kms.."
          ref={ref}
          onChange={imageUpload}
        /> */}
        <input type="button" onClick={submitData} value="Save" />
        <input
          type="button"
          style={{ marginLeft: "10px" }}
          onClick={cancelEdit}
          value="cancel"
        />
      </div>
    </>
  );
};

export default EditForm;
