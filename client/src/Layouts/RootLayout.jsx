import { Outlet } from "react-router-dom";

import Header from "../components/Header";

export default function RootLayout() {
    return(
        <>
            <header>
                <Header />
            </header>

            <main>
                <Outlet />
            </main>
        </>
    )
}