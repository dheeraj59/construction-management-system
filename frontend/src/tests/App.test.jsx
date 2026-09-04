import { render, screen } from "@testing-library/react";
import { describe, test, expect, vi } from "vitest";
import Projects from "../pages/projects";

describe("Projects", () => {
  test("displays project information", () => {
    const projects = [
      {
        id: 1,
        name: "ABC Building",
        client: "ABC Constructions",
        location: "Nalkheda",
        status: "In Progress",
        progress: 65,
        supervisor: "Raj Kumar",
      },
    ];

    render(
      <Projects
        projects={projects}
        onProjectsChange={vi.fn()}
        onProjectSelect={vi.fn()}
      />
    );

    expect(screen.getByText("Projects")).toBeInTheDocument();
    expect(screen.getByText("ABC Building")).toBeInTheDocument();
    expect(screen.getByText("ABC Constructions")).toBeInTheDocument();
    expect(screen.getByText("Nalkheda")).toBeInTheDocument();
    expect(screen.getByText("65%")).toBeInTheDocument();
  });
});