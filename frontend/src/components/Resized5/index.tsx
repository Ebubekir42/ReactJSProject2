import React, { useState, useRef, useEffect } from "react";
import { ResizableBox } from "react-resizable";
import "react-resizable/css/styles.css";

type Column = {
  id: string;
  label: string;
  minWidth: number; // px
};

const Resized5: React.FC = () => {
  const [columns, setColumns] = useState<Column[]>([
    { id: "col1", label: "Column 1",  minWidth: 100},
    { id: "col2", label: "Column 2",  minWidth: 100},
    { id: "col3", label: "Column 3",  minWidth: 100},
    { id: "col4", label: "Column 4",  minWidth: 100},
  ]);

  const [filters1, setFilters1] = useState<string[]>([]);
  const [filters2, setFilters2] = useState<string[]>([]);
  const [dropdownVisible, setDropdownVisible] = useState<string | null>(null);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });
  const filterIconRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const availableFilters1 = ["BEKLEMEDE", "ONAYLANDI", "İPTAL", "REDDEDİLDİ"];
  const availableFilters2 = ["Okuma", "Yazma"];

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

  const handleCheckboxChange1 = (filter: string, checked: boolean) => {
    if (filter === "Tümünü Seç") {
      setFilters1(checked ? [...availableFilters1] : []);
    } else {
      setFilters1((prevFilters) =>
        checked
          ? [...prevFilters, filter]
          : prevFilters.filter((f) => f !== filter)
      );
    }
  };

  const handleCheckboxChange2 = (filter: string, checked: boolean) => {
    if (filter === "Tümünü Seç") {
      setFilters2(checked ? [...availableFilters2] : []);
    } else {
      setFilters2((prevFilters) =>
        checked
          ? [...prevFilters, filter]
          : prevFilters.filter((f) => f !== filter)
      );
    }
  };

  const isAllSelected1 = filters1.length === availableFilters1.length;
  const isAllSelected2 = filters2.length === availableFilters2.length;

  const handleOutsideClick = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node) &&
      !Object.values(filterIconRefs.current).some((ref) =>
        ref?.contains(event.target as Node)
      )
    ) {
      setDropdownVisible(null);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <div style={{ overflowX: "auto", border: "1px solid #ccc" }}>
      <table style={{ width: "100%", borderCollapse: "collapse", tableLayout: "auto" }}>
        <thead>
          <tr style={{ backgroundColor: "#e0e0e0" }}>
            {columns.map((col) => (
              <th
                key={col.id}
                style={{
                  position: "relative",
                  padding: "8px 40px 8px 8px",
                  minWidth: `${col.minWidth}px`,
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  borderRight: "1px solid #ccc",
                  textAlign: "left",
                }}
              >
                {col.label}
                {/* Filtre ikonu */}
                <span
                  style={{
                    position: "absolute",
                    top: "50%",
                    right: "24px",
                    transform: "translateY(-50%)",
                    cursor: "pointer",
                  }}
                >
                  <svg
                    width={16}
                    height={16}
                    fill="#555"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                  >
                    <path d="M3.9 54.9C10.5 40.9 24.5 32 40 32l432 0c15.5 0 29.5 8.9 36.1 22.9s4.6 30.5-5.2 42.5L320 320.9 320 448c0 12.1-6.8 23.2-17.7 28.6s-23.8 4.3-33.5-3l-64-48c-8.1-6-12.8-15.5-12.8-25.6l0-79.1L9 97.3C-.7 85.4-2.8 68.8 3.9 54.9z" />
                  </svg>
                </span>

                {/* Sıralama ikonu */}
                <span
                  style={{
                    position: "absolute",
                    top: "50%",
                    right: "4px",
                    transform: "translateY(-50%)",
                    cursor: "pointer",
                  }}
                >
                  <svg
                    width={10}
                    height={10}
                    fill="#555"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 320 512"
                  >
                    <path d="M160 144L32 272h256L160 144zM160 368l128-128H32l128 128z" />
                  </svg>
                </span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {[1, 2, 3].map((rowIndex) => (
            <tr key={rowIndex}>
              {columns.map((col) => (
                <td
                  key={col.id}
                  style={{
                    padding: "8px",
                    minWidth: `${col.minWidth}px`,
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    borderRight: "1px solid #ccc",
                    borderBottom: "1px solid #ccc",
                  }}
                >
                  Row {rowIndex + 1} - {col.label}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Resized5;