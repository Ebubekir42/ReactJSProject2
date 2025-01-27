import React, { useState, useRef, useEffect } from "react";
import { ResizableBox } from "react-resizable";
import "react-resizable/css/styles.css";

type Column = {
  id: string;
  label: string;
  width: number; // px
  minWidth: number; // px
  maxWidth: number; // px
};

const Resized4: React.FC = () => {
  const [columns, setColumns] = useState<Column[]>([
    { id: "col1", label: "Column 1", width: 150, minWidth: 100, maxWidth: 300 },
    { id: "col2", label: "Column 2", width: 200, minWidth: 100, maxWidth: 300 },
    { id: "col3", label: "Column 3", width: 200, minWidth: 100, maxWidth: 300 },
    { id: "col4", label: "Column 4", width: 250, minWidth: 100, maxWidth: 300 },
  ]);

  const [filters, setFilter] = useState<string[][]>([["Filter1", "Filter2", "Filter3", "Filter4"], ["Filter5", "Filter6"]]);
  const [currentFilter, setCurrentFilter] = useState<string[]>([]);
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
      if(columnId === "col2") setCurrentFilter(filters[0]);
      if(columnId === "col4") setCurrentFilter(filters[1]);
      const rect = ref.getBoundingClientRect();
      setDropdownPosition({ top: rect.bottom, left: rect.left });
      setDropdownVisible((prev) => (prev === columnId ? null : columnId));
    }

  };

  useEffect(() => {
    console.log(dropdownPosition);
  },[dropdownPosition])

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
    <>
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
        <div style={{ display: "flex", backgroundColor: "rgb(224,224,224)" }}>
          {columns.map((column) => (
            <ResizableBox
              key={column.id}
              width={column.width}
              height={40}
              axis="x"
              resizeHandles={["e"]}
              minConstraints={[column.minWidth, 40]}
              maxConstraints={[column.maxWidth, 40]}
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
                    // style={{
                    //   width: 16,
                    //   height: 16,
                    //   backgroundColor: "blue",
                    //   borderRadius: "50%",
                    //   cursor: "pointer",
                    //   position: "absolute",
                    //   right: 20,
                    // }}
                    onClick={() => handleFilterClick(column.id)}
                  >
<svg width={20} height={20} fill="#555" style={{right: 20}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
<path d="M3.9 54.9C10.5 40.9 24.5 32 40 32l432 0c15.5 0 29.5 8.9 36.1 22.9s4.6 30.5-5.2 42.5L320 320.9 320 448c0 12.1-6.8 23.2-17.7 28.6s-23.8 4.3-33.5-3l-64-48c-8.1-6-12.8-15.5-12.8-25.6l0-79.1L9 97.3C-.7 85.4-2.8 68.8 3.9 54.9z"/>
</svg>

                  </div>
                )}
              </div>
            </ResizableBox>
          ))}
        </div>
        {/* Body */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          {[1, 2, 3].map((row, rowIndex) => (
            <div key={rowIndex} style={{ display: "flex", borderBottom: "1px solid rgb(204,204,204)" }}>
              {columns.map((column) => (
                <div
                  key={column.id}
                  style={{
                    width: column.width,
                    padding: "8px",
                    boxSizing: "border-box",
                    borderRight: "1px solid #ccc",
                    // borderBottom: "1px solid #ccc",
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
      
    </div>
    {dropdownVisible && (
      <div
        style={{
          position: "absolute",
          top: dropdownPosition.top + window.scrollY,
          left: dropdownPosition.left,
          backgroundColor: "white",
          boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
          border: "1px solid #ccc",
          padding: "8px",
          zIndex: 1000,
        }}
      >
        {
          currentFilter.map((filter, index) => (
            <div key={index} style={{ marginBottom: 8 }}>
              {filter}
            </div>
          ))
        }
      </div>
    )}
    </>
  );
};

export default Resized4;
