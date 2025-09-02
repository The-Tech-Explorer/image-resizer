# 🖼️ Image Resizer - 100% Private & Free

**A completely free, open-source image resizing tool that runs entirely in your browser. Your images never leave your device.**

## 🔒 Privacy First

- **🛡️ Complete Privacy**: Your images are processed locally - they never get uploaded to any server
- **🌐 Works Offline**: No internet connection required after loading the page
- **📱 No Installation**: Runs directly in any modern web browser
- **🚫 No Data Collection**: We don't track, store, or collect any of your data
- **🔓 100% Open Source**: Full source code available - see exactly how it works
- **💰 Completely Free**: No subscriptions, no premium features, no hidden costs

## ✨ Why Choose This Tool?

Unlike online image editors that require uploading your photos to unknown servers, this tool:

- ✅ **Keeps your images private** - everything happens on your device
- ✅ **No file size limits** - resize images of any size
- ✅ **No watermarks** - clean, professional results
- ✅ **No account required** - start using immediately
- ✅ **Works everywhere** - any device with a web browser
- ✅ **Lightning fast** - no upload/download waiting times

## 🚀 Features

- 🖼️ **Multiple Resize Modes**: Exact dimensions, fit (maintain aspect ratio), or fill (crop if needed)
- 📏 **Quality Control**: Choose from multiple quality levels for output optimization
- 📝 **Smart File Naming**: Automatically generates filenames based on original name + dimensions
- 💾 **Custom Download Names**: Edit filename before downloading
- 🎨 **Real-time Preview**: See original and resized images side-by-side
- 📱 **Responsive Design**: Works on desktop and mobile devices
- ⚡ **Client-side Processing**: No server required, all processing done in browser

## 🔐 How We Protect Your Privacy

### Technical Implementation
- **Local Processing**: Uses HTML5 Canvas API for image manipulation entirely in your browser
- **No Network Requests**: After the page loads, no data is sent anywhere
- **Memory Management**: Images are processed in browser memory and cleaned up automatically
- **No Cookies**: We don't use cookies or local storage to track you
- **No Analytics**: No Google Analytics, Facebook Pixel, or any tracking scripts

### What This Means
- 🚫 **No server uploads** - your images never travel over the internet
- 🚫 **No data retention** - we can't access or store your images because we never receive them
- 🚫 **No metadata collection** - we don't see filenames, EXIF data, or image content
- ✅ **Works air-gapped** - use it on computers with no internet connection
- ✅ **GDPR compliant** - we don't collect personal data because we can't

## 📂 File Structure

```
image-resizer/
├── index.html          # Main HTML structure
├── styles.css          # All styling and responsive design
├── imageResizer.js     # Core functionality and utilities
├── README.md          # This file
├── .gitignore         # Git ignore rules
└── LICENSE            # MIT License
```

## 🎛️ Resize Modes

- **Exact Dimensions**: Resizes to exact width/height (may distort aspect ratio)
- **Fit**: Maintains aspect ratio, fits within specified bounds
- **Fill**: Maintains aspect ratio, fills entire area (crops if necessary)

## ⚙️ Quality Settings

- **Best Quality (100%)**: No compression, largest file size
- **High Quality (90%)**: Minimal compression, good balance
- **Good Quality (80%)**: Moderate compression, smaller files
- **Medium Quality (60%)**: Higher compression, smallest files

## 🌐 Browser Compatibility

- Chrome 51+
- Firefox 52+
- Safari 11+
- Edge 79+

**Requirements:**
- HTML5 Canvas API
- File API  
- ES6 Classes

*Works on virtually any modern device - desktop, laptop, tablet, or phone.*

## 🎯 Perfect For

- 📸 **Photographers** who need to resize images without losing quality or privacy
- 🎨 **Designers** working with sensitive client materials
- 👥 **Content Creators** who value speed and privacy
- 🏢 **Businesses** that can't upload proprietary images to external servers
- 👤 **Privacy-conscious users** who want control over their data
- 🌍 **Users with limited internet** - works completely offline

