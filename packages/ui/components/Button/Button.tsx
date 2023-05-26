"use client";

import * as React from "react";
import { Button as B } from "antd";

export const Button = () => {
  return <B onClick={() => alert("boop")}>Boo</B>;
};
