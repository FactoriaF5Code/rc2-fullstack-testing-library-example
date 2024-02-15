import { fireEvent, render, screen } from "@testing-library/react";
import { test, beforeAll, afterAll } from "vitest";
import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import App from "../App";

const server = setupServer(
    // capture "GET /greeting" requests
    http.get('http://localhost:8080/books?q=Harry', () => {
        // respond using a mocked JSON body
        return HttpResponse.json({
            results: [
                { title: "Harry Potter y la Piedra Filosofal" },
                { title: "Harry Potter y el Prisionero de Azkaban" },
                { title: "Harry Potter y la Cámara de los Secretos" },
            ]
        })
    })
);

beforeAll(() => {
    server.listen();
});

afterAll(() => {
    server.close();
});



test("El panel no muestra mensaje al principio", () => {
    render(<App />);

    expect(screen.getByPlaceholderText(/Buscar/i)).toBeInTheDocument();
});

test("Si introducimos una búsqueda nos muestra los resultados encontrados", async () => {
    render(<App />);
    const searchBar = screen.getByPlaceholderText(/Buscar/i);

    fireEvent.change(searchBar, { target: { value: "Harry" } });

    expect(await screen.findByText(/Harry Potter y la Piedra Filosofal/)).toBeInTheDocument();
    expect(screen.getByText(/Harry Potter y el Prisionero de Azkaban/)).toBeInTheDocument();
    expect(screen.getByText(/Harry Potter y la Cámara de los Secretos/)).toBeInTheDocument();
});