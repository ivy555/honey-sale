import { useLayoutEffect } from "react";

const useDocumentTitle = (title) => {
  useLayoutEffect(() => {
    if (title) {
      document.title = title;
    } else {
      document.title = 'Honey-finder';
    }
  }, [title]);
};

export default useDocumentTitle;
