import "./form.css";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { ChangeEvent, useRef } from "react";
import { setFieldValue, clearFields, addCars } from "../../features/carsSlice";
import { useEffect } from "react";
import { generate_uuidv4 } from "../../utils/generate_uuid";
import { Location, BodyType, FuelType, Transmission } from "../../utils/Cars";

interface Props {
  carName: string;
}

const Form: React.FC<Props> = ({ carName }) => {
  const formFields = useAppSelector((state) => state.carReducer.formFields);
  //   const cardData = useAppSelector((state) => state.carReducer.cardData);
  const dispatch = useAppDispatch();
  const location = Location();
  const bodyType = BodyType();
  const fuelType = FuelType();
  const transmission = Transmission();
  const ref = useRef<HTMLInputElement>(null);
  //   console.log(formFields, carName);
  //   console.log(cardData);

  useEffect(() => {
    dispatch(clearFields());
  }, [carName, dispatch]);

  const setFormValue = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    dispatch(setFieldValue({ name, value }));
  };

  const clearData = () => {
    dispatch(clearFields());
    if (ref.current) {
      ref.current.value = "";
    }
  };

  const submitData = () => {
    const newValue = {
      ...formFields,
      name: carName,
      id: generate_uuidv4(),
    };

    const result = !Object.values(newValue).every((o) => o !== "");
    if (result) {
      alert("Please select enter all data in the form");
    } else {
      dispatch(addCars(newValue));
      dispatch(clearFields());
      if (ref.current) {
        ref.current.value = "";
      }
      alert(
        "Record saved, Please Visit List page for view and Edit for saved Record"
      );
    }
    //dispatch(addCars(newValue));
  };

  const imageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileType = ["image/png", "image/jpeg"];
    const file = event?.target?.files?.[0];
    // console.log(file);
    if (file && fileType.includes(file.type)) {
      const reader = new FileReader();
      reader.addEventListener(
        "load",
        function () {
          if (reader.result) {
            // console.log(reader.result, "file-------");
            dispatch(
              setFieldValue({
                name: event?.target.name,
                value: reader.result as string,
              })
            );
          }
        },
        false
      );
      reader.readAsDataURL(file);
    } else {
      alert("jpeg and png only allowed");
      if (ref.current) {
        ref.current.value = "";
      }
    }
  };

  return (
    <>
      <div className="container">
        <h3>Car Detail</h3>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="name.."
          value={carName}
          readOnly
        />
        <label htmlFor="location">Location</label>
        <select
          id="location"
          name="location"
          value={formFields.location}
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
          value={formFields.bodyType}
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
          value={formFields.modelName}
          onChange={setFormValue}
        />
        <label htmlFor="owner">Owner</label>
        <input
          type="text"
          id="owner"
          name="owner"
          placeholder="Owner.."
          value={formFields.owner}
          onChange={setFormValue}
        />
        <label htmlFor="brand">Insurance Valid upto</label>
        <input
          type="text"
          id="insurance"
          name="insurance"
          placeholder="Your name.."
          value={formFields.insurance}
          onChange={setFormValue}
        />
        <label htmlFor="color">Color</label>
        <input
          type="text"
          id="color"
          name="color"
          placeholder="color.."
          value={formFields.color}
          onChange={setFormValue}
        />
        <label htmlFor="kilometer">Kms</label>
        <input
          type="text"
          id="kilometer"
          name="kilometer"
          placeholder="Kms.."
          value={formFields.kilometer}
          onChange={setFormValue}
        />
        <label htmlFor="fuelType">Fuel Type</label>
        <select
          id="fuelType"
          name="fuelType"
          value={formFields.fuelType}
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
          value={formFields.transmission}
          onChange={setFormValue}
        >
          <option value="">select..</option>
          {transmission.map((item) => (
            <option value={item.id}>{item.name}</option>
          ))}
        </select>
        <label htmlFor="image">Image</label>
        <input
          type="file"
          id="image"
          name="image"
          placeholder="Kms.."
          ref={ref}
          onChange={imageUpload}
        />
        <input type="button" onClick={submitData} value="Save" />
        <input
          type="button"
          style={{ marginLeft: "10px" }}
          onClick={clearData}
          value="clear"
        />
      </div>
    </>
  );
};

export default Form;
