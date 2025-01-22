import React, { useState, useRef, useEffect } from "react";
import { ResizableBox } from "react-resizable";
import "react-resizable/css/styles.css";

type Column = {
  id: string;
  label: string;
  width: number; // px
};

const Resized4: React.FC = () => {
  const [columns, setColumns] = useState<Column[]>([
    { id: "col1", label: "Column 1", width: 150 },
    { id: "col2", label: "Column 2", width: 200 },
    { id: "col3", label: "Column 3", width: 200 },
    { id: "col4", label: "Column 4", width: 250 },
  ]);

  const [dropdownVisible, setDropdownVisible] = useState<string | null>(null);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });
  const filterIconRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  const handleResize = (id: string, newWidth: number) => {
    setColumns((prevColumns) =>
      prevColumns.map((col) =>
        col.id === id ? { ...col, width: newWidth } : col
      )
    );
  };

  const handleFilterClick = (columnId: string) => {
    const ref = filterIconRefs.current[columnId];
    if (ref) {
      const rect = ref.getBoundingClientRect();
      setDropdownPosition({ top: rect.bottom, left: rect.left });
      setDropdownVisible((prev) => (prev === columnId ? null : columnId));
    }
  };

  const handleOutsideClick = (event: MouseEvent) => {
    if (
      Object.values(filterIconRefs.current).some(
        (ref) => ref && ref.contains(event.target as Node)
      )
    ) {
      return;
    }
    setDropdownVisible(null);
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <div
      style={{
        overflowX: "auto",
        border: "1px solid #ccc",
        maxWidth: "100%",
        position: "relative",
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
                  justifyContent: "space-between",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  backgroundColor: "#e0e0e0",
                }}
              >
                {column.label}
                {(column.id === "col2" || column.id === "col4") && (
                  <div
                    ref={(el) => (filterIconRefs.current[column.id] = el)}
                    style={{
                      width: 16,
                      height: 16,
                      backgroundColor: "blue",
                      borderRadius: "50%",
                      cursor: "pointer",
                      position: "absolute",
                      right: 8,
                    }}
                    onClick={() => handleFilterClick(column.id)}
                  ></div>
                )}
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
                >
                  Row {row} - {column.label}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
      {/* Dropdown */}
      {dropdownVisible && (
        <div
          style={{
            position: "absolute",
            top: dropdownPosition.top,
            left: dropdownPosition.left,
            backgroundColor: "white",
            boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
            border: "1px solid #ccc",
            padding: "8px",
            zIndex: 1000,
          }}
        >
          <div>Filter Option 1</div>
          <div>Filter Option 2</div>
          <div>Filter Option 3</div>
        </div>
      )}
    </div>
  );
};

export default Resized4;
