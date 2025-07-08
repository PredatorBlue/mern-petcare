export default function SimpleTestPage() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Simple Image Test</h1>
      
      <div className="space-y-4">
        <div>
          <h2 className="text-lg font-semibold mb-2">Regular img tag test:</h2>
          <img 
            src="/images/pets/buddy.jpg" 
            alt="Buddy" 
            className="w-32 h-32 object-cover rounded"
          />
        </div>
        
        <div>
          <h2 className="text-lg font-semibold mb-2">Hero image test:</h2>
          <img 
            src="/images/hero-bg.jpg" 
            alt="Hero" 
            className="w-full h-32 object-cover rounded"
          />
        </div>
        
        <div>
          <h2 className="text-lg font-semibold mb-2">Direct file test:</h2>
          <p>Try accessing these URLs directly in your browser:</p>
          <ul className="list-disc list-inside text-sm text-gray-600 mt-2">
            <li><a href="/images/pets/buddy.jpg" target="_blank" className="text-blue-600 hover:underline">/images/pets/buddy.jpg</a></li>
            <li><a href="/images/hero-bg.jpg" target="_blank" className="text-blue-600 hover:underline">/images/hero-bg.jpg</a></li>
            <li><a href="/images/pets/luna.jpg" target="_blank" className="text-blue-600 hover:underline">/images/pets/luna.jpg</a></li>
          </ul>
        </div>
      </div>
    </div>
  )
} 