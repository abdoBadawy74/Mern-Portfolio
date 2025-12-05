import { Navbar } from '../components/layout/Navbar';
import { HeroSection } from '../components/sections/HeroSection';
import React, { StrictMode } from 'react'

export default function Home() {
    return (
        <div className="min-h-screen">
            <Navbar />
            <main>
                <HeroSection />
            </main>
        </div>
    );
}
