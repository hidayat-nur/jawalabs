import { Pool } from 'pg';
import * as dotenv from 'dotenv';
dotenv.config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
});

async function main() {
    const client = await pool.connect();

    try {
        console.log('Creating database tables...');

        await client.query(`
      CREATE TABLE IF NOT EXISTS CompanyProfile (
        id SERIAL PRIMARY KEY,
        companyName VARCHAR(255) NOT NULL,
        tagline VARCHAR(255) NOT NULL,
        contactEmail VARCHAR(255) NOT NULL,
        aboutUs TEXT NOT NULL
      );
    `);

        await client.query(`
      CREATE TABLE IF NOT EXISTS Projects (
        id VARCHAR(255) PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        slug VARCHAR(255) UNIQUE NOT NULL,
        shortDescription TEXT NOT NULL,
        fullDescription TEXT NOT NULL,
        iconUrl VARCHAR(255) NOT NULL,
        platform VARCHAR(50) NOT NULL,
        playStoreUrl VARCHAR(500),
        appStoreUrl VARCHAR(500),
        privacyPolicy TEXT NOT NULL,
        createdAt TIMESTAMP NOT NULL,
        isFeatured BOOLEAN DEFAULT FALSE
      );
    `);

        await client.query(`
      CREATE TABLE IF NOT EXISTS ProjectScreenshots (
        id SERIAL PRIMARY KEY,
        projectId VARCHAR(255) REFERENCES Projects(id) ON DELETE CASCADE,
        imageUrl VARCHAR(500) NOT NULL
      );
    `);

        // Insert mock data if empty
        const checkCompany = await client.query('SELECT * FROM CompanyProfile LIMIT 1');
        if (checkCompany.rowCount === 0) {
            await client.query(`
        INSERT INTO CompanyProfile (companyName, tagline, contactEmail, aboutUs)
        VALUES (
          'Jawalabs', 
          'Creating useful and entertaining mobile applications.', 
          'hello@jawalabs.com', 
          'We are a dedicated team of engineers and designers building engaging applications for Android and iOS. Our mission is to build apps that improve daily life and entertain millions of users worldwide.'
        )
      `);
        }

        const checkProjects = await client.query('SELECT * FROM Projects LIMIT 1');
        if (checkProjects.rowCount === 0) {
            // Insert OmniConvert
            const dateNow = new Date().toISOString();
            await client.query(`
        INSERT INTO Projects (id, title, slug, shortDescription, fullDescription, iconUrl, platform, playStoreUrl, privacyPolicy, createdAt, isFeatured)
        VALUES (
          'p1', 
          'OmniConvert', 
          'omniconvert', 
          'The ultimate conversion tool for all units.', 
          'OmniConvert allows you to seamlessly convert between currencies, measurements, weights, and more using an intuitive brutalist-inspired UI.', 
          'https://placehold.co/150x150/000000/00FFFF/png?text=OC', 
          'Android', 
          'https://play.google.com/store/apps/details?id=com.jawalabs.omniconvert', 
          'This is the privacy policy for OmniConvert. We do not collect or share any personal identifying information without explicit consent.', 
          $1, 
          TRUE
        )
      `, [dateNow]);

            await client.query(`
        INSERT INTO ProjectScreenshots (projectId, imageUrl)
        VALUES 
          ('p1', 'https://placehold.co/300x600/1E1E1E/00FFFF/png?text=Home'),
          ('p1', 'https://placehold.co/300x600/1E1E1E/00FFFF/png?text=Convert')
      `);

            // Insert Secure Vault
            await client.query(`
        INSERT INTO Projects (id, title, slug, shortDescription, fullDescription, iconUrl, platform, playStoreUrl, appStoreUrl, privacyPolicy, createdAt, isFeatured)
        VALUES (
          'p2', 
          'Secure Vault Calculator', 
          'secure-vault', 
          'Hide your photos behind a functional calculator.', 
          'A private vault secured by a PIN that looks like a normal calculator. Safely store explicit or personal media files completely hidden from prying eyes.', 
          'https://placehold.co/150x150/000000/FF00FF/png?text=SV', 
          'Both', 
          'https://play.google.com/store/apps/details?id=com.jawalabs.securevault', 
          'https://apps.apple.com/us/app/secure-vault/id0000000', 
          'Secure Vault Calculator respects user privacy. Media stored in the vault remains local and is encrypted on-device. No cloud backups are created unless explicitly enabled.', 
          $1, 
          TRUE
        )
      `, [dateNow]);

            await client.query(`
        INSERT INTO ProjectScreenshots (projectId, imageUrl)
        VALUES 
          ('p2', 'https://placehold.co/300x600/1E1E1E/FF00FF/png?text=Calc'),
          ('p2', 'https://placehold.co/300x600/1E1E1E/FF00FF/png?text=Vault')
      `);
        }

        console.log('Database seeded successfully!');
    } catch (error) {
        console.error('Error seeding database:', error);
    } finally {
        client.release();
    }
}

main()
    .then(() => process.exit(0))
    .catch((e) => {
        console.error(e);
        process.exit(1);
    });
