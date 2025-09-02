/**
 * Image Resizer Application
 * A web-based tool for resizing images with various options
 */

class ImageResizer {
    constructor() {
        this.originalImage = null;
        this.originalFilename = '';
        this.initializeElements();
        this.attachEventListeners();
    }

    /**
     * Initialize DOM elements
     */
    initializeElements() {
        this.imageInput = document.getElementById('imageInput');
        this.targetWidth = document.getElementById('targetWidth');
        this.targetHeight = document.getElementById('targetHeight');
        this.resizeMode = document.getElementById('resizeMode');
        this.quality = document.getElementById('quality');
        this.resizeBtn = document.getElementById('resizeBtn');
        this.errorDiv = document.getElementById('error');
        this.imagesContainer = document.getElementById('imagesContainer');
    }

    /**
     * Attach event listeners to DOM elements
     */
    attachEventListeners() {
        this.imageInput.addEventListener('change', (e) => this.handleImageSelect(e));
        this.resizeBtn.addEventListener('click', () => this.resizeImage());
        
        // Auto-fill dimensions when image is loaded
        this.targetWidth.addEventListener('input', this.updateButtonState.bind(this));
        this.targetHeight.addEventListener('input', this.updateButtonState.bind(this));
    }

    /**
     * Display error message
     * @param {string} message - Error message to display
     */
    showError(message) {
        this.errorDiv.innerHTML = `<div class="error">${message}</div>`;
        setTimeout(() => this.errorDiv.innerHTML = '', 5000);
    }

    /**
     * Clear error message
     */
    clearError() {
        this.errorDiv.innerHTML = '';
    }

    /**
     * Handle image file selection
     * @param {Event} event - File input change event
     */
    handleImageSelect(event) {
        const file = event.target.files[0];
        if (!file) return;

        if (!file.type.startsWith('image/')) {
            this.showError('Please select a valid image file.');
            return;
        }

        // Store original filename without extension
        this.originalFilename = this.getFilenameWithoutExtension(file.name);
        this.loadImage(file);
    }

    /**
     * Extract filename without extension
     * @param {string} filename - Full filename
     * @returns {string} Filename without extension
     */
    getFilenameWithoutExtension(filename) {
        const lastDotIndex = filename.lastIndexOf('.');
        return lastDotIndex > 0 ? filename.substring(0, lastDotIndex) : filename;
    }

