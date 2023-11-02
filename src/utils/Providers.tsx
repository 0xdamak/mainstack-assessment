"use client";

import React, { type ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import axios from "axios";

interface Props {
  children: ReactNode;
}
const queryClient = new QueryClient();

export function QueryProvider({ children }: Props): JSX.Element {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}

export default function AxiosProvider({ children }: Props): JSX.Element {
  axios.defaults.baseURL = process.env.NEXT_PUBLIC_BASE_URL;
  axios.defaults.headers.post["Content-Type"] = "application/json";
  return <>{children}</>;
}
