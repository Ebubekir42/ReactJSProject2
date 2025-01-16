import React, { useState } from "react";
import { Resizable, ResizableBox } from "react-resizable";
import "react-resizable/css/styles.css";

type Column = {
  name: string;
  label: string;
  width: number; // px
};

type MyProps = {
    defaultWidth: number;
  children: React.ReactNode;
}

const App: React.FC<MyProps> = ({defaultWidth, children}) => {
  const [columns, setColumns] = useState<Column[]>([
    { name: "col1", label: "Column 1", width: 250 },
    { name: "col2", label: "Column 2", width: 250 },
    { name: "col3", label: "Column 3", width: 250 },
  ]);

  const handleResize = (name: string, width: number) => {
    // setColumns((prevColumns) =>
    //   prevColumns.map((col) =>
    //     col.id === id ? { ...col, width: newWidth } : col
    //   )
    // );
    const updateColumns = [...columns];
    const foundColumnIndex = updateColumns.findIndex(({name: columnName}) => columnName === name);
    if(foundColumnIndex === -1)
        return;
    updateColumns[foundColumnIndex].width = Math.floor(width);
    setColumns(updateColumns);
  };

  const getColumnWidth = (name: string): number => {
    const foundColumn = columns.find(({name: columnName}) => columnName === name);
    if(foundColumn)
        return foundColumn.width;
    return defaultWidth;
  }

  return (
    <>
    <div className="p-4">
    <table>
        <thead className="text-left text-white">
            <tr>
                {columns.map(({name, label} : Column) => 
                <Resizable
                    key={name}
                    width={getColumnWidth(name)}
                    height={0}
                    handle = {<span className="absolute right-0 top-0 z-50 h-full w-2 cursor-col-resize bg-white "></span>}
                    onResize={(_, {size:{width}}) => handleResize(name,width)}
                    draggableOpts={{enableUserSelectHack: false}}
                    
                >
                    <th style={{width: getColumnWidth(name)}} className="relative overflow-hidden whitespace-nowrap border-0 bg-orange-600 px-6 py-1.5 text-black">
                        {label}
                    </th>

                </Resizable>)}
            </tr>
        </thead>
        <tbody>
            <tr className="bg-gray-300">
                <td>John</td>
                <td>Doe</td>
                <td>25</td>
            </tr>
        </tbody>
    </table>
    </div>

    </>
  );
};

export default App;