    /**
     * Load image from file
     * @param {File} file - Image file to load
     */
    loadImage(file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            const img = new Image();
            img.onload = () => {
                this.originalImage = img;
                this.displayOriginalImage(img, file.name, file.size);
                
                // Auto-fill dimensions if empty
                if (!this.targetWidth.value) this.targetWidth.value = img.width;
                if (!this.targetHeight.value) this.targetHeight.value = img.height;
                
                this.updateButtonState();
                this.clearError();
                
                // Clear any previous resized images when new image is loaded
                this.clearPreviousResizedImages();
            };
            img.src = e.target.result;
        };
        reader.readAsDataURL(file);
    }

    /**
     * Clear previous resized images from display
     */
    clearPreviousResizedImages() {
        // Keep only the original image (first child)
        const children = Array.from(this.imagesContainer.children);
        children.slice(1).forEach(child => child.remove());
    }

    /**
     * Display original image information
     * @param {HTMLImageElement} img - Original image element
     * @param {string} fileName - Original filename
     * @param {number} fileSize - Original file size in bytes
     */
    displayOriginalImage(img, fileName, fileSize) {
        const container = document.createElement('div');
        container.className = 'image-box';
        container.innerHTML = `
            <h3>Original Image</h3>
            <img src="${img.src}" alt="Original">
            <div class="image-info">
                <strong>${fileName}</strong><br>
                Dimensions: ${img.width} × ${img.height}px<br>
                Size: ${this.formatFileSize(fileSize)}
            </div>
        `;
        
        this.imagesContainer.innerHTML = '';
        this.imagesContainer.appendChild(container);
    }

    /**
     * Update the state of the resize button
     */
    updateButtonState() {
        const hasImage = this.originalImage !== null;
        const hasWidth = this.targetWidth.value && this.targetWidth.value > 0;
        const hasHeight = this.targetHeight.value && this.targetHeight.value > 0;
        
        this.resizeBtn.disabled = !(hasImage && hasWidth && hasHeight);
    }

    /**
     * Resize the image based on current settings
     */
    resizeImage() {
        if (!this.originalImage) return;

        const targetW = parseInt(this.targetWidth.value);
        const targetH = parseInt(this.targetHeight.value);
        const mode = this.resizeMode.value;
        const qualityValue = parseFloat(this.quality.value);

        try {
            const canvas = this.createResizedCanvas(this.originalImage, targetW, targetH, mode);
            this.displayResizedImage(canvas, targetW, targetH, qualityValue);
        } catch (error) {
            this.showError(`Resize failed: ${error.message}`);
        }
    }

    /**
     * Create a canvas with resized image
     * @param {HTMLImageElement} img - Source image
     * @param {number} targetWidth - Target width
     * @param {number} targetHeight - Target height
     * @param {string} mode - Resize mode ('exact', 'fit', 'fill')
     * @returns {HTMLCanvasElement} Canvas with resized image
     */
    createResizedCanvas(img, targetWidth, targetHeight, mode) {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        let { width, height, sx, sy, sWidth, sHeight } = this.calculateDimensions(
            img.width, img.height, targetWidth, targetHeight, mode
        );

        canvas.width = width;
        canvas.height = height;

        // Enable high-quality scaling
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';

        // Draw the resized image
        ctx.drawImage(img, sx, sy, sWidth, sHeight, 0, 0, width, height);

        return canvas;
    }

    /**
     * Calculate dimensions and crop parameters for resizing
     * @param {number} originalW - Original width
     * @param {number} originalH - Original height
     * @param {number} targetW - Target width
     * @param {number} targetH - Target height
     * @param {string} mode - Resize mode
     * @returns {Object} Calculated dimensions and crop parameters
     */
    calculateDimensions(originalW, originalH, targetW, targetH, mode) {
        let width = targetW;
        let height = targetH;
        let sx = 0, sy = 0;
        let sWidth = originalW, sHeight = originalH;

        switch (mode) {
            case 'exact':
                // Use target dimensions exactly
                break;

            case 'fit':
                // Maintain aspect ratio, fit within bounds
                const ratio = Math.min(targetW / originalW, targetH / originalH);
                width = Math.round(originalW * ratio);
                height = Math.round(originalH * ratio);
                break;

            case 'fill':
                // Maintain aspect ratio, fill entire area (crop if needed)
                const fillRatio = Math.max(targetW / originalW, targetH / originalH);
                const scaledW = originalW * fillRatio;
                const scaledH = originalH * fillRatio;
                
                // Calculate crop area
                sWidth = targetW / fillRatio;
                sHeight = targetH / fillRatio;
                sx = (originalW - sWidth) / 2;
                sy = (originalH - sHeight) / 2;
                break;
        }

        return { width, height, sx, sy, sWidth, sHeight };
    }

    /**
     * Display resized image with download options
     * @param {HTMLCanvasElement} canvas - Canvas with resized image
     * @param {number} targetW - Target width
     * @param {number} targetH - Target height
     * @param {number} quality - Image quality
     */
    displayResizedImage(canvas, targetW, targetH, quality) {
        const container = document.createElement('div');
        container.className = 'image-box';
        
        const dataURL = canvas.toDataURL('image/jpeg', quality);
        const blob = this.dataURLToBlob(dataURL);
        const downloadUrl = URL.createObjectURL(blob);
        
        // Generate default filename based on original name + dimensions
        const baseFilename = this.originalFilename || 'resized';
        const defaultFilename = `${baseFilename}_${canvas.width}x${canvas.height}.jpg`;
        
        container.innerHTML = `
            <h3>Resized Image</h3>
            <canvas width="${canvas.width}" height="${canvas.height}"></canvas>
            <div class="image-info">
                Target: ${targetW} × ${targetH}px<br>
                Actual: ${canvas.width} × ${canvas.height}px<br>
                Est. Size: ${this.formatFileSize(blob.size)}<br>
                Quality: ${Math.round(quality * 100)}%
            </div>
            <div class="download-section">
                <label for="filename-${Date.now()}">📝 Filename:</label>
                <input type="text" 
                       id="filename-${Date.now()}"
                       class="filename-input" 
                       value="${defaultFilename}" 
                       placeholder="Enter filename (e.g., photo_800x600.jpg)..."
                       title="Filename based on original image + dimensions">
                <button class="download-btn">
                    📥 Download Image
                </button>
            </div>
        `;

        // Copy canvas content to the displayed canvas
        const displayCanvas = container.querySelector('canvas');
        const displayCtx = displayCanvas.getContext('2d');
        displayCtx.drawImage(canvas, 0, 0);

        this.imagesContainer.appendChild(container);

        // Add download functionality to button
        const downloadBtn = container.querySelector('.download-btn');
        const filenameInput = container.querySelector('.filename-input');
        
        downloadBtn.onclick = () => {
            const filename = filenameInput.value.trim() || defaultFilename;
            this.downloadImage(downloadUrl, filename);
        };

        // Allow Enter key to trigger download
        filenameInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                downloadBtn.click();
            }
        });

        // Auto-select filename (without extension) when clicked
        filenameInput.addEventListener('focus', (e) => {
            const filename = e.target.value;
            const lastDotIndex = filename.lastIndexOf('.');
            if (lastDotIndex > 0) {
                e.target.setSelectionRange(0, lastDotIndex);
            }
        });
    }

    /**
     * Convert data URL to Blob
     * @param {string} dataURL - Data URL to convert
     * @returns {Blob} Converted blob
     */
    dataURLToBlob(dataURL) {
        const arr = dataURL.split(',');
        const mime = arr[0].match(/:(.*?);/)[1];
        const bstr = atob(arr[1]);
        let n = bstr.length;
        const u8arr = new Uint8Array(n);
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new Blob([u8arr], { type: mime });
    }

    /**
     * Download image file
     * @param {string} url - Download URL
     * @param {string} filename - Filename for download
     */
    downloadImage(url, filename) {
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }

    /**
     * Format file size in human-readable format
     * @param {number} bytes - File size in bytes
     * @returns {string} Formatted file size
     */
    formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }
}

