# PairDrop Customization Guide

## Introduction

This guide details the customization process of the PairDrop client UI and some server configuration, enabling you to align the interface with your community or organization's branding preferences. It leverages configuration files and stylesheets within the project for extensive customization.

## Configuration File

The primary configuration for UI customization is found in **[config.tsx](../client/src/config.tsx)** file located in `client/src/config.tsx`. This file allows you to adjust various aspects of the PairDrop client, including:

- **Pairs Count:** Control the default number of project pairs presented to users.
- **Web3Modal Config:** Set up WalletConnect integration details, including project ID and blockchain settings.
- **API Configuration:** Customize the behavior of API requests and data fetching mechanisms.
- **UI Components:** Define properties for header, footer, and other key components of the UI, such as logos, navigation links, and text labels.
- **Page Configurations:** Customize titles, subtitles, and other content across different pages of the application.

### Example: Adjusting the Header

To modify the header component, locate the `header` object and update properties such as `logoSrc`, `navigationLinks`, or `bannerMessage` to fit your needs.

## Tailwind Configuration

For deeper customization of fonts, colors, and background images, the **[tailwind.config.ts](../client/tailwind.config.ts)** file located in `client/tailwind.config.ts` is your go-to resource. Here, you can extend the default Tailwind CSS configuration to include your custom themes, font families, and other design tokens.

### Customizing Themes and Colors

Within the `theme` section, you can add or modify color schemes and background gradients to match your branding. The configuration supports custom color palettes for components like buttons, text, and backgrounds.

### Adding Background Images

Custom background images for various components and pages can be defined in the `backgroundImage` property, enhancing the visual appeal of your application.

## Customizing Favicons and Meta Tags

To align PairDrop with your branding, you can customize the favicons and meta tags. Favicons are located in the **[favicons](../client/public/favicons)** directory at `client/public/favicons` and can be updated by replacing the existing files with your own icons. Additionally, the web application's **[manifest.json](../client/public/manifest.json)** file located at `client/public/manifest.json` should be updated with your icon paths if changed and color scheme. For meta tags, including site title, description, and theming, edit the head section in the **[layout.tsx](../client/src/app/layout.tsx)** file located at `client/src/app/layout.tsx`. The **[favicon.ico](../client/src/app/favicon.ico)** file located at `client/src/app/favicon.ico` should also be replaced with your custom favicon to maintain consistency across browser tabs and bookmarks.

## Global Styles

For custom styles that may not fit within the Tailwind configuration, the **[globals.css](../client/src/app/globals.css)** file located in `client/src/app/globals.css` allows you to write CSS rules that apply globally. This flexibility is perfect for unique styling needs that go beyond utility classes.

### Example: Overriding Default Styles

You can override default styles or add new styles for specific elements across the application by specifying CSS rules in this file.

## Customizing Number of Project Pairs

### Adjusting Pair Count in the Client

To tailor the voting experience to your preferences, you can modify the number of project pairs participants will review. This is controlled by the `pairsCap` variable in the **[config.tsx](../client/src/config.tsx)** file located in `client/src/config.tsx`:

```javascript
// Project Pairs Count (default: 5)
export const pairsCap = 5;
```

Changing this value allows you to set a specific number of pairs that users will evaluate, providing flexibility in how extensive or concise you wish the voting process to be.

### Configuring Pair Count on the Server

Similarly, the server responsible for fetching and organizing these pairs recognizes an environment variable to sync this customization. In the server's `.env` file, you can set the same count to ensure consistency across both client and server operations:

```plaintext
PROJECTPAIRS_CAP=5
```

Adjusting this value in the server's environment variables ensures that the backend logic aligns with the frontend display, offering a seamless and customized user experience.

## Server Mode for Testing or Production

The `MODE` environment variable in the server's `.env` file dictates the operational mode of the PairDrop server, impacting how scores are assigned and managed:

```plaintext
MODE="test" or "prod"
```

- **Test Mode:** Setting `MODE` to `"test"` assigns all addresses a default score of 100. This mode is ideal for testing the platform, allowing developers to simulate voting and funding distribution without relying on pre-generated scores.

- **Production Mode:** When `MODE` is set to `"prod"`, the server fetches actual scores from the score database. This mode should be used for live rounds of funding, where real voter scores are crucial for determining the allocation of funds.

Switching between modes allows for a flexible development and deployment process, facilitating both testing and real-world application.

## Conclusion

The PairDrop client offers a comprehensive set of customization options through its configuration file, Tailwind setup, and global CSS. By exploring and utilizing these options, you can create a unique and branded experience for your users, from adjusting the overall theme and layout to fine-tuning individual UI components.
