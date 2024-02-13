import { fireEvent, render, screen } from "@testing-library/react";
import { test } from "vitest";
import App from "../App";

import { rest } from 'msw'
import { setupServer } from 'msw/node'

const server = setupServer(
    // capture "GET /greeting" requests
    rest.get('/greeting', (req, res, ctx) => {
        // respond using a mocked JSON body
        return res(ctx.json({ greeting: 'hello there' }))
    }),
);

beforeAll()



test("El panel no muestra mensaje al principio", () => {
    render(<App />);

    expect(screen.getByPlaceholderText(/Buscar/i)).toBeInTheDocument();
});


test("Si introducimos una búsqueda nos muestra los resultados encontrados", () => {
    render(<App />);
    const searchBar = screen.getByPlaceholderText(/Buscar/i);

    fireEvent.change(searchBar, { target: { value: "Harry" } });

    expect(screen.getByText(/Harry Potter y la Piedra Filosofal/)).toBeInTheDocument();
    expect(screen.getByText(/Harry Potter y el Prisionero de Azkaban/)).toBeInTheDocument();
    expect(screen.getByText(/Harry Potter y la Cámara de los Secretos/)).toBeInTheDocument();
});