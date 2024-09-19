import React from 'react'

export default function About() {
  return (
    <section className="py-12 bg-white px-2">
    <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 mb-8 md:mb-0">
            <h2 className="text-3xl font-bold mb-4">Acerca de nosotros</h2>
            <p className="text-gray-600 mb-4">
                Body text for your whole article is used. Add in a some clever
                text to show how a blog post page might look.
            </p>
            <p className="text-gray-600">
                Exercitation efficient emerging, niche market venture alpha
                scrum project leverage paradigm shift MVP focus burn rate
                validation. Burn rate alpha launch party product management
                venture responsive web design.
            </p>
        </div>
        <div className="md:w-1/2 md:pl-8">

            <img src="https://placehold.co/300x300" alt="About illustration" className="w-full max-w-md mx-auto" />
        </div>
    </div>
</section>
  )
}
