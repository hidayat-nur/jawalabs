# Database Schema (Reference Model)

Even if functioning on local static data temporarily, mapping out the relational schemas helps with implementing our Data Layer appropriately.

## Table: \`Apps\`
Represents the mobile applications developed by Jawalabs.

| Column | Type | Attributes | Description |
| :--- | :--- | :--- | :--- |
| \`id\` | UUID or String | PRIMARY KEY | Unique identifier for the app. |
| \`title\` | String | NOT NULL | The display name of the app. |
| \`slug\` | String | UNIQUE | Used for clean routing (e.g. \`/apps/my-cool-app\`). |
| \`short_description\` | String | | Brief summary for list views. |
| \`full_description\` | Text | | Complete informative text for the detail page. |
| \`icon_url\` | String | | Asset URL for the app icon image. |
| \`screenshots\` | Array<String> | | Asset URLs for in-app screenshots. |
| \`platform\` | Enum | 'Android' \| 'iOS' \| 'Both' | The specific platform the app was written natively for. |
| \`play_store_url\` | String | NULLABLE | Google Play Store direct link. |
| \`app_store_url\` | String | NULLABLE | iOS App Store direct link. |
| \`privacy_policy\` | Text | NOT NULL | The raw text or linked external file reference containing the privacy policy (critical for store compliance). |
| \`created_at\` | Timestamp | | Record creations date. |
| \`is_featured\` | Boolean | DEFAULT false | Flag to dictate if it appears on the Homepage spotlight. |

## Table: \`CompanyProfile\`
Stores metadata and global configurations for Jawalabs web presentation.

| Column | Type | Attributes | Description |
| :--- | :--- | :--- | :--- |
| \`id\` | Int | PRIMARY KEY | - |
| \`company_name\` | String | | e.g. "Jawalabs" |
| \`tagline\` | String | | "Creating useful and entertaining mobile applications." |
| \`contact_email\` | String | | Business contact information. |
| \`about_us\` | Text | | Detailed information regarding the company's background. |