/**
 * Utility Functions for Standalone Use
 */

/**
 * Simple image resize function
 * @param {HTMLImageElement} imageElement - Image element to resize
 * @param {number} targetWidth - Target width
 * @param {number} targetHeight - Target height
 * @param {number} quality - Image quality (0-1)
 * @returns {string} Data URL of resized image
 */
function simpleImageResize(imageElement, targetWidth, targetHeight, quality = 0.9) {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    canvas.width = targetWidth;
    canvas.height = targetHeight;
    
    // Enable high-quality scaling
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    
    ctx.drawImage(imageElement, 0, 0, targetWidth, targetHeight);
    
    return canvas.toDataURL('image/jpeg', quality);
}

/**
 * Resize image while maintaining aspect ratio
 * @param {HTMLImageElement} imageElement - Image element to resize
 * @param {number} maxWidth - Maximum width
 * @param {number} maxHeight - Maximum height
 * @param {number} quality - Image quality (0-1)
 * @returns {string} Data URL of resized image
 */
function resizeWithAspectRatio(imageElement, maxWidth, maxHeight, quality = 0.9) {
    const ratio = Math.min(maxWidth / imageElement.width, maxHeight / imageElement.height);
    const newWidth = Math.round(imageElement.width * ratio);
    const newHeight = Math.round(imageElement.height * ratio);
    
    return simpleImageResize(imageElement, newWidth, newHeight, quality);
}

// Initialize the application when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new ImageResizer();
});