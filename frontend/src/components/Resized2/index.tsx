import React, { useState } from "react";
import { ResizableBox } from "react-resizable";
import "react-resizable/css/styles.css";

type Column = {
  id: string;
  label: string;
  width: number; // px
};

const Resized2 = () => {
  const [columns, setColumns] = useState<Column[]>([
    { id: "col1", label: "Very Long Column Header 1", width: 150 },
    { id: "col2", label: "Another Long Column Header 2", width: 200 },
    { id: "col3", label: "Column 3", width: 250 },
  ]);

  const handleResize = (id: string, newWidth: number) => {
    setColumns((prevColumns) =>
      prevColumns.map((col) =>
        col.id === id ? { ...col, width: newWidth } : col
      )
    );
  };

  return (
    <div
      style={{
        overflowX: "auto", // Yatay kaydırma
        border: "1px solid #ccc",
        maxWidth: "100%", // Tablo genişliğini kapsayıcıya sınırla
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", minWidth: "fit-content" }}>
        {/* Header */}
        <div style={{ display: "flex", backgroundColor: "#f5f5f5" }}>
          {columns.map((column) => (
            <ResizableBox
              key={column.id}
              width={column.width}
              height={40}
              axis="x"
              resizeHandles={["e"]}
              minConstraints={[50, 40]}
              maxConstraints={[500, 40]}
              onResizeStop={(e, data) => handleResize(column.id, data.size.width)}
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
                  justifyContent: "flex-start",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  backgroundColor: "#e0e0e0",
                  // cursor: "col-resize",
                }}
                title={column.label}
              >
                {column.label}

                <svg className="position-absolute end-0 pe-3" width={20} height={20} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M3.9 54.9C10.5 40.9 24.5 32 40 32l432 0c15.5 0 29.5 8.9 36.1 22.9s4.6 30.5-5.2 42.5L320 320.9 320 448c0 12.1-6.8 23.2-17.7 28.6s-23.8 4.3-33.5-3l-64-48c-8.1-6-12.8-15.5-12.8-25.6l0-79.1L9 97.3C-.7 85.4-2.8 68.8 3.9 54.9z"/></svg>
              </div>
            </ResizableBox>
          ))}
        </div>
        {/* Body */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          {[1, 2, 3].map((row, rowIndex) => (
            <div key={rowIndex} style={{ display: "flex" }}>
              {columns.map((column) => (
                <div
                  key={column.id}
                  style={{
                    width: column.width,
                    padding: "8px",
                    boxSizing: "border-box",
                    borderRight: "1px solid #ccc",
                    borderBottom: "1px solid #ccc",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                  title={`Row ${row} - ${column.label}`}
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

export default Resized2;
