import React, { useRef, useCallback } from "react";
import { Box, CircularProgress, SxProps, Theme } from "@mui/material";

interface ListProps<T> {
  data: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  keyExtractor?: (item: T, index: number) => string | number; // Unique Key Extractor
  loadMore?: () => Promise<void>;
  hasMore?: boolean;
  loader?: React.ReactNode;
  endMessage?: React.ReactNode;
  sx?: SxProps<Theme>;
  grid?: boolean;
  columns?: number;
}

export const CustomList = <T,>({
  data,
  renderItem,
  keyExtractor = (_, index) => index, // Default key extractor is the index
  loadMore,
  hasMore = false,
  loader = <CircularProgress />,
  endMessage = <Box>No more items</Box>,
  sx,
  grid = false, 
  columns = 3,
}: ListProps<T>) => {
  const observerRef = useRef<HTMLDivElement | null>(null);

  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const target = entries[0];
      if (target.isIntersecting && hasMore && loadMore) {
        loadMore();
      }
    },
    [hasMore, loadMore]
  );

  React.useEffect(() => {
    if (observerRef.current && loadMore) {
      const observer = new IntersectionObserver(handleObserver, {
        root: null,
        rootMargin: "100px",
        threshold: 0.1,
      });
      observer.observe(observerRef.current);
      return () => observer.disconnect();
    }
  }, [observerRef, loadMore, handleObserver]);

  return (
    <Box
      sx={{
        display: grid ? "grid" : "flex",
        flexDirection: grid ? undefined : "column",
        gridTemplateColumns: grid ? `repeat(${columns}, 1fr)` : undefined,
        gap: 2,
        ...sx,
      }}
    >
      {/* Render Items */}
      {data.map((item, index) => (
        <Box key={keyExtractor(item, index)}>{renderItem(item, index)}</Box>
      ))}

      {/* Infinite Scroll Loader */}
      {hasMore && (
        <Box
          ref={observerRef}
          sx={{ display: "flex", justifyContent: "center" }}
        >
          {loader}
        </Box>
      )}

      {/* End Message */}
      {!hasMore && endMessage}
    </Box>
  );
};
