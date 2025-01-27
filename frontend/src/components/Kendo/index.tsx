import React from "react";
import { Grid, GridColumn } from "@progress/kendo-react-grid";
import "@progress/kendo-theme-default/dist/all.css";
import { filterBy } from "@progress/kendo-data-query";
import { SvgIcon } from "@progress/kendo-react-common";

const HeaderWithIcon = (props: any) => {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
      <span>{props.title}</span>
      <SvgIcon
        style={{ marginLeft: "8px", cursor: "pointer" }}
        onClick={() => console.log(`Icon clicked for column: ${props.field}`)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
          width="16"
          height="16"
        >
          <path d="M3.9 54.9C10.5 40.9 24.5 32 40 32l432 0c15.5 0 29.5 8.9 36.1 22.9s4.6 30.5-5.2 42.5L320 320.9 320 448c0 12.1-6.8 23.2-17.7 28.6s-23.8 4.3-33.5-3l-64-48c-8.1-6-12.8-15.5-12.8-25.6l0-79.1L9 97.3C-.7 85.4-2.8 68.8 3.9 54.9z" />
        </svg>
      </SvgIcon>
    </div>
  );
};

const Kendo = () => {
  const data = [
    { id: 1, name: "John Doe", age: 25 },
    { id: 2, name: "Jane Doe", age: 28 },
    { id: 3, name: "Sam Smith", age: 30 },
  ];

  const [filter, setFilter] = React.useState<any>(null);

  return (
    <div>
      <Grid
        data={filter ? filterBy(data, filter) : data}
        style={{ height: "400px" }}
        filterable
        filter={filter}
        onFilterChange={(e) => setFilter(e.filter)}
      >
        <GridColumn
          field="id"
          title="ID"
          headerCell={HeaderWithIcon}
          filter="numeric"
        />
        <GridColumn
          field="name"
          title="Name"
          headerCell={HeaderWithIcon}
          filter="text"
        />
        <GridColumn
          field="age"
          title="Age"
          headerCell={HeaderWithIcon}
          filter="numeric"
        />
      </Grid>
    </div>
  );
};

export default Kendo;
