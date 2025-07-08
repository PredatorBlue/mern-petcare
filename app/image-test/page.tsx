import Image from "next/image"

export default function ImageTestPage() {
  return (
    <div className="p-8 space-y-8">
      <h1 className="text-2xl font-bold">Image Loading Test</h1>
      
      <div>
        <h2 className="text-lg font-semibold mb-4">Test 1: Hero Background Image</h2>
        <div className="relative w-full h-64 bg-gray-200 rounded-lg overflow-hidden">
          <Image
            src="/images/hero-bg.jpg"
            alt="Hero background"
            fill
            className="object-cover"
          />
        </div>
      </div>

      <div>
        <h2 className="text-lg font-semibold mb-4">Test 2: Pet Images with width/height</h2>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <Image
              src="/images/pets/buddy.jpg"
              alt="Buddy"
              width={200}
              height={150}
              className="w-full h-32 object-cover rounded"
            />
            <p className="text-sm text-gray-600 mt-2">Buddy</p>
          </div>
          <div>
            <Image
              src="/images/pets/luna.jpg"
              alt="Luna"
              width={200}
              height={150}
              className="w-full h-32 object-cover rounded"
            />
            <p className="text-sm text-gray-600 mt-2">Luna</p>
          </div>
          <div>
            <Image
              src="/images/pets/charlie.jpg"
              alt="Charlie"
              width={200}
              height={150}
              className="w-full h-32 object-cover rounded"
            />
            <p className="text-sm text-gray-600 mt-2">Charlie</p>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-lg font-semibold mb-4">Test 3: Regular img tag (for comparison)</h2>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <img
              src="/images/pets/buddy.jpg"
              alt="Buddy regular"
              className="w-full h-32 object-cover rounded"
            />
            <p className="text-sm text-gray-600 mt-2">Buddy (regular img)</p>
          </div>
          <div>
            <img
              src="/images/pets/luna.jpg"
              alt="Luna regular"
              className="w-full h-32 object-cover rounded"
            />
            <p className="text-sm text-gray-600 mt-2">Luna (regular img)</p>
          </div>
          <div>
            <img
              src="/images/pets/charlie.jpg"
              alt="Charlie regular"
              className="w-full h-32 object-cover rounded"
            />
            <p className="text-sm text-gray-600 mt-2">Charlie (regular img)</p>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-lg font-semibold mb-4">Test 4: Non-existent image (should show error)</h2>
        <div className="relative w-full h-32 bg-gray-200 rounded-lg overflow-hidden">
          <Image
            src="/images/non-existent.jpg"
            alt="Non-existent"
            fill
            className="object-cover"
          />
        </div>
      </div>

      <div className="bg-blue-50 p-4 rounded-lg">
        <h3 className="font-semibold mb-2">Debugging Information:</h3>
        <ul className="text-sm space-y-1">
          <li>• Images should be in: <code>public/images/</code></li>
          <li>• Hero image: <code>/images/hero-bg.jpg</code></li>
          <li>• Pet images: <code>/images/pets/buddy.jpg</code>, etc.</li>
          <li>• Next.js config: <code>unoptimized: true</code></li>
        </ul>
      </div>
    </div>
  )
} 