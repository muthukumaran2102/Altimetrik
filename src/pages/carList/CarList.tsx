import Table from "../../components/table/Table";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { ChangeEvent, useEffect, useState } from "react";
import {
  setFilterValue,
  clearFilter,
  Car,
  setEditFlag,
} from "../../features/carsSlice";
import "./carlist.css";
import { Location, BodyType, FuelType, Transmission } from "../../utils/Cars";
import EditForm from "../../components/editform/EditForm";
interface Foo {
  id: string;
  name: string;
}

const CarList = () => {
  const cardData = useAppSelector((state) => state.carReducer.cardData);
  const filterValue = useAppSelector((state) => state.carReducer.filterValue);
  const editFlag = useAppSelector((state) => state.carReducer.editFlag);
  const [tableData, setTableData] = useState<Car[]>(cardData);
  const dispatch = useAppDispatch();
  const location = Location();
  const bodyType = BodyType();
  const fuelType = FuelType();
  const transmission = Transmission();
  const [model, setModel] = useState<Foo[]>([]);
  const [owners, setOwners] = useState<Foo[]>([]);
  useEffect(() => {
    const ownerArr: Foo[] = [];
    const ModalArr: Foo[] = [];
    cardData.forEach(function (item: { owner: string }) {
      const i = ownerArr.findIndex((x) => x.id == item.owner);
      if (i <= -1) {
        ownerArr.push({ id: item.owner, name: item.owner });
      }
    });
    cardData.forEach(function (item: { modelName: string }) {
      const i = ModalArr.findIndex((x) => x.id == item.modelName);
      if (i <= -1) {
        ModalArr.push({ id: item.modelName, name: item.modelName });
      }
    });
    setModel(ModalArr);
    setOwners(ownerArr);
    setTableData(cardData);
    return () => {
      dispatch(setEditFlag(false));
    };
  }, [cardData]);

  const searchData = () => {
    console.log(filterValue);
    // const keys = Object.keys(filterValue);
    // const value = Object.values(filterValue);
    // const result = cardData.filter(function(e) {
    //     return keys.every(function(a) {
    //      if (a !== "modelName") {
    //       return value.includes(e[a])
    //      }
    //     })
    //   })
    const result2: Car[] = [];
    const finalResult: Car[] = [];
    if (filterValue.modelName && filterValue.modelName.length) {
      const data = filterValue.modelName;
      data.forEach((item) => {
        cardData.forEach((item2) => {
          if (item2.modelName === item) {
            result2.push(item2);
          }
        });
      });
    }

    const result = cardData.filter((item) => {
      if (filterValue.location === item.location) {
        return item;
      }
      if (filterValue.bodyType === item.bodyType) {
        return item;
      }
      if (filterValue.owner === item.owner) {
        return item;
      }
      if (filterValue.fuelType === item.fuelType) {
        return item;
      }
      if (filterValue.transmission === item.transmission) {
        return item;
      }
    });
    const result3 = [...result, ...result2];
    result3.forEach(function (item) {
      const i = finalResult.findIndex((x) => x.modelName == item.modelName);
      if (i <= -1) {
        finalResult.push(item);
      }
    });
    setTableData(finalResult);
  };

  const clearData = () => {
    dispatch(clearFilter());
    setTableData(cardData);
  };

  const setFormValue = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    dispatch(setFilterValue({ name, value }));
  };

  const setCheckBoxValue = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>
  ) => {
    const oldVal = filterValue.modelName;
    const { name, value, checked } = e.target;
    if (checked) {
      const data = [...filterValue.modelName, value];
      dispatch(setFilterValue({ name, value: data as [] }));
    } else {
      const data = oldVal.filter((item) => item !== value);
      dispatch(setFilterValue({ name, value: data as [] }));
    }
    // dispatch(setFilterValue({ name, value }));
  };

  console.log(filterValue, "-------->");

  return (
    <>
      <div className="filter">
        <header>
          <h2>Filter</h2>
        </header>
        <main className="filter-content">
          <section className="filter-content-section">
            <h4 className="filter-content-title">Location :</h4>
            <select
              name="location"
              id="location"
              onChange={setFormValue}
              value={filterValue.location}
            >
              <option value="">select..</option>
              {location.map((item) => (
                <option value={item.id}>{item.name}</option>
              ))}
            </select>
          </section>
          <section className="filter-content-section">
            <h4 className="filter-content-title">Body Type :</h4>
            <select
              name="bodyType"
              id="bodyType"
              onChange={setFormValue}
              value={filterValue.bodyType}
            >
              <option value="">select..</option>
              {bodyType.map((item) => (
                <option value={item.id}>{item.name}</option>
              ))}
            </select>
          </section>
          <section>
            <h4 className="filter-content-title">Model :</h4>
            {model.map((item) => (
              <>
                <input
                  type="checkbox"
                  id="modelName"
                  name="modelName"
                  value={item.id}
                  onChange={setCheckBoxValue}
                  checked={filterValue.modelName.some((o) => o === item.id)}
                />
                <label htmlFor={item.id}> {item.name}</label>
              </>
            ))}
          </section>
          <section>
            <h4 className="filter-content-title">Owners :</h4>
            {owners.map((item) => (
              <>
                <div>
                  <input
                    type="radio"
                    id={item.id}
                    name="owner"
                    value={item.id}
                    checked={item?.id === filterValue.owner}
                    onChange={setFormValue}
                  />
                  <label htmlFor={item.id}>{item.name}</label>
                </div>
              </>
            ))}
          </section>
          <section>
            <h4 className="filter-content-title">Fuel Type :</h4>
            {fuelType.map((item) => (
              <>
                <div>
                  <input
                    type="radio"
                    id={item.id}
                    name="fuelType"
                    value={item.id}
                    checked={item?.id === filterValue.fuelType}
                    onChange={setFormValue}
                  />
                  <label htmlFor={item.id}>{item.name}</label>
                </div>
              </>
            ))}
          </section>
          <section>
            <h4 className="filter-content-title">Transmission :</h4>
            {transmission.map((item) => (
              <>
                <div>
                  <input
                    type="radio"
                    id={item.id}
                    name="transmission"
                    value={item.id}
                    checked={item?.id === filterValue.transmission}
                    onChange={setFormValue}
                  />
                  <label htmlFor={item.id}>{item.name}</label>
                </div>
              </>
            ))}
          </section>
        </main>
        <footer className="filter-btn-group">
          <button type="submit" className="btn-submit" onClick={searchData}>
            search
          </button>
          <button type="button" className="btn-close" onClick={clearData}>
            Reset
          </button>
        </footer>
      </div>
      {editFlag && <EditForm />}
      {tableData && tableData.length === 0 ? (
        <div className="nodata">No data Found!</div>
      ) : (
        <Table tableData={tableData} />
      )}
    </>
  );
};

export default CarList;