## 🚀 Quick Start

1. **Open the tool**: Just visit the webpage or download and open `index.html`
2. **Select your image**: Click "Choose File" - your image stays on your device
3. **Set dimensions**: Enter width and height, or let it auto-fill
4. **Choose mode**: Exact, fit, or fill based on your needs
5. **Resize & download**: Click resize, customize filename, and download

**That's it!** No accounts, no uploads, no tracking.

## 🛠️ Technical Features

### Image Processing
- Uses HTML5 Canvas for image manipulation
- Implements high-quality image smoothing
- Supports various output formats (defaults to JPEG)

### File Naming Convention
- Original: `vacation-photo.jpg`
- Resized: `vacation-photo_800x600.jpg`
- Custom: User can edit before download

### Performance
- Client-side processing (no server uploads)
- Efficient memory usage with canvas cleanup
- Optimized for large image files

## Development

### Local Development
Simply open `index.html` in your browser. No build process required.

### Customization
- **Styling**: Edit `styles.css`
- **Functionality**: Modify `imageResizer.js`
- **Layout**: Update `index.html`

### Adding Features
The `ImageResizer` class is modular and extensible:
- Add new resize modes in `calculateDimensions()`
- Implement new output formats in `displayResizedImage()`
- Add filters or effects in `createResizedCanvas()`

## 🤝 Contributing

We welcome contributions from privacy advocates and developers who share our vision of keeping user data safe!

### How to Contribute
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Contribution Guidelines
- **Privacy First**: Any new features must maintain our zero-data-collection policy
- **No External Dependencies**: Keep it vanilla JS to maintain security and simplicity
- **Browser Compatibility**: Ensure features work across modern browsers
- **Documentation**: Update README and code comments for new features

### Ideas We'd Love
- 🎨 Image filters that work client-side
- 📱 Better mobile touch interactions
- ♿ Enhanced accessibility features
- 🌍 Internationalization/translations
- 📋 Batch processing for multiple images

## ⭐ Show Your Support

If you believe in privacy-respecting tools, please:
- ⭐ **Star this repository** to help others discover it
- 🔗 **Share it** with friends who value their privacy
- 🐛 **Report bugs** to keep it working perfectly
- 💡 **Suggest features** that maintain our privacy-first approach
- 🤝 **Contribute code** to make it even better

## 📜 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

**What this means**: You can use, modify, and distribute this software freely, including for commercial purposes. The only requirement is to include the original license notice.

## 🛣️ Roadmap

**Upcoming Features (Privacy-Preserving Only)**
- [ ] 🖼️ Batch processing for multiple images
- [ ] 🎨 Client-side image filters and effects  
- [ ] 📱 Progressive Web App (PWA) for offline installation
- [ ] 🖱️ Drag and drop interface
- [ ] 📋 Copy to clipboard functionality
- [ ] 🌍 Multi-language support
- [ ] ♿ Enhanced accessibility features
- [ ] 📊 EXIF data viewer/editor (client-side only)

*All features will maintain our core principle: your data never leaves your device.*

## 🆚 Privacy Comparison

| Feature | This Tool | Typical Online Tools |
|---------|-----------|---------------------|
| **Data Upload** | ❌ Never | ✅ Always Required |
| **Server Processing** | ❌ None | ✅ All Processing |
| **Data Storage** | ❌ Nothing Stored | ❓ Unknown Retention |
| **Privacy Policy** | ❌ Not Needed | ❓ Complex Terms |
| **Internet Required** | ❌ Works Offline | ✅ Always Required |
| **File Size Limits** | ❌ No Limits | ✅ Usually Limited |
| **Speed** | ⚡ Instant | 🐌 Upload/Download Wait |
| **Cost** | 💰 Always Free | 💳 Often Freemium |

**The Bottom Line**: Your images are processed entirely on your device using your browser's built-in capabilities. We literally cannot access your images because they never leave your computer.

---

*Made with ❤️ for users who value their privacy. Star this repo if you believe privacy should be the default, not a premium feature.*