import React from "react";

interface JsonViewerProps {
  data: any;
}

const JsonViewer: React.FC<JsonViewerProps> = ({ data }) => {
  const renderJson = (
    key: string | null,
    value: any,
    level: number = 0
  ): JSX.Element => {
    if (Array.isArray(value)) {
      return (
        <div key={key || "array"} style={{ paddingLeft: `${level * 20}px` }}>
          {key && (
            <p>
              <strong>{key}:</strong>
            </p>
          )}
          <ul>
            {value.map((item, index) => (
              <li key={index}>{renderJson(null, item, level + 1)}</li>
            ))}
          </ul>
        </div>
      );
    } else if (typeof value === "object" && value !== null) {
      return (
        <div key={key || "object"} style={{ paddingLeft: `${level * 20}px` }}>
          {key && (
            <p>
              <strong>{key}:</strong>
            </p>
          )}
          <div>
            {Object.entries(value).map(([nestedKey, nestedValue]) =>
              renderJson(nestedKey, nestedValue, level + 1)
            )}
          </div>
        </div>
      );
    } else {
      return (
        <p key={key || "primitive"} style={{ paddingLeft: `${level * 20}px` }}>
          <strong>{key}:</strong> {String(value)}
        </p>
      );
    }
  };

  return (
    <div>
      {Object.entries(data).map(([key, value]) => renderJson(key, value))}
    </div>
  );
};

export default JsonViewer;
