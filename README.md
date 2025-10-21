# Email Signature Generator

A modern, responsive Next.js application for creating professional email signatures. Built with TypeScript, Tailwind CSS, and React.

## Features

- **Real-time Preview**: See your signature as you type
- **Professional Templates**: Clean, modern signature designs
- **Customizable Styling**: Choose colors, fonts, and sizes
- **Social Media Integration**: Add LinkedIn, Twitter, Facebook, and Instagram links
- **Logo Upload**: Include your company logo
- **Multiple Export Options**: 
  - Copy HTML to clipboard
  - Download HTML file
  - Download plain text version
- **Responsive Design**: Works on desktop and mobile devices
- **Dark Mode Support**: Automatic dark/light theme switching

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd email-signature-generator
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

## Usage

1. **Fill in your details**: Enter your personal and contact information
2. **Add social media links**: Include your professional social media profiles
3. **Upload a logo**: Add your company logo (optional)
4. **Customize styling**: Choose colors, fonts, and sizes
5. **Preview your signature**: See how it will look in emails
6. **Export**: Copy to clipboard or download as HTML/text file

## How to Use Your Signature

### For Gmail:
1. Go to Settings → General → Signature
2. Paste your HTML signature
3. Save changes

### For Outlook:
1. Go to File → Options → Mail → Signatures
2. Create a new signature
3. Paste your HTML signature
4. Set as default

### For Apple Mail:
1. Go to Mail → Preferences → Signatures
2. Create a new signature
3. Paste your HTML signature
4. Set as default

## Technologies Used

- **Next.js 15**: React framework with App Router
- **TypeScript**: Type-safe JavaScript
- **Tailwind CSS**: Utility-first CSS framework
- **Lucide React**: Beautiful icons
- **React Hook Form**: Form handling
- **Zod**: Schema validation

## Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Main page
│   └── globals.css         # Global styles
└── components/
    ├── SignatureForm.tsx   # Form component
    ├── SignaturePreview.tsx # Preview component
    ├── CopyButton.tsx      # Copy functionality
    └── ExportOptions.tsx   # Export options
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).

## Support

If you encounter any issues or have questions, please open an issue on GitHub.