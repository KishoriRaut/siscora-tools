# DevTools Hub

A comprehensive collection of developer tools and utilities built with Next.js 15, React 19, and TypeScript.

## 🚀 Features

### Available Tools

- **📧 Email Signature Generator** - Create professional email signatures with custom styling
- **📱 QR Code Generator** - Generate QR codes for URLs, text, WiFi credentials, and more
- **🔑 Password Generator** - Generate secure passwords with customizable options
- **🎨 Color Picker** - Pick colors and generate beautiful color palettes
- **#️⃣ Hash Generator** - Generate MD5, SHA-1, SHA-256, SHA-512 hashes
- **🔤 Base64 Encoder/Decoder** - Encode and decode Base64 strings with file support
- **📊 Text Counter** - Count words, characters, lines, and analyze text
- **🖼️ Image Converter** - Convert images between different formats (JPG, PNG, WebP, BMP)
- **🧮 Calculator** - Advanced calculator with history and keyboard support
- **📝 Text Counter** - Comprehensive text analysis and statistics

### Key Features

- **Modern UI/UX** - Clean, responsive design with dark mode support
- **Accessibility** - WCAG compliant with proper ARIA labels and keyboard navigation
- **Mobile Responsive** - Works perfectly on all device sizes
- **TypeScript** - Full type safety throughout the application
- **Performance** - Optimized with Next.js 15 and React 19
- **Developer Experience** - Hot reload, linting, and component library

## 🛠️ Tech Stack

- **Framework**: Next.js 15 with App Router
- **React**: React 19 with Server Components
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **Icons**: Lucide React
- **Forms**: React Hook Form with Zod validation
- **Utilities**: clsx, tailwind-merge

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd devtools-hub
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── tools/             # Individual tool pages
│   │   ├── email-signature/
│   │   ├── qr-generator/
│   │   ├── password-generator/
│   │   ├── color-picker/
│   │   ├── hash-generator/
│   │   ├── base64-encoder/
│   │   ├── text-counter/
│   │   ├── image-converter/
│   │   └── calculator/
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # Reusable components
│   ├── ui/               # UI components
│   └── Navigation.tsx    # Main navigation
├── lib/                  # Utility functions
└── components/           # Original email signature components
```

## 🎨 Customization

### Adding New Tools

1. Create a new directory in `src/app/tools/`
2. Add a `page.tsx` file with your tool component
3. Update the navigation in `src/components/Navigation.tsx`
4. Add the tool to the home page in `src/app/page.tsx`

### Styling

The app uses Tailwind CSS with a custom design system. Key design tokens:

- **Colors**: Blue primary, gray neutrals, semantic colors
- **Typography**: Geist Sans and Geist Mono fonts
- **Spacing**: Consistent spacing scale
- **Components**: Reusable UI components in `src/components/ui/`

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically

### Other Platforms

The app can be deployed to any platform that supports Next.js:

```bash
npm run build
npm start
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- Icons by [Lucide](https://lucide.dev/)
- Styling with [Tailwind CSS](https://tailwindcss.com/)
- Type safety with [TypeScript](https://www.typescriptlang.org/)