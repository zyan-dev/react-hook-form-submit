import React, { useState } from "react";
import ReactDOM from "react-dom";
import { useForm, Controller } from "react-hook-form";
import ReactSelect from "react-select";
import {
  TextField,
  Checkbox,
  Select,
  MenuItem,
  Switch,
  RadioGroup,
  FormControlLabel,
  ThemeProvider,
  Radio,
  createMuiTheme
} from "@material-ui/core";

import "./styles.css";

let renderCount = 0;

const theme = createMuiTheme({
  palette: {
    type: "dark"
  }
});

const options = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" }
];

const defaultValues = {
  Native: "",
  TextField: "",
  Select: "",
  ReactSelect: "",
  Checkbox: false,
  switch: false,
  RadioGroup: ""
};

function App() {
  const { handleSubmit, register, reset, control } = useForm({ defaultValues });
  const [data, setData] = useState(null);
  renderCount++;

  return (
    <ThemeProvider theme={theme}>
      <form onSubmit={handleSubmit(data => setData(data))}>
        <h1>React Hook Form Input</h1>
        <p>React Hook Form work with controlled component.</p>
        <span className="counter">Render Count: {renderCount}</span>
        <div className="container">
          <section>
            <label>Native Input:</label>
            <input name="Native" ref={register} />
          </section>

          <section>
            <label>MUI Checkbox</label>
            <Controller
              as={<Checkbox />}
              name="Checkbox"
              type="checkbox"
              control={control}
            />
          </section>

          <section>
            <label>Radio Group</label>
            <Controller
              as={
                <RadioGroup aria-label="gender" name="gender1">
                  <FormControlLabel
                    value="female"
                    control={<Radio />}
                    label="Female"
                  />
                  <FormControlLabel
                    value="male"
                    control={<Radio />}
                    label="Male"
                  />
                </RadioGroup>
              }
              name="RadioGroup"
              control={control}
            />
          </section>

          <section>
            <label>MUI TextField</label>
            <Controller as={<TextField />} name="TextField" control={control} />
          </section>

          <section>
            <label>MUI Select</label>
            <Controller
              as={
                <Select>
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              }
              name="Select"
              control={control}
            />
          </section>

          <section>
            <label>MUI Switch</label>
            <Controller
              as={<Switch value="checkedA" />}
              type="checkbox"
              name="switch"
              control={control}
            />
          </section>

          <section>
            <label>React Select</label>
            <Controller
              as={<ReactSelect />}
              options={options}
              name="ReactSelect"
              isClearable
              control={control}
              onChange={([selected]) => {
                return { value: selected };
              }}
            />
          </section>
        </div>

        {data && (
          <pre style={{ textAlign: "left", color: "white" }}>
            {JSON.stringify(data, null, 2)}
          </pre>
        )}

        <button
          type="button"
          onClick={() => {
            reset(defaultValues);
          }}
        >
          Reset Form
        </button>
        <button>submit</button>
      </form>
    </ThemeProvider>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
