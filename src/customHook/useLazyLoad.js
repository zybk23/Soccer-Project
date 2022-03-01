import { useEffect, useCallback } from "react";
import debounce from "lodash/debounce";
import { setData } from "../store/dataStore";
import { useDispatch, useSelector } from "react-redux";

const INTERSECTION_THRESHOLD = 5;
const LOAD_DELAY_MS = 100;

const useLazyLoad = ({ triggerRef, lazyBultenData, options }) => {
  const dispatch = useDispatch();
  const { currentPage, data } = useSelector((state) => state.dataSlice);

  const _handleEntry = async (entry) => {
    const boundingRect = entry.boundingClientRect;
    const intersectionRect = entry.intersectionRect;

    if (
      entry.isIntersecting &&
      intersectionRect.bottom - boundingRect.bottom <= INTERSECTION_THRESHOLD
    ) {
      const data = await lazyBultenData(currentPage);
      dispatch(setData(data));
    }
  };
  const handleEntry = debounce(_handleEntry, LOAD_DELAY_MS);

  const onIntersect = useCallback(
    (entries) => {
      handleEntry(entries[0]);
    },
    [handleEntry]
  );

  useEffect(() => {
    if (triggerRef.current) {
      const currentRef = triggerRef.current;
      const observer = new IntersectionObserver(onIntersect, options);

      observer.observe(currentRef);

      return () => {
        observer.disconnect();
      };
    }
  }, [triggerRef, onIntersect, options]);

  const returnedState = {
    currentPage,
    data,
  };

  return returnedState;
};

export default useLazyLoad;
