import { forwardRef, useImperativeHandle, useState } from "react";

const Togglable = forwardRef(({ children, buttonLabel }, refs) => {
  const [showContent, setShowContent] = useState(false);

  const toggleShowContent = () => {
    setShowContent(!showContent);
  };

  useImperativeHandle(refs, () => {
    return {
      toggleShowContent,
    };
  });

  return (
    <>
      {!showContent && (
        <button className="btn btn-primary" onClick={toggleShowContent}>{buttonLabel}</button>
      )}
      {showContent && (
        <div>
          <div className="mb-2">{children}</div>
          <button className="btn btn-secondary" onClick={toggleShowContent}>cancel</button>
        </div>
      )}
    </>
  );
});

Togglable.displayName = "Togglable";

export default Togglable;
