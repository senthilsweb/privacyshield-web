// src/components/landing-page.tsx
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export const LandingPage = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 px-4 md:px-6 lg:px-8">
        <div className="container mx-auto max-w-6xl">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Efficiency Unleashed
          </h1>
          <div className="text-3xl md:text-5xl font-semibold mb-8 bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
            Innovate, Iterate, Inspire
          </div>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-8">
          Craft stunning web and mobile applications effortlessly with TemplrJS, an open-source rapid development platform. Say goodbye to coding from scratch and embrace seamless building and deployment.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button size="lg" className="bg-primary hover:bg-primary/90">
              Get Started
            </Button>
            <Button size="lg" variant="outline">
              Explore Privacy Shield
            </Button>
          </div>
        </div>
      </section>

      {/* Feature Cards */}
      <section className="py-20 px-4 md:px-6 lg:px-8 bg-muted/50">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 h-60">
            <Card className="bg-gradient-to-br from-pink-500 to-rose-500">
              <CardHeader>
                <CardTitle className='text-white text-xl font-semibold'>My Projects</CardTitle>
                <CardDescription className='text-white'>
                  &nbsp;
                </CardDescription>
              </CardHeader>
              <CardContent className='text-white'>
              <p className='pb-4'>Dive into the diverse array of projects using our privacy shield technology.</p>
                <Button variant="secondary" className="w-full">
                  Explore Projects
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-purple-500 to-indigo-500">
              <CardHeader>
                <CardTitle className='text-white text-xl font-semibold'>Developer Resources</CardTitle>
                <CardDescription className='text-white'>
                &nbsp;
                </CardDescription>
              </CardHeader>
              <CardContent className='text-white'>
              <p className='pb-4'>Find comprehensive guides and resources to support your development journey..</p>
                <Button variant="secondary" className="w-full">
                  Access Resources
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-yellow-400 to-orange-500">
              <CardHeader>
                <CardTitle className='text-white text-xl font-semibold'>API Documentation</CardTitle>
                <CardDescription className='text-white'>
                &nbsp;
                </CardDescription>
              </CardHeader>
              <CardContent className='text-white'>
              <p className='pb-4'> Explore detailed API documentation for seamless integration.</p>
                <Button variant="secondary" className="w-full">
                  View Documentation
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};