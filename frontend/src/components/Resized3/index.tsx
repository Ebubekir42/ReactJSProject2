import React, { useState } from "react";
import { ResizableBox } from "react-resizable";
import "react-resizable/css/styles.css";

type Column = {
  id: string;
  label: string;
  width: number;
  minWidth: number;
  maxWidth: number;
};

const Resized3: React.FC = () => {
  const tableWidth = 800; // Tablo genişliği
  const initialColumns: Column[] = [
    { id: "col1", label: "Column 1", width: 200, minWidth: 100, maxWidth: 300 },
    { id: "col2", label: "Column 2", width: 200, minWidth: 100, maxWidth: 300 },
    { id: "col3", label: "Column 3", width: 200, minWidth: 100, maxWidth: 300 },
    { id: "col4", label: "Column 4", width: 200, minWidth: 100, maxWidth: 300 },
  ];

  const [columns, setColumns] = useState<Column[]>(initialColumns);

  const totalColumnWidth = columns.reduce((sum, col) => sum + col.width, 0);

  // Genişlik taşmasını engelle
  const adjustedColumns = totalColumnWidth > tableWidth 
    ? columns.map((col) => ({
        ...col,
        width: (col.width / totalColumnWidth) * tableWidth,
      }))
    : columns;

  return (
    <div
      style={{
        overflowX: "hidden",
        border: "1px solid #ccc",
        maxWidth: `${tableWidth}px`,
        position: "relative",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column" }}>
        {/* Header */}
        <div style={{ display: "flex", backgroundColor: "rgb(224,224,224)" }}>
          {adjustedColumns.map((column) => (
            <ResizableBox
              key={column.id}
              width={column.width}
              height={40}
              axis="x"
              resizeHandles={["e"]}
              minConstraints={[column.minWidth, 40]}
              maxConstraints={[column.maxWidth, 40]}
              onResizeStop={(e, data) =>
                setColumns((prevColumns) =>
                  prevColumns.map((col) =>
                    col.id === column.id ? { ...col, width: data.size.width } : col
                  )
                )
              }
            >
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  padding: "8px",
                  boxSizing: "border-box",
                  borderRight: "1px solid #ccc",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  backgroundColor: "#e0e0e0",
                }}
              >
                {column.label}
              </div>
            </ResizableBox>
          ))}
        </div>

        {/* Body */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          {[1, 2, 3].map((row, rowIndex) => (
            <div
              key={rowIndex}
              style={{
                display: "flex",
                borderBottom: "1px solid rgb(204,204,204)",
              }}
            >
              {adjustedColumns.map((column) => (
                <div
                  key={column.id}
                  style={{
                    width: column.width,
                    padding: "8px",
                    boxSizing: "border-box",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  Row {row} - {column.label}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Resized3;
