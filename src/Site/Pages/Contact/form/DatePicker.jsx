import DatePicker from "react-date-picker";
import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";
import "./style/DatePicker.css";
import { useState } from "react";

function DatePickerInput({ register, name, label, errors, defaultData, setValue }) {
  try {
    const [date, setDate] = useState(defaultData[name] ? defaultData[name] : new Date().toISOString());

    const handleChange = (value) => {
      setValue(name, value);
      setDate(value);
    };

    return (
      <>
        <div className="form-input-date flex flex-col gap-[10px] items-center">
          <label htmlFor={name}>{label}</label>
          <input type={"date"} id={name} {...register(name)} className="real-input" />
          <DatePicker
            shouldCloseCalendar={() => {
              return false;
            }}
            onChange={handleChange}
            value={date}
            isOpen={true}
            closeCalendar={false}
          />
          {errors[name] ? <span>{errors[name].message}</span> : null}
        </div>
      </>
    );
  } catch (err) {
    console.log(err);
  }
}

export default DatePickerInput;
