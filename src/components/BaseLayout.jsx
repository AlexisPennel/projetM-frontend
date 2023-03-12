import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import ScrollToTop from "./ScrollToTop";

const BaseLayout = () => {
    return (
        <>
            <ScrollToTop />
            <main>
                <Outlet />
            </main>
            <Footer />
        </>
    )
};

export default BaseLayout;