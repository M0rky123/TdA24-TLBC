"use client";

import { useEffect, useState } from "react";

export function auth(token: string) {
  const [value, setValue] = useState(token);
  useEffect(() => {
    const stored = localStorage.getItem("token");
    setValue(stored ? JSON.parse(stored) : token);
  }, [token]);

  useEffect(() => {
    value && localStorage.setItem("token", JSON.stringify(value));
  }, [value]);

  const clear = () => {
    setValue("");
    localStorage.removeItem("token");
  };

  return [value, setValue, clear] as const;
}
