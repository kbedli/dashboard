import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import React from "react";
import Sidebar from "./Sidebar";

describe("Sidebar", () => {
  test("renders without errors", () => {
    render(<Sidebar />);
    const sidebarDiv = screen.getByTestId("sidebar-div");
    const photoDiv = screen.getByTestId("photo");
    const nameH3 = screen.getByTestId("name");
    const emailP = screen.getByTestId("email");
    expect(sidebarDiv).toBeInTheDocument();
    expect(photoDiv).toBeInTheDocument();
    expect(nameH3).toBeInTheDocument();
    expect(emailP).toBeInTheDocument();
  });

  test("contains correct text content", () => {
    render(<Sidebar />);
    const nameH3 = screen.getByTestId("name");
    const emailP = screen.getByTestId("email");
    expect(nameH3).toHaveTextContent("Admin");
    expect(emailP).toHaveTextContent("kbedlinska@gmail.com");
  });

  test("contains correct CSS classes", () => {
    render(<Sidebar />);
    const sidebarDiv = screen.getByTestId("sidebar-div");
    const photoDiv = screen.getByTestId("photo");
    const nameH3 = screen.getByTestId("name");
    const emailP = screen.getByTestId("email");
    expect(sidebarDiv).toHaveClass("sidebar-div");
    expect(photoDiv).toHaveClass("photo");
    expect(nameH3).toHaveClass("name");
    expect(emailP).toHaveClass("email");
  });
});
