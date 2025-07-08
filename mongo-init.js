const { MongoClient } = require("mongodb")

// Function to initialize the database
async function initDB() {
  const uri = "your_mongodb_connection_string"
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true })

  try {
    await client.connect()
    const db = client.db("petcare")

    // Create database and user
    await db.createUser({
      user: "petcare_user",
      pwd: "petcare_password",
      roles: [
        {
          role: "readWrite",
          db: "petcare",
        },
      ],
    })

    // Create initial collections
    await db.createCollection("users")
    await db.createCollection("pets")
    await db.createCollection("shelters")
  } finally {
    await client.close()
  }
}

// Call the function to initialize the database
initDB().catch(console.error)
