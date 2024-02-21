"use client";

import { Pagination } from "@mui/material";
import React, { useEffect, useState } from "react";
import { getMetadata } from "../utils/fetch";

export default function Paging({ page, setPage }: { page: number; setPage: React.Dispatch<React.SetStateAction<number>> }) {
  const [pages, setPages] = useState<number>();

  useEffect(() => {
    getMetadata().then((data) => {
      setPages(Math.ceil(data.count / 8));
    });
  }, []);

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  return <Pagination count={pages} page={page} onChange={handleChange} size="large" style={{ margin: "0 auto" }} hidePrevButton hideNextButton />;
}
